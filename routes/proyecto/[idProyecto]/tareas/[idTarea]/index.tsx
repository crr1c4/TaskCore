// routes/proyecto/[idProyecto]/tareas/[idTarea].tsx
import { FreshContext, Handlers, PageProps } from '$fresh/server.ts'
import Tarea from '../../../../../models/Tarea.ts'
import Proyecto from '../../../../../models/Proyecto.ts'
import NavBar from '../../../../../islands/NavBar.tsx'
import { Boton, BotonEmergencia } from '../../../../../components/Boton.tsx'
import { IconoEditar, IconoEliminar, IconoVolver } from '../../../../../components/Iconos.tsx'
import { formatearFecha } from '../../../../../utils/formato.ts'
import Usuario from '../../../../../models/Usuario.ts'

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
      {/* Encabezado con botones de acción */}
        <div class="mt-20 flex justify-between items-center mb-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
              Detalles de la Tarea
            </h1>
            <p class="text-gray-600 dark:text-gray-400 mt-2">
              Información completa y gestión de comentarios
            </p>
          </div>
          <div class="flex gap-2">
            <a href={`/proyecto/${idProyecto}`}>
              <Boton>
                <IconoVolver />
                Volver
              </Boton>
            </a>
            <a href={`/proyecto/${idProyecto}/tareas/${idTarea}/editar`}>
              <Boton>
                <IconoEditar />
                Editar
              </Boton>
            </a>
            <a href={`/proyecto/${idProyecto}/tareas/${idTarea}/eliminar`}>
              <BotonEmergencia>
                <IconoEliminar />
                Eliminar
              </BotonEmergencia>
            </a>
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

              <div>
                <h3 class='text-sm font-medium text-gray-500 dark:text-gray-400'>Fecha Límite</h3>
                <p class='text-gray-900 dark:text-white'>{formatearFecha(tarea.fechaExpiracion)}</p>
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

          {/*tarea.comentarios.length === 0
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
            )*/}

          {/* Formulario para nuevo comentario */}
          <form method='POST' class='mt-8'>
            <div class='mb-4'>
              <label for='comentario' class='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Agregar comentario
              </label>
              <textarea
                id='comentario'
                name='comentario'
                rows={3}
                required
                class='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white'
                placeholder='Escribe tu comentario aquí...'
              >
              </textarea>
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
