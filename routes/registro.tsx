import { Handlers } from '$fresh/server.ts'
import * as esquemas from '../utils/esquemas.ts'
import { insertarUsuario, Usuario } from '../utils/db/modelos/usuario.ts'
import { EncabezadoPrincipal } from '../components/Headers.tsx'
import { CampoIngreso } from '../components/Input.tsx'
import { BotonPrincipal } from '../components/Boton.tsx'
import { ModalError, ModalLink } from '../islands/Modal.tsx'
import Fondo from '../components/Fondo.tsx'
import Enlace from '../components/Enlace.tsx'
import Footer from '../components/Footer.tsx'

interface DatosErrorRegistro {
  nombre: string
  correo: string
  error: string
}

/**
 * Manejador de la ruta de registro de usuarios.
 * @type {Handlers} Define un manejador para la solicitud HTTP POST.
 */
export const handler: Handlers = {
  /**
   * Maneja la solicitud POST para registrar un nuevo usuario.
   * @param {Request} req - La solicitud HTTP entrante.
   */
  async POST(req: Request) {
    try {
      // Obtención de los datos del formulario de envio.
      const formulario = await req.formData()
      const correo = formulario.get('correo')?.toString().trim()
      const nombre = formulario.get('nombre')?.toString().trim()
      const rol = formulario.get('rol')?.toString().trim()
      const contraseña = formulario.get('contraseña')?.toString().trim()
      const verificacionContraseña = formulario.get('verificacionContraseña')?.toString().trim()

      // Verificación de la semantica de los datos.
      const verificacionEsquemaCorreo = esquemas.esquemaEmail.safeParse(correo)
      const verificacionEsquemaNombre = esquemas.esquemaNombre.safeParse(nombre)
      const verificacionEsquemaContraseña = esquemas.esquemaContraseña.safeParse(contraseña)

      // Verificación de que los datos no sean undefined.
      if (!nombre || !correo || !contraseña || !verificacionContraseña || !rol) {
        throw { nombre: '', correo: '', error: 'Error en el envio del formulario.' }
      }

      const datos = {
        nombre,
        correo,
      }

      // Verificar que las contraseñas sean iguales.
      if (contraseña !== verificacionContraseña) {
        throw { ...datos, error: 'Las contraseñas no coinciden.' }
      }

      // Verificación del rol.
      if (rol !== 'miembro' && rol !== 'admin') {
        throw { ...datos, error: 'No se ingreso un rol valido.' }
      }

      // Verificar que los esquemas esten correctos.
      // Verificación del esquema del nombre.
      if (!verificacionEsquemaNombre.success) {
        throw { ...datos, error: 'El nombre de usuario no es valido.' }
      }

      // Verificación del esquema del correo.
      if (!verificacionEsquemaCorreo.success) {
        throw { ...datos, error: 'El correo electronico no es valido.' }
      }

      // Verificación del esquema de la contraseña.
      if (!verificacionEsquemaContraseña.success) {
        throw {
          ...datos,
          error:
            'Las contraseñas deben ser mayor de 8 caracteres, debe contar con mayúsculas, minúsculas, números y carácteres especiales.',
        }
      }

      // Creación e inserción del usuario.
      const usuario: Usuario = {
        tema: '',
        nombre,
        correo,
        contraseña,
        rol,
      }

      if (!await insertarUsuario(usuario)) {
        throw {
          ...datos,
          error: 'El correo electronico ya esta registrado.',
        }
      }

      // Respuesta la petición
      // return new Response(null, {
      //   status: 303,
      //   headers: {
      //     'Location': '/agradecimientos',
      //   },
      // })
      //
      const params = new URLSearchParams({
        resultado: 'ok',
      })

      return new Response(null, {
        status: 303,
        headers: {
          'Location': `/registro?${params.toString()}`,
        },
      })
    } catch (error) {
      // En caso de error, se redirige al formulario de registro con un mensaje de error
      const objetoErrores = error as DatosErrorRegistro
      const params = new URLSearchParams({
        nombre: objetoErrores.nombre,
        correo: objetoErrores.correo,
        error: objetoErrores.error,
      })

      return new Response(null, {
        status: 303,
        headers: {
          'Location': `/registro?${params.toString()}`,
        },
      })
    }
  },
}

/**
 * Renderiza la página de registro de usuario.
 *
 * Esta página muestra un formulario para que el usuario se registre, incluyendo campos para
 * nombre, correo electrónico, contraseña, verificación de contraseña y selección de rol.
 * Además, muestra mensajes de error en caso de que se proporcionen datos inválidos desde la URL.
 *
 * Los valores de nombre y correo pueden ser prellenados si son enviados como parámetros en la URL.
 *
 * @param {Request} req - La solicitud HTTP entrante, utilizada para extraer parámetros de la URL.
 */
export default function Registro(req: Request) {
  // Obtiene la URL actual y extrae los parámetros 'error', 'nombre' y 'correo' (si existen).
  const url = new URL(req.url)
  const error = url.searchParams.get('error')?.replaceAll('"', '') || ''
  const nombre = url.searchParams.get('nombre')?.replaceAll('"', '') || ''
  const correo = url.searchParams.get('correo')?.replaceAll('"', '') || ''
  const resultado = url.searchParams.get('resultado')?.replaceAll('"', '') || ''

  return (
    <div class='w-screen h-screen bg-black flex flex-col justify-center items-center'>
      <Fondo ruta='/fondo3.gif' />

      {error ? <ModalError mensaje={error} /> : ''}
      {resultado === 'ok'
        ? (
          <ModalLink
            mensaje='¡Registro completado exitosamente! Inicia sesión para empezar a utilizar TaskCore.'
            enlace='/ingresar'
            textoEnlace='Iniciar sesión'
          />
        )
        : ''}

      <form
        action='/registro'
        method='post'
        class='p-4 flex flex-col w-full gap-2 bg-white z-20 sm:w-2/3 xl:w-1/3 rounded-md'
      >
        <img src='/iconoTransparente.png' alt='Logo TaskCore' class='w-12 h-12 self-center' />
        <EncabezadoPrincipal>Registro de usuario</EncabezadoPrincipal>

        <CampoIngreso
          type='text'
          name='nombre'
          placeholder='Nombre'
          required
          autoComplete='off'
          color='sky-500'
          value={nombre}
        />

        <CampoIngreso
          type='email'
          name='correo'
          placeholder='Correo'
          required
          autoComplete='off'
          color='sky-500'
          value={correo}
        />

        <CampoIngreso
          type='password'
          name='contraseña'
          placeholder='Contraseña'
          required
          autoComplete='off'
          color='sky-500'
        />

        <CampoIngreso
          type='password'
          name='verificacionContraseña'
          placeholder='Verificar contraseña'
          required
          autoComplete='off'
          color='sky-500'
        />

        <select
          name='rol'
          class='px-2 py-1 h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full font-sans font-semibold shadow-md cursor-pointer hover:border-sky-500'
        >
          <option selected>Elige un rol:</option>
          <option value='admin'>Administrador</option>
          <option value='miembro' default>Miembro</option>
        </select>

        <BotonPrincipal color='blue'>Registrar</BotonPrincipal>
        <Enlace direccion='/' texto='Regresar al inicio' />
        <Enlace direccion='/ingresar' texto='Iniciar sesión' />

        <Footer />
      </form>
    </div>
  )
}

// value={'1234abcD@'}
