export type TipoNotificacion = 'comentario' | 'aviso' | 'advertencia' | 'recordatorio'

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
