import { Handlers } from '$fresh/server.ts';
import Proyecto from '../../../../../../models/Proyecto.ts';

export const handler: Handlers = {
  async POST(_req, ctx) {
    try {
      const { idProyecto, idTarea } = ctx.params;
      const proyecto = await Proyecto.obtener(idProyecto);
      const tarea = await proyecto.obtenerTarea(idTarea);

      tarea.completada = !tarea.completada
      proyecto.actualizarTarea(idTarea, tarea)

      const params = new URLSearchParams({
        mensaje: tarea.completada ? 'Tarea marcada como completada correctamente.' : "Tarea marcada como no completada",
      });

      return new Response(null, {
        status: 303,
        headers: {
          Location: `/a/proyectos/${idProyecto}/tareas/${idTarea}?${params.toString()}`,
        },
      });
    } catch (error) {
      const e = error as Error;
      const params = new URLSearchParams({
        error: e.message,
      });

      return new Response(null, {
        status: 303,
        headers: {
          Location: `/a/proyectos/${ctx.params.idProyecto}/tareas/${ctx.params.idTarea}?${params.toString()}`,
        },
      });
    }
  },
};
