import { Handlers } from '$fresh/server.ts'
import Proyecto from '../../../../../../models/Proyecto.ts'

/**
 * Handler para eliminación de anuncios de proyectos
 * @module AnuncioHandlers
 * @description
 * Maneja las solicitudes de eliminación de anuncios mediante:
 * - Validación de parámetros de ruta
 * - Operaciones seguras en base de datos
 * - Redirección con feedback al usuario
 */
export const handler: Handlers = {
  /**
   * Maneja solicitudes GET para eliminar un anuncio
   * @async
   * @function GET
   * @param {Request} _req - Objeto Request (no utilizado directamente)
   * @param {Context} ctx - Contexto de Fresh con parámetros de ruta
   * @returns {Promise<Response>} Redirección HTTP 303 con:
   * - Mensaje de éxito (eliminación exitosa)
   * - Mensaje de error (si falla la operación)
   *
   * @description
   * Flujo de operación:
   * 1. Extrae IDs de proyecto y anuncio de los parámetros de ruta
   * 2. Obtiene el proyecto desde la base de datos
   * 3. Elimina el anuncio especificado
   * 4. Redirige a la página del proyecto con feedback
   *
   * Manejo de errores:
   * - Captura y tipa errores
   * - Redirige conservando el ID de proyecto original
   * - Incluye mensaje de error en parámetros URL
   *
   * Seguridad:
   * - Operaciones atómicas en base de datos
   * - Validación implícita mediante modelo Proyecto
   * - No expone información sensible en errores
   *
   * @example
   * // Ruta: /api/proyectos/[idProyecto]/anuncios/[idAnuncio]
   * // Método: GET
   * // Redirección exitosa: /a/proyectos/[idProyecto]?mensaje=...
   * // Redirección con error: /a/proyectos/[idProyecto]?error=...
   */
  async GET(_req, ctx) {
    try {
      const { idProyecto, idAnuncio } = ctx.params
      const proyecto = await Proyecto.obtener(idProyecto)
      await proyecto.eliminarAnuncio(idAnuncio)

      const params = new URLSearchParams({
        mensaje: 'Anuncio elminado correctamente.',
      })

      return new Response(null, {
        status: 303,
        headers: {
          Location: `/a/proyectos/${idProyecto}?${params.toString()}`,
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
          Location: `/a/proyectos/${ctx.params.idProyecto}?${params.toString()}`,
        },
      })
    }
  },
}
