// routes/proyectos/[idProyecto]/tareas/[idTarea]/editar.tsx
import { FreshContext, Handlers } from '$fresh/server.ts'
import NavBar from '../../../../../../islands/NavBar.tsx'
import { Boton } from '../../../../../../components/Boton.tsx'
import { Input } from '../../../../../../components/Input.tsx'
import { IconoEditar, IconoVolver } from '../../../../../../components/Iconos.tsx'
import { AreaTexto } from '../../../../../../components/AreaTexto.tsx'
import Proyecto from '../../../../../../models/Proyecto.ts'
import { ModalError } from '../../../../../../islands/Modal.tsx'
import Usuario from '../../../../../../models/Usuario.ts'

export const handler: Handlers = {
  async POST(req, ctx) {
    const formulario = await req.formData()
    const { idProyecto, idTarea } = ctx.params

    try {
      const nombre = formulario.get('nombre')?.toString()
      const descripcion = formulario.get('descripcion')?.toString()
      const fecha = formulario.get('fecha')?.toString()
      const hora = formulario.get('hora')?.toString()
      const responsable = formulario.get('responsable')?.toString()

      if (!nombre || !descripcion || !fecha || !hora || !responsable) {
        throw new Error('Todos los campos son requeridos')
      }

      const fechaExpiracion = new Date(`${fecha}T${hora}`)

      if (isNaN(fechaExpiracion.getTime())) {
        throw new Error('Fecha y hora inválidas')
      }

      const proyecto = await Proyecto.obtener(idProyecto)
      const tarea = await proyecto.obtenerTarea(idTarea)

      // Actualizar campos modificados
      if (nombre !== tarea.nombre) tarea.nombre = nombre
      if (descripcion !== tarea.descripcion) tarea.descripcion = descripcion
      if (fechaExpiracion.getTime() !== tarea.fechaExpiracion.getTime()) {
        tarea.fechaExpiracion = fechaExpiracion
      }
      if (responsable !== tarea.correoResponsable) {
        tarea.correoResponsable = responsable
      }

      await proyecto.actualizarTarea(idTarea, tarea)
      const params = new URLSearchParams({
        mensaje: 'La tarea se ha actualizado correctamente.',
      })

      return new Response(null, {
        status: 303,
        headers: {
          Location: `/a/proyectos/${idProyecto}/tareas/${idTarea}?${params.toString()}`,
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
          Location: `/a/proyectos/${idProyecto}/tareas/${idTarea}/editar?${params.toString()}`,
        },
      })
    }
  },

  async GET(_req, ctx) {
    if (ctx.state.rol !== 'admin') {
      return new Response(null, {
        status: 301,
        headers: { Location: '/a/' },
      })
    }

    const respuesta = await ctx.render()
    return respuesta
  },
}

export default async function EditarTarea(_req: Request, ctx: FreshContext<Usuario>) {
  const { idProyecto, idTarea } = ctx.params
  const error = ctx.url.searchParams.get('error') || ''

  const proyecto = await Proyecto.obtener(idProyecto)
  const tarea = await proyecto.obtenerTarea(idTarea)

  // Formatear fecha existente
  const fechaLocal = new Date(tarea.fechaExpiracion)
  fechaLocal.setMinutes(fechaLocal.getMinutes() - fechaLocal.getTimezoneOffset())
  const fechaExistente = fechaLocal.toISOString().split('T')[0]

  // Otra alternativa usando solo métodos de fecha
  const horaExistente = tarea.fechaExpiracion.toTimeString().slice(0, 5)

  return (
    <div class={`${ctx.state.tema} min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300`}>
      <NavBar rol='admin' />

      {error ? <ModalError mensaje={error} /> : ''}

      {/* Header */}
      <header class='pt-20 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300'>
        <div class='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div class='flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>
            <div>
              <h1 class='text-3xl font-bold text-gray-900 dark:text-white tracking-tight'>
                Editar Tarea: {tarea.nombre}
              </h1>
              <p class='mt-2 text-gray-600 dark:text-gray-300'>
                Modifica los detalles de la tarea en:{' '}
                <span class='font-medium text-indigo-600 dark:text-indigo-400'>{proyecto.nombre}</span>
              </p>
            </div>
            <a href={`/a/proyectos/${idProyecto}/tareas/${idTarea}`}>
              <Boton>
                <IconoVolver />
                Volver
              </Boton>
            </a>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main class='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
        <section class='bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-colors duration-300'>
          <div class='p-6 border-b border-gray-200 dark:border-gray-700'>
            <h2 class='text-xl font-semibold text-gray-900 dark:text-white'>Editar detalles</h2>
            <p class='mt-1 text-sm text-gray-500 dark:text-gray-400'>Actualiza los campos necesarios</p>
          </div>
          <div class='p-6'>
            <form method='POST' class='space-y-6 flex flex-col gap-2'>
              <Input
                label='Nombre de la tarea:'
                type='text'
                name='nombre'
                required
                value={tarea.nombre}
                placeholder='Ej: Implementar funcionalidad X'
              />

              <AreaTexto
                label='Descripción:'
                name='descripcion'
                rows={4}
                required
                value={tarea.descripcion}
                placeholder='Describe los detalles de la tarea...'
              />

              <div class='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <Input
                  type='date'
                  name='fecha'
                  required
                  value={fechaExistente}
                  label='Fecha límite:'
                />

                <Input
                  type='time'
                  name='hora'
                  required
                  value={horaExistente}
                  label='Hora límite:'
                />
              </div>

              <div>
                <label for='responsable' class='block text-sm font-medium text-gray-700 dark:text-white mb-2'>
                  Responsable:
                </label>
                <select
                  name='responsable'
                  class='mt-0.5 py-2 px-4 w-full rounded border border-gray-500 focus:border-none focus:outline-none shadow-sm sm:text-sm dark:bg-slate-700 focus:ring-2 dark:ring-blue-700 dark:text-white invalid:text-rose-500 invalid:ring-rose-600'
                  value={tarea.correoResponsable}
                >
                  <option value=''>Sin asignar</option>
                  {proyecto.integrantes.map((miembro) => (
                    <option key={miembro} value={miembro} selected={miembro === tarea.correoResponsable}>
                      {miembro}
                    </option>
                  ))}
                </select>
              </div>

              <div class='flex justify-end pt-4'>
                <Boton>
                  <IconoEditar />
                  Guardar Cambios
                </Boton>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}
