import { FreshContext } from '$fresh/server.ts'
import { Handlers } from '$fresh/server.ts'
import { obtenerUsuario } from '../utils/db/modelos/usuario.ts'
import { crearToken } from '../utils/autenticacion.ts'
import * as bcrypt from 'jsr:@felix/bcrypt'
import { setCookie } from 'jsr:@std/http/cookie'
import { CampoIngreso } from '../components/Input.tsx'
import { EncabezadoPrincipal } from '../components/Headers.tsx'
import { BotonIngresar } from '../components/Button.tsx'
import { ModalError } from '../islands/Modal.tsx'
import Fondo from '../components/Fondo.tsx'
import Enlace from '../components/Enlace.tsx'
import Footer from '../components/Footer.tsx'

interface DatosErrorInicioSesion {
  correo: string
  error: string
}

/**
 * Manejador de la autenticación de usuarios mediante formulario.
 * @type {Handlers} Manejador de solicitudes HTTP.
 */
export const handler: Handlers = {
  /**
   * Maneja la solicitud POST para autenticar un usuario y generar un token JWT.
   * @param {Request} req - La solicitud HTTP entrante.
   * @param {FreshContext} _ctx - El contexto de Fresh (no se usa en este caso).
   */
  async POST(req: Request, _ctx: FreshContext) {
    try {
      // Obtención de los datos del formulario enviado por el usuario.
      const formulario = await req.formData()
      const correo = formulario.get('correo')?.toString().trim()
      const contraseña = formulario.get('contraseña')?.toString().trim()

      // Verificación de que los datos no sean indefinidos o vacíos.
      if (!correo || !contraseña) {
        throw 'Error en el envío del formulario.'
      }

      // Obtención del usuario desde la base de datos.
      const usuario = await obtenerUsuario(correo)

      // Verificación de la existencia del usuario.
      if (!usuario) {
        throw { correo, error: 'No hay un usuario registrado con el correo ingresado.' }
      }

      // Verificación de la contraseña con la almacenada en la base de datos.
      if (!(await bcrypt.verify(contraseña, usuario.contraseña))) {
        throw { correo, error: 'La contraseña es incorrecta.' }
      }

      // Generación del token JWT con la información del usuario.
      const token = await crearToken({
        correo: usuario.correo,
        nombre: usuario.nombre,
        rol: usuario.rol,
      })

      const headers = new Headers()

      // Inserción del token en una cookie segura.
      setCookie(headers, {
        name: 'token',
        value: token,
        maxAge: 60 * 60 * 2, // 2 horas de duración.
        sameSite: 'Strict', // La cookie solo se envía en solicitudes del mismo origen.
        domain: new URL(req.url).hostname, // Se usa el dominio actual.
        path: '/', // La cookie es accesible en toda la aplicación.
        httpOnly: true, // No accesible desde JavaScript en el navegador.
        // WARNING: Cambiar esto a true cuando se llame a producción.
        secure: false, // Solo se envía en conexiones HTTPS.
        // secure: true, // Solo se envía en conexiones HTTPS.
      })

      // Redirección al área de usuario según su rol.
      headers.set('Location', `/usuario/${usuario.rol}/`)
      return new Response(null, {
        status: 303,
        headers,
      })
    } catch (error) {
      // En caso de error, se redirige al formulario de inicio de sesión con el mensaje de error.
      const objetoErrores = error as DatosErrorInicioSesion
      const params = new URLSearchParams({
        correo: objetoErrores.correo,
        error: objetoErrores.error,
      })

      return new Response(null, {
        status: 303,
        headers: {
          'Location': `/ingresar?${params.toString()}`,
        },
      })
    }
  },
}

/**
 * Renderiza la página de inicio de sesión para el usuario.
 *
 * Esta página muestra un formulario para que el usuario pueda iniciar sesión,
 * incluyendo campos para el correo electrónico y la contraseña. También muestra
 * mensajes de error en caso de que se proporcionen datos incorrectos.
 *
 * Si el usuario cometió un error en la solicitud anterior, el correo ingresado y
 * el mensaje de error pueden prellenarse utilizando parámetros pasados en la URL.
 *
 * @param {Request} req - La solicitud HTTP entrante, utilizada para extraer parámetros de la URL.
 */
export default function Ingresar(req: Request) {
  // Obtiene la URL actual y extrae los parámetros 'error' y 'correo' si existe
  const url = new URL(req.url)
  const error = url.searchParams.get('error')?.replaceAll('"', '')
  const correo = url.searchParams.get('correo')?.replaceAll('"', '')

  return (
    <div class='w-screen h-screen flex flex-col justify-center items-center relative'>
      <Fondo ruta='/fondo3.gif' />

      {error ? <ModalError mensaje={error} /> : ''}

      <form
        action='/ingresar'
        method='post'
        class='p-4 flex flex-col w-full gap-2 bg-white h-auto sm:w-2/3 lg:w-1/3 xl:w-1/4 shadow-lg z-20 rounded-md'
      >
        <img src='/icono.jpeg' alt='Logo TaskCore' class='w-12 h-12 self-center' />
        <EncabezadoPrincipal>Inicio de sesión</EncabezadoPrincipal>
        <CampoIngreso
          color='sky-500'
          type='email'
          name='correo'
          placeholder='Correo'
          required
          autoComplete='off'
          value={correo}
        />
        <CampoIngreso
          color='sky-500'
          type='password'
          name='contraseña'
          placeholder='Contraseña'
          required
          autoComplete='off'
        />

        <BotonIngresar color='sky-500'>Iniciar sesión</BotonIngresar>
        <Enlace direccion='/' texto='Regresar al inicio' />
        <Enlace direccion='/registro' texto='Crear una nueva cuenta' />
      </form>

      <Footer />
    </div>
  )
}

// value={'chris@gmail.com'}
// value={'1234abcD@'}
