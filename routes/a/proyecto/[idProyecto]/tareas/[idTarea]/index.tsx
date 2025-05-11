// routes/proyecto/[idProyecto]/tareas/[idTarea].tsx
import { FreshContext, Handlers, PageProps } from '$fresh/server.ts'
import Tarea from '../../../../../models/Tarea.ts'
import Proyecto from '../../../../../models/Proyecto.ts'
import NavBar from '../../../../../islands/NavBar.tsx'
import { Boton, BotonEmergencia } from '../../../../../components/Boton.tsx'
import { IconoEditar, IconoEliminar, IconoVolver } from '../../../../../components/Iconos.tsx'
import { formatearFecha, formatearFechaYHora, tiempoRestanteDetallado } from '../../../../../utils/formato.ts'
import Usuario from '../../../../../models/Usuario.ts'
import { AreaTexto } from '../../../../../components/AreaTexto.tsx'

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
  const { idProyecto, idTarea } = ctx.params
  const proyecto = await Proyecto.obtener(idProyecto)
  const tarea = await proyecto.obtenerTarea(idTarea)

  return (
    <div class={`${ctx.state.tema} min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200`}>
      <NavBar rol='admin' />

      <div class='max-w-4xl mx-auto px-4 py-8'>
        {/* Encabezado con botones de acción - Versión responsive mejorada */}

        {/* Encabezado mejorado */}
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

            {/* Botones TODO: Cambiar por Boton */}
            <div class='flex flex-col xs:flex-row gap-2 flex-shrink-0'>
              <a
                href={`/proyecto/${idProyecto}`}
                class=' inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-600'
              >
                <IconoVolver />
                Volver
              </a>

              <a
                href={`/proyecto/${idProyecto}/tareas/${idTarea}/editar`}
                class='inline-flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              >
                <IconoEditar />
                Editar
              </a>

              <a
                href={`/proyecto/${idProyecto}/tareas/${idTarea}/eliminar`}
                class='inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors dark:bg-red-700 dark:hover:bg-red-600'
              >
                <IconoEliminar />
                Eliminar
              </a>
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
                    tarea.completada
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : tarea.haExpirado()
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
                <p class='text-gray-900 dark:text-white'>{tarea.correoResponsable}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de comentarios */}
        <div class='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors duration-200'>
          <h2 class='text-xl font-semibold text-gray-900 dark:text-white mb-6'>Comentarios</h2>

          {
            /*tarea.comentarios.length === 0
            ? <p class='text-gray-500 dark:text-gray-400 text-center py-4'>No hay comentarios aún</p>
            : (
              <div class='space-y-4'>
                {tarea.comentarios.map((comentario) => (
                  <div class='border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0'>
                    <div class='flex justify-between items-start mb-2'>
                      <div>
                        <p class='font-medium text-gray-900 dark:text-white'>{comentario.autor}</p>
                        <p class='text-sm text-gray-500 dark:text-gray-400'>{comentario.correo}</p>
                      </div>
                      <span class='text-sm text-gray-500 dark:text-gray-400'>
                        {formatearFecha(comentario.fecha)}
                      </span>
                    </div>
                    <p class='text-gray-700 dark:text-gray-300'>{comentario.contenido}</p>
                  </div>
                ))}
              </div>
            )*/
          }

          {/* Formulario para nuevo comentario */}
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
}
