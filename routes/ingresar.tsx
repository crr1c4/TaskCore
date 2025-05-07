import { FreshContext } from '$fresh/server.ts'
import { Handlers } from '$fresh/server.ts'

import Usuario from '../models/Usuario.ts'

import { crearToken } from '../utils/autenticacion.ts'
import { setCookie } from 'jsr:@std/http/cookie'
import { CampoIngreso } from '../components/Input.tsx'
import { EncabezadoPrincipal } from '../components/Headers.tsx'
import { BotonPrincipal } from '../components/Boton.tsx'
import { ModalError } from '../islands/Modal.tsx'
import Fondo from '../components/Fondo.tsx'
import Enlace from '../components/Enlace.tsx'
import Footer from '../components/Footer.tsx'

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
    const formulario = await req.formData()

    try {
      const correo = formulario.get('correo')?.toString().trim()
      const contraseña = formulario.get('contraseña')?.toString().trim()

      if (!correo || !contraseña) {
        throw new Error('Error en el envío del formulario.')
      }

      const usuario = await Usuario.obtenerPorCorreo(correo) 

      console.log(usuario)

      if (!(await usuario.verificarContraseña(contraseña))) {
        throw new Error('La contraseña es incorrecta.')
      }

      const token = await crearToken({
        correo: usuario.correo,
        nombre: usuario.nombre,
        rol: usuario.rol,
        tema: usuario.tema,
      })

      const headers = new Headers()

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

      headers.set('Location', `/usuario/${usuario.rol}/`)
      return new Response(null, {
        status: 303,
        headers,
      })
    } catch (error) {
      const objetoErrores = error as Error
      const correo = formulario.get('correo')?.toString().trim() || ''
      const params = new URLSearchParams({
        correo,
        mensaje: objetoErrores.message,
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
  const error = url.searchParams.get('mensaje')?.replaceAll('"', '')
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
        <img src='/iconoTransparente.png' alt='Logo TaskCore' class='w-12 h-12 self-center' />
        <EncabezadoPrincipal>Inicio de sesión</EncabezadoPrincipal>
        <CampoIngreso
          type='email'
          label='Correo electrónico'
          name='correo'
          placeholder='Correo'
          required
          autoComplete='off'
          value={correo}
        />
        <CampoIngreso
          type='password'
          label='Contraseña'
          name='contraseña'
          placeholder='Contraseña'
          required
          autoComplete='off'
        />

        <BotonPrincipal color='blue'>Iniciar sesión</BotonPrincipal>
        <Enlace direccion='/' texto='Regresar al inicio' />
        <Enlace direccion='/registro' texto='Crear una nueva cuenta' />
      </form>

      <Footer />
    </div>
  )
}
