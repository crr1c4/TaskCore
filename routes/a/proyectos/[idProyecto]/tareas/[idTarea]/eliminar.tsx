import { FreshContext, Handlers } from '$fresh/server.ts'
import NavBar from '../../../../../../islands/NavBar.tsx'
import { ModalError } from '../../../../../../islands/Modal.tsx'
import Proyecto from '../../../../../../models/Proyecto.ts'
import Usuario from '../../../../../../models/Usuario.ts'
import { Boton, BotonEmergencia } from '../../../../../../components/Boton.tsx'

export const handler: Handlers<Usuario> = {
  async POST(_req, ctx) {
    const { idProyecto, idTarea } = ctx.params
    try {
      const proyecto = await Proyecto.obtener(idProyecto)
      await proyecto.eliminarTarea(idTarea)

      const params = new URLSearchParams({
        mensaje: 'Tarea eliminada correctamente.' 
      })

      return new Response(null, {
        status: 303,
        headers: { Location: `/a/proyectos/${idProyecto}?${params.toString()}` },
      })
    } catch (error) {
      const e = error as Error

      const params = new URLSearchParams({
        error: e.message
      })


      return new Response(null, {
        status: 303,
        headers: {
          Location: `/a/proyectos/${idProyecto}/tareas/${idTarea}/eliminar?error=${params.toString()}`,
        },
      })
    }
  },
  async GET(_req, ctx) {
    // Si el usuario es administrador, se permite continuar con la petición.
    if (ctx.state.rol !== 'admin') return new Response(null, {
      status: 301, // Redirección permanente
      headers: { Location: '/a/' },
    })

    const respuesta = await ctx.render()
    return respuesta
  },
}

export default async function EliminarTarea(_req: Request, ctx: FreshContext<Usuario>) {
  const { idProyecto, idTarea } = ctx.params
  const error = ctx.url.searchParams.get('error')
  const proyecto = await Proyecto.obtener(idProyecto)
  const tarea = await proyecto.obtenerTarea(idTarea)

  return (
    <div class={`${ctx.state.tema} min-h-screen bg-gray-50 dark:bg-gray-900`}>
      {/* Mensaje de error */}
      {error && <ModalError mensaje={error} />}

      <NavBar rol='admin' />

      <main class='pt-20 max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8'>
        <div class='bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center'>
          <div class='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-rose-100 dark:bg-rose-900/20 mb-4'>
            <svg
              class='h-6 w-6 text-rose-600 dark:text-rose-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
              />
            </svg>
          </div>

          <h2 class='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
            ¿Eliminar tarea?
          </h2>

          <p class='text-gray-600 dark:text-gray-300 mb-6'>
            Estás por eliminar permanentemente la tarea:<br />
            <span class='font-medium text-gray-900 dark:text-white'>"{tarea.nombre}"</span>
          </p>

          <p class='text-sm text-gray-500 dark:text-gray-400 mb-8'>
            Esta acción no se puede deshacer. Todos los datos asociados serán eliminados.
          </p>

          <div class='flex justify-center gap-4'>
            <a
              href={`/a/proyectos/${idProyecto}/tareas/${idTarea}`}
            >
              <Boton>
                Cancelar
              </Boton>
            </a>

            <form method='POST' class='inline'>
              <BotonEmergencia>
                Sí, eliminar
              </BotonEmergencia>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
