import { Handlers } from '$fresh/server.ts'
import Usuario from '../models/Usuario.ts'
import { EncabezadoPrincipal } from '../components/Headers.tsx'
import { Input } from '../components/Input.tsx'
import { Boton } from '../components/Boton.tsx'
import { ModalError, ModalLink } from '../islands/Modal.tsx'
import Fondo from '../components/Fondo.tsx'
import Enlace from '../components/Enlace.tsx'
import Footer from '../components/Footer.tsx'

/**
 * Manejador de rutas para el proceso de registro de usuarios.
 * Controla la creación de nuevas cuentas de usuario con validación básica.
 */
export const handler: Handlers = {
  /**
   * Procesa el formulario de registro y crea un nuevo usuario.
   * Valida los campos requeridos y maneja dos flujos:
   * - Registro exitoso: Redirige con mensaje de confirmación
   * - Error en registro: Redirige conservando los datos ingresados
   *
   * @param {Request} req - Solicitud HTTP con los datos del formulario
   * @returns Redirección con estado según resultado del registro
   */
  async POST(req: Request) {
    const formulario = await req.formData()
    try {
      const correo = formulario.get('correo')?.toString().trim()
      const nombre = formulario.get('nombre')?.toString().trim()
      const rol = formulario.get('rol')?.toString() === 'admin' ? 'admin' : 'miembro'
      const contraseña = formulario.get('contraseña')?.toString().trim()
      const verificacionContraseña = formulario.get('verificacionContraseña')?.toString().trim()

      if (!nombre || !correo || !contraseña || !verificacionContraseña || !rol) {
        throw new Error('Error en el envio del formulario.')
      }

      const usuario = new Usuario(nombre, correo, contraseña, rol)
      await usuario.guardar()

      const params = new URLSearchParams({
        mensaje: '¡Registro completado exitosamente! Inicia sesión para empezar a utilizar TaskCore.',
      })

      return new Response(null, {
        status: 303,
        headers: {
          'Location': `/registro?${params.toString()}`,
        },
      })
    } catch (error) {
      const objetoErrores = error as Error
      const params = new URLSearchParams({
        error: objetoErrores.message,
        nombre: formulario.get('nombre')?.toString() || '',
        correo: formulario.get('correo')?.toString() || '',
      })

      params.set('rol', formulario.get('rol')?.toString() || '')

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
 * Página de registro para nuevos usuarios.
 *
 * Características principales:
 * - Formulario con validación de campos obligatorios
 * - Opción para registrarse como administrador
 * - Manejo de errores con modal
 * - Auto-relleno de datos en caso de error previo
 * - Mensaje de confirmación post-registro
 * - Diseño responsive con fondo animado
 *
 * @param {Request} req - Objeto Request para extraer parámetros de URL
 * @returns Componente completo con:
 *   - Formulario de registro
 *   - Modales para errores/éxitos
 *   - Enlaces de navegación
 *   - Componente Footer
 */
export default function Registro(req: Request) {
  const url = new URL(req.url)
  const error = url.searchParams.get('error')?.replaceAll('"', '') || ''
  const nombre = url.searchParams.get('nombre')?.replaceAll('"', '') || ''
  const correo = url.searchParams.get('correo')?.replaceAll('"', '') || ''

  const rol = url.searchParams.get('rol') || ''
  const mensaje = url.searchParams.get('mensaje')?.replaceAll('"', '') || ''

  return (
    <div class='w-screen h-screen bg-black flex flex-col justify-center items-center'>
      <Fondo ruta='/fondo3.gif' />

      {error ? <ModalError mensaje={error} /> : ''}
      {mensaje
        ? (
          <ModalLink
            mensaje={mensaje}
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

        <Input
          label='Nombre de usuario'
          type='text'
          name='nombre'
          required
          autoComplete='off'
          value={nombre}
        />

        <Input
          label='Correo electrónico'
          type='email'
          name='correo'
          required
          autoComplete='off'
          value={correo}
        />

        <Input
          label='Contraseña'
          type='password'
          name='contraseña'
          required
          autoComplete='off'
          minLength={8}
        />

        <Input
          label='Confirmación de la contraseña'
          type='password'
          name='verificacionContraseña'
          required
          autoComplete='off'
          minLength={8}
        />

        {/* Checkbox para registro como admin */}
        <div class='flex items-center mb-4'>
          <input
            type='checkbox'
            id='registroAdmin'
            name='rol'
            value='admin'
            checked={rol === 'admin'}
            class='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
          />
          <label
            for='registroAdmin'
            class='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Registrar como administrador
          </label>
        </div>

        <Boton>Registrar</Boton>
        <Enlace direccion='/' texto='Regresar al inicio' />
        <Enlace direccion='/ingresar' texto='Iniciar sesión' />

        <Footer />
      </form>
    </div>
  )
}
