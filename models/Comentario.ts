/**
 * Clase que representa un Comentario en el sistema
 * @class Comentario
 * @property {string} id - Identificador único generado automáticamente (UUID v4)
 * @property {string} cuerpo - Contenido textual del comentario
 * @property {string} creadoPor - Identificador del autor del comentario
 * @property {Date} fecha - Fecha de creación automática (se genera al instanciar)
 *
 * @description
 * Modelo que define la estructura básica de un comentario con:
 * - Generación automática de ID y fecha
 * - Referencia al autor del comentario
 * - Contenido textual del comentario
 *
 * @example
 * // Crear un nuevo comentario
 * const comentario = new Comentario(
 *   'Este es el contenido del comentario',
 *   'usuario123'
 * );
 */
export default class Comentario {
  id: string
  cuerpo: string
  creadoPor: string
  fecha: Date

  public constructor(cuerpo: string, creadoPor: string) {
    this.id = crypto.randomUUID()
    this.cuerpo = cuerpo
    this.creadoPor = creadoPor
    this.fecha = new Date()
  }
}
