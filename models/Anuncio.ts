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
