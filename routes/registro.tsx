import { Handlers } from '$fresh/server.ts'
import Usuario from '../models/Usuario.ts'
import { EncabezadoPrincipal } from '../components/Headers.tsx'
import { CampoIngreso } from '../components/Input.tsx'
import { BotonPrincipal } from '../components/Boton.tsx'
import { ModalError, ModalLink } from '../islands/Modal.tsx'
import Fondo from '../components/Fondo.tsx'
import Enlace from '../components/Enlace.tsx'
import Footer from '../components/Footer.tsx'

export const handler: Handlers = {
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
        resultado: 'ok',
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

export default function Registro(req: Request) {
  const url = new URL(req.url)
  const error = url.searchParams.get('error')?.replaceAll('"', '') || ''
  const nombre = url.searchParams.get('nombre')?.replaceAll('"', '') || ''
  const correo = url.searchParams.get('correo')?.replaceAll('"', '') || ''
  const rol = url.searchParams.get('rol') || ''
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
          label='Nombre de usuario'
          type='text'
          name='nombre'
          required
          autoComplete='off'
          value={nombre}
        />

        <CampoIngreso
          label='Correo electrónico'
          type='email'
          name='correo'
          required
          autoComplete='off'
          value={correo}
        />

        <CampoIngreso
          label='Contraseña'
          type='password'
          name='contraseña'
          required
          autoComplete='off'
        />

        <CampoIngreso
          label='Confirmación de la contraseña'
          type='password'
          name='verificacionContraseña'
          required
          autoComplete='off'
        />

        <div class='flex items-center space-x-2'>
          <input
            id='rol-admin'
            type='checkbox'
            name='rol'
            value='admin'
            class='w-5 h-5 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500'
            checked={rol === 'admin'}
          />
          <label for='rol-admin' class='text-sm font-medium text-gray-900'>Registrar como administrador</label>
        </div>

        <BotonPrincipal color='blue'>Registrar</BotonPrincipal>
        <Enlace direccion='/' texto='Regresar al inicio' />
        <Enlace direccion='/ingresar' texto='Iniciar sesión' />

        <Footer />
      </form>
    </div>
  )
}
