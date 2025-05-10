// routes/proyectos/[idProyecto]/editar.tsx
import { FreshContext, Handlers } from '$fresh/server.ts'
import { AreaTexto } from '../../../../components/AreaTexto.tsx'
import { Boton, BotonEmergencia } from '../../../../components/Boton.tsx'
import { IconoVolver } from '../../../../components/Iconos.tsx'
import { Input } from '../../../../components/Input.tsx'
import { ModalError, ModalLink } from '../../../../islands/Modal.tsx'
import NavBar from '../../../../islands/NavBar.tsx'
import Proyecto from '../../../../models/Proyecto.ts'
import Usuario from '../../../../models/Usuario.ts'
import { formatearFecha } from '../../../../utils/formato.ts'

export const handler: Handlers = {
  async POST(req, ctx) {
    const formulario = await req.formData()
    const { idProyecto } = ctx.params

    try {
      const nombre = formulario.get('nombre')?.toString()
      const descripcion = formulario.get('descripcion')?.toString()

      if (!nombre || !descripcion) {
        throw new Error('Datos invalidos.')
      }

      const proyecto = await Proyecto.obtener(idProyecto)
      if (nombre !== proyecto.nombre) await proyecto.cambiarNombre(nombre)
      if (descripcion !== proyecto.descripcion) await proyecto.cambiarDescripcion(descripcion)

      const params = new URLSearchParams({
        mensaje: 'El proyecto se ha modificado correctamente.',
      })

      return new Response(null, {
        status: 303,
        headers: {
          'Location': `/proyecto/${idProyecto}?${params.toString()}`,
        },
      })
    } catch (error) {
      const objetoErrores = error as Error
      const params = new URLSearchParams({
        error: objetoErrores.message,
      })

      return new Response(null, {
        status: 303,
        headers: {
          'Location': `/proyecto/${idProyecto}/editar?${params.toString()}`,
        },
      })
    }
  },
}

export default async function EditarProyecto(_req: Request, ctx: FreshContext<Usuario>) {
  const { idProyecto } = ctx.params
  const error = ctx.url.searchParams.get('error') || ''
  const mensaje = ctx.url.searchParams.get('mensaje') || ''
  const proyecto = await Proyecto.obtener(idProyecto)

  return (
    <div class={`${ctx.state.tema} min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200`}>
      {/* Mensajes de estado */}
      {error ? <ModalError mensaje={error} /> : ''}
      {mensaje
        ? (
          <ModalLink
            mensaje={mensaje}
            enlace={`/proyecto/${idProyecto}/`}
            textoEnlace='Aceptar'
          />
        )
        : ''}

      <NavBar rol='admin' />

      {/* Header de edición */}
      <header class='pt-20 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200'>
        <div class='max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8'>
          <div class='flex flex-col'>
            <div class='flex justify-between items-start'>
              <div>
                <h1 class='text-3xl font-bold text-gray-900 dark:text-white'>
                  {proyecto.nombre}
                </h1>
                <p class='text-xs text-gray-500 dark:text-gray-400 mt-1'>
                  ID: {idProyecto}
                </p>
              </div>
            </div>
            <p class='text-lg text-gray-600 dark:text-gray-300 mt-4'>
              {proyecto.descripcion}
            </p>
          </div>

          <div className='w-full flex justify-end'>
            <a
              href={`/proyecto/${idProyecto}`}
            >
              <Boton>
                <IconoVolver />
                Volver
              </Boton>
            </a>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main class='max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8'>
        {/* Sección de Detalles del Proyecto */}
        <form
          method='POST'
          action={`/proyecto/${idProyecto}/editar`}
          class='bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 transition-colors duration-200'
        >
          <h2 class='text-2xl font-bold text-gray-900 dark:text-white mb-6'>Detalles del Proyecto</h2>

          <div class='space-y-6'>
            <Input
              label='Nombre'
              type='text'
              name='nombre'
              value={proyecto.nombre}
            />
            <AreaTexto
              label='Descripción'
              name='descripcion'
              value={proyecto.descripcion}
            />

            <div class='flex items-center gap-4'>
              <div class='flex-1'>
                <label class='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  Fecha de creación
                </label>
                <p class='text-gray-900 dark:text-white'>{formatearFecha(proyecto.fechaCreacion)}</p>
              </div>
            </div>
          </div>
          <div className='w-full flex justify-end items-end'>
            <Boton>Guardar cambios</Boton>
          </div>
        </form>
      </main>
    </div>
  )
}
