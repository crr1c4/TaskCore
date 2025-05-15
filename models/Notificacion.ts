/**
 * Tipo enumerado para clasificar notificaciones
 * @description
 * Define los tipos posibles de notificaciones:
 * - 'comentario': Notificación sobre nuevos comentarios
 * - 'aviso': Notificación informativa general
 * - 'advertencia': Notificación de alerta/error
 * - 'recordatorio': Notificación de recordatorio
 */
export type TipoNotificacion = 'comentario' | 'aviso' | 'advertencia' | 'recordatorio'

/**
 * Clase que representa una Notificación en el sistema
 * @class Notificacion
 * @property {string} id - Identificador único generado automáticamente (UUID v4)
 * @property {string} titulo - Título descriptivo de la notificación
 * @property {string} contenido - Cuerpo/texto de la notificación
 * @property {Date} fechaCreacion - Fecha de creación (auto-generada)
 * @property {TipoNotificacion} tipo - Tipo/clasificación de la notificación
 * @property {Date} fechaExpiracion - Fecha de expiración (24h después de creación)
 *
 * @description
 * Modelo que representa una notificación con:
 * - Generación automática de ID y fechas
 * - Clasificación por tipos predefinidos
 * - Caducidad automática en 24 horas
 * - Valores por defecto para tipo ('aviso')
 *
 * @example
 * // Crear notificación de advertencia
 * const notificacion = new Notificacion(
 *   'Problema de conexión',
 *   'No se pudo establecer conexión con el servidor',
 *   'advertencia'
 * );
 *
 * @example
 * // Crear notificación con tipo por defecto (aviso)
 * const notificacion = new Notificacion(
 *   'Nueva actualización',
 *   'Se ha desplegado la versión 2.1.0'
 * );
 */
export default class Notificacion {
  public readonly id: string
  public titulo: string
  public contenido: string
  public fechaCreacion: Date
  tipo: TipoNotificacion
  public fechaExpiracion: Date

  public constructor(titulo: string, contenido: string, tipo: TipoNotificacion = 'aviso') {
    this.id = crypto.randomUUID()
    this.titulo = titulo
    this.contenido = contenido
    this.fechaCreacion = new Date()
    this.fechaExpiracion = new Date()
    this.fechaExpiracion.setHours(this.fechaExpiracion.getDate() + 24)
    this.tipo = tipo
  }
}
