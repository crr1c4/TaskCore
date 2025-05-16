import { Handlers } from '$fresh/server.ts'
import Proyecto from '../../../../../../models/Proyecto.ts'

/**
 * Handler para alternar estado de completitud de tareas
 * @module ToggleTaskHandler
 * @description
 * Maneja las solicitudes para cambiar el estado de completitud de una tarea,
 * incluyendo actualización en la base de datos y notificaciones.
 */
export const handler: Handlers = {
  /**
   * Maneja solicitudes POST para alternar estado de tarea
   * @async
   * @function POST
   * @param _req - Objeto Request (no utilizado directamente)
   * @param ctx - Contexto de Fresh con parámetros de ruta
   * @returns Redirección HTTP 303 con:
   * - Mensaje de éxito (estado actualizado)
   * - Mensaje de error (si falla la operación)
   *
   * @description
   * Flujo de operación:
   * 1. Extrae IDs de proyecto y tarea de los parámetros de ruta
   * 2. Obtiene el proyecto y la tarea específica
   * 3. Alterna el estado de completitud
   * 4. Actualiza la tarea en el proyecto
   * 5. Redirige con mensaje contextual
   *
   * Notificaciones:
   * - El método actualizarTarea() maneja notificaciones automáticas:
   *   * Al administrador cuando se completa
   * * Al responsable cuando cambia la asignación
   *
   * @example
   * // Ruta: POST /api/proyectos/[idProyecto]/tareas/[idTarea]/toggle
   * // Redirección exitosa: /a/proyectos/[idProyecto]/tareas/[idTarea]?mensaje=...
   * // Redirección con error: /a/proyectos/[idProyecto]/tareas/[idTarea]?error=...
   */
  async POST(_req, ctx) {
    try {
      const { idProyecto, idTarea } = ctx.params
      const proyecto = await Proyecto.obtener(idProyecto)
      const tarea = await proyecto.obtenerTarea(idTarea)

      tarea.completada = !tarea.completada
      proyecto.actualizarTarea(idTarea, tarea)

      const params = new URLSearchParams({
        mensaje: tarea.completada
          ? 'Tarea marcada como completada correctamente.'
          : 'Tarea marcada como no completada.',
      })

      return new Response(null, {
        status: 303,
        headers: {
          Location: `/a/proyectos/${idProyecto}/tareas/${idTarea}?${params.toString()}`,
        },
      })
    } catch (error) {
      const e = error as Error
      const params = new URLSearchParams({
        error: e.message,
      })

      return new Response(null, {
        status: 303,
        headers: {
          Location: `/a/proyectos/${ctx.params.idProyecto}/tareas/${ctx.params.idTarea}?${params.toString()}`,
        },
      })
    }
  },
}
