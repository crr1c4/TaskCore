// routes/proyecto/[idProyecto]/tareas/[idTarea].tsx
import { FreshContext, Handlers, PageProps } from '$fresh/server.ts'
import Tarea from '../../../../../../models/Tarea.ts'
import Proyecto from '../../../../../../models/Proyecto.ts'
import NavBar from '../../../../../../islands/NavBar.tsx'
import { Boton, BotonEmergencia } from '../../../../../../components/Boton.tsx'
import { IconoEditar, IconoEliminar, IconoPeligro, IconoVolver } from '../../../../../../components/Iconos.tsx'
import { formatearFecha, formatearFechaYHora, tiempoRestanteDetallado } from '../../../../../../utils/formato.ts'
import Usuario from '../../../../../../models/Usuario.ts'
import { AreaTexto } from '../../../../../../components/AreaTexto.tsx'
import { ModalError, ModalLink } from '../../../../../../islands/Modal.tsx'

// export const handler: Handlers<Tarea> = {
//   async GET(_, ctx) {
//     const { idProyecto, idTarea } = ctx.params;
//     // Obtener la tarea desde la base de datos
//     const proyecto = await Proyecto.obtener(idProyecto);
//     const tarea = proyecto.tareas.find(t => t.id === idTarea);
//
//     if (!tarea) {
//       return new Response("Tarea no encontrada", { status: 404 });
//     }
//
//     return ctx.render(tarea);
//   },
//
//   async POST(req, ctx) {
//     const formData = await req.formData();
//     const comentario = formData.get("comentario")?.toString();
//     const usuario = ctx.state.user; // Asume que tienes el usuario en el estado
//
//     if (!comentario) {
//       return new Response("El comentario no puede estar vacío", { status: 400 });
//     }
//
//     const { idProyecto, idTarea } = ctx.params;
//     const proyecto = await Proyecto.obtener(idProyecto);
//     const tarea = proyecto.tareas.find(t => t.id === idTarea);
//
//     if (!tarea) {
//       return new Response("Tarea no encontrada", { status: 404 });
//     }
//
//     // Agregar nuevo comentario
//     const nuevoComentario: Comment = {
//       id: crypto.randomUUID(),
//       autor: usuario.nombre,
//       correo: usuario.correo,
//       contenido: comentario,
//       fecha: new Date()
//     };
//
//     tarea.comentarios.push(nuevoComentario);
//     await proyecto.guardar();
//
//     return new Response(null, {
//       status: 303,
//       headers: { Location: `/proyecto/${idProyecto}/tareas/${idTarea}` }
//     });
//   }
// };
export default async function VisualizarTarea(_req: Request, ctx: FreshContext<Usuario>) {
  try {
    const { idProyecto, idTarea } = ctx.params
    const error = ctx.url.searchParams.get('error') || ''
    const mensaje = ctx.url.searchParams.get('mensaje') || ''
    const proyecto = await Proyecto.obtener(idProyecto)
    const tarea = await proyecto.obtenerTarea(idTarea)

    return (
      <div class={`${ctx.state.tema} min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200`}>
        <NavBar rol={ctx.state.rol} />

        {/* Mensajes de estado */}
        {error ? <ModalError mensaje={error} /> : ''}
        {mensaje
          ? (
            <ModalLink
              mensaje={mensaje}
              enlace={`/a/proyectos/${idProyecto}/tareas/${idTarea}`}
              textoEnlace='Aceptar'
            />
          )
          : ''}

        <div class='max-w-4xl mx-auto px-4 py-8'>
          {/* Encabezado mejorado */}
          <div class='mt-20 mb-8'>
            <div class='flex flex-col lg:flex-row justify-between gap-4'>
              {/* Título */}
              <div class='flex-grow'>
                <h1 class='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2'>
                  Detalles de la Tarea
                </h1>
                <p class='text-gray-600 dark:text-gray-400 text-sm sm:text-base'>
                  Información completa y gestión de comentarios
                </p>
              </div>

              <div class='flex flex-col xs:flex-row gap-2 flex-shrink-0'>
                <a href={`/a/proyectos/${idProyecto}`}>
                  <Boton>
                    <IconoVolver />
                    Volver
                  </Boton>
                </a>

                {ctx.state.rol === 'admin' && (
                  <>
                    <a href={`/a/proyectos/${idProyecto}/tareas/${idTarea}/editar`}>
                      <Boton>
                        <IconoEditar />
                        Editar
                      </Boton>
                    </a>

                    <a href={`/a/proyectos/${idProyecto}/tareas/${idTarea}/eliminar`}>
                      <BotonEmergencia>
                        <IconoEliminar />
                        Eliminar
                      </BotonEmergencia>
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Tarjeta de información de la tarea */}
          <div class='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8 transition-colors duration-200'>
            <div class='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <h2 class='text-xl font-semibold text-gray-900 dark:text-white mb-2'>{tarea.nombre}</h2>
                <p class='text-gray-700 dark:text-gray-300'>{tarea.descripcion}</p>
              </div>

              <div class='space-y-4'>
                <div>
                  <h3 class='text-sm font-medium text-gray-500 dark:text-gray-400'>Estado</h3>
                  <span
                    class={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      tarea.obtenerEstado() === 'completado'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : tarea.obtenerEstado() === 'expirado'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                    }`}
                  >
                    {tarea.obtenerEstado()}
                  </span>
                </div>

                <div class='space-y-2'>
                  <div>
                    <h3 class='text-sm font-medium text-gray-500 dark:text-gray-400'>Fecha Límite</h3>
                    <p class='text-gray-900 dark:text-white'>
                      {formatearFechaYHora(tarea.fechaExpiracion)}
                    </p>
                  </div>
                  <div>
                    <h3 class='text-sm font-medium text-gray-500 dark:text-gray-400'>Tiempo Restante</h3>
                    <p
                      class={`font-medium ${
                        tarea.haExpirado() ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'
                      }`}
                    >
                      {tiempoRestanteDetallado(tarea.fechaExpiracion)}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 class='text-sm font-medium text-gray-500 dark:text-gray-400'>Responsable</h3>
                  <div class='flex items-center gap-2 mt-1'>
                    <span class='inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700'>
                      <span class='text-sm font-medium text-gray-600 dark:text-gray-300'>
                        {tarea.correoResponsable.charAt(0).toUpperCase()}
                      </span>
                    </span>
                    <p class='text-gray-900 dark:text-white'>{tarea.correoResponsable}</p>
                  </div>
                </div>

                {/* Botón para marcar como completada */}
                {tarea.obtenerEstado() === 'en progreso'
                  ? (
                    <form method='POST' action={`/a/proyectos/${idProyecto}/tareas/${idTarea}/completar`}>
                      <Boton>
                        Marcar como completada
                      </Boton>
                    </form>
                  )
                  : tarea.obtenerEstado() === 'completado'
                  ? (
                    <form method='POST' action={`/a/proyectos/${idProyecto}/tareas/${idTarea}/completar`}>
                      <Boton>
                        Marcar como no completada
                      </Boton>
                    </form>
                  )
                  : (
                    <div class='flex items-center justify-center p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'>
                      <IconoPeligro />
                      <span class='text-red-600 dark:text-red-400 font-medium'>La tarea ha caducado</span>
                    </div>
                  )}
              </div>
            </div>
          </div>

          {/* Sección de comentarios */}
          <div class='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors duration-200'>
            <h2 class='text-xl font-semibold text-gray-900 dark:text-white mb-6'>Comentarios</h2>

            {/* Resto del código de comentarios... */}
            <form method='POST' class='mt-8'>
              <div class='mb-4'>
                <AreaTexto
                  label='Agregar comentario'
                  name='comentario'
                  rows={3}
                  required
                  placeholder='Escribe tu comentario aquí...'
                />
              </div>
              <Boton>
                Publicar comentario
              </Boton>
            </form>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    const mensajeError = error instanceof Error ? error.message : 'Error desconocido al cargar el proyecto'

    const params = new URLSearchParams({
      error: mensajeError,
    })

    return new Response(null, {
      status: 303,
      headers: {
        Location: `/a/?${params.toString()}`,
      },
    })
  }
}
