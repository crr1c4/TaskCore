// routes/proyectos/[idProyecto]/tareas/nueva.tsx
import { FreshContext, Handlers } from '$fresh/server.ts'
import Tarea from '../../../../models/Tarea.ts'
import NavBar from '../../../../islands/NavBar.tsx'
import Usuario from '../../../../models/Usuario.ts'
import { Boton } from '../../../../components/Boton.tsx'
import { Input } from '../../../../components/Input.tsx'
import { IconoVolver } from '../../../../components/Iconos.tsx'
import { AreaTexto } from '../../../../components/AreaTexto.tsx'
import Proyecto from '../../../../models/Proyecto.ts'

export const handler: Handlers = {
  async POST(req, ctx) {
    const formData = await req.formData()
    const nombre = formData.get('nombre')?.toString()
    const descripcion = formData.get('descripcion')?.toString()
    const fecha = formData.get('fecha')?.toString()
    const hora = formData.get('hora')?.toString()  
    const responsable = formData.get('responsable')?.toString()

    if (!nombre || !descripcion || !fecha || !hora || !responsable) {
      return new Response('Faltan campos requeridos', { status: 400 })
    }

    const fechaExpiracion = new Date(`${fecha}T${hora}`)

    const tarea = Tarea.crear(
      nombre,
      descripcion,
      fechaExpiracion,
      responsable
    )

    const proyecto = await Proyecto.obtener(ctx.params.idProyecto) 
    await proyecto.agregarTarea(tarea)

    return new Response(null, {
      status: 303,
      headers: {
        Location: `/proyecto/${ctx.params.idProyecto}?mensaje=Tarea creada correctamente`,
      },
    })
  },
}

export default async function NuevaTarea(_req: Request, ctx: FreshContext<Usuario>) {
  // Obtener fecha actual en formato YYYY-MM-DD
  const hoy = new Date()
  const fechaActual = hoy.toISOString().split('T')[0]
  const { idProyecto } = ctx.params
  const proyecto = await Proyecto.obtener(idProyecto)

  return (
    <div class={`${ctx.state.tema} min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300`}>
      <NavBar rol='admin' />

      {/* Header */}
      <header class='pt-20 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300'>
        <div class='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div class='flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>
            <div>
              <h1 class='text-3xl font-bold text-gray-900 dark:text-white tracking-tight'>
                Crear Nueva Tarea
              </h1>
              <p class='mt-2 text-gray-600 dark:text-gray-300'>
                Completa los detalles para la tarea en:{' '}
                <span class='font-medium text-indigo-600 dark:text-indigo-400'>Proyecto {proyecto.nombre}</span>
              </p>
            </div>
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
      <main class='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
        {/* Formulario para crear tarea */}
        <section class='bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-colors duration-300'>
          <div class='p-6 border-b border-gray-200 dark:border-gray-700'>
            <h2 class='text-xl font-semibold text-gray-900 dark:text-white'>Detalles de la tarea</h2>
            <p class='mt-1 text-sm text-gray-500 dark:text-gray-400'>Completa todos los campos requeridos</p>
          </div>
          <div class='p-6'>
            <form method='POST' class='space-y-6 flex flex-col gap-2'>
              <Input
                label='Nombre de la tarea:'
                type='text'
                name='nombre'
                required
                placeholder='Ej: Implementar funcionalidad X'
              />

              <AreaTexto
                label='Descripción:'
                name='descripcion'
                rows={4}  
                required
                placeholder='Describe los detalles de la tarea...'
              />

              <div class='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <Input
                  type='date'
                  name='fecha'
                  required
                  min={fechaActual}
                  value={fechaActual}
                  label='Fecha límite:'
                />

                <Input
                  type='time'
                  name='hora'
                  required
                  value='23:59'
                  label='Hora límite:'
                />
              </div>

              <div>
                <label for='responsable' class='block text-sm font-medium text-gray-700 dark:text-white mb-2'>
                  Asignar a:
                </label>
                <select
                  name='responsable'
                  className='mt-0.5 py-2 px-4 w-full rounded border border-gray-500 focus:border-none focus:outline-none shadow-sm sm:text-sm dark:bg-slate-700 focus:ring-2 dark:ring-blue-700 dark:text-white invalid:text-rose-500 invalid:ring-rose-600'
                >
                  <option value=''>Sin asignar</option>
                  {proyecto.miembros.map((miembro) => <option key={miembro} value={miembro}>{miembro}</option>)}
                </select>
              </div>

              <div class='flex justify-end pt-4'>
                <Boton>
                  <svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 mr-2' viewBox='0 0 20 20' fill='currentColor'>
                    <path
                      fill-rule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z'
                      clip-rule='evenodd'
                    />
                  </svg>
                  Crear Tarea
                </Boton>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}
