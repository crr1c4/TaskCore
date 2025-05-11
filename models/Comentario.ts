export default class Comentario {
  id: string
  cuerpo: string
  creadoPor: string

  public constructor(id: string, cuerpo: string, creadoPor: string) {
    this.id = id
    this.cuerpo = cuerpo
    this.creadoPor = creadoPor
  }
}

