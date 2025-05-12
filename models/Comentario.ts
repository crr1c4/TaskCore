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
