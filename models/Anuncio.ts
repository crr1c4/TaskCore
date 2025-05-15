/**
 * Clase que representa un Anuncio en el sistema
 * @class Anuncio
 * @property {string} id - Identificador único generado automáticamente
 * @property {string} titulo - Título del anuncio
 * @property {string} descripcion - Contenido/descripción del anuncio
 * @property {Date} fechaPublicacion - Fecha de publicación del anuncio
 *
 * @description
 * Modelo que define la estructura de un anuncio con:
 * - ID único generado automáticamente (UUID v4)
 * - Campos básicos para información del anuncio
 * - Fecha de publicación manejada como objeto Date
 *
 * @example
 * const nuevoAnuncio = new Anuncio(
 *   'Nueva función disponible',
 *   'Hemos agregado soporte para notificaciones push',
 *   new Date()
 * )
 */
export default class Anuncio {
  public id: string
  public titulo: string
  public descripcion: string
  public fechaPublicacion: Date

  public constructor(titulo: string, descripcion: string, fechaPublicacion: Date) {
    this.id = crypto.randomUUID()
    this.titulo = titulo
    this.descripcion = descripcion
    this.fechaPublicacion = fechaPublicacion
  }
}
