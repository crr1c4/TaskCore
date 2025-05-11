export default class Notificacion {
  public readonly id: string
  public titulo: string
  public contenido: string
  public fechaCreacion: Date
  public fechaExpiracion: Date

  public constructor(titulo: string, contenido: string, fechaExpiracion: Date) {
    this.id = crypto.randomUUID()
    this.titulo = titulo
    this.contenido = contenido
    this.fechaCreacion = new Date()
    this.fechaExpiracion = fechaExpiracion
  }

  // /**
  //  * Calcula la diferencia entre dos fechas y devuelve un objeto con las unidades de tiempo.
  //  * @returns Objeto con { dias, horas, minutos, segundos, milisegundos }
  //  */
  // private obtenerDiferenciaTiempo() {
  //   const diffMs = this.fechaExpiracion.getTime() - this.fechaCreacion.getTime() // Diferencia en milisegundos
  //
  //   // Cálculo de unidades
  //   const segundos = Math.floor(diffMs / 1000)
  //   const minutos = Math.floor(segundos / 60)
  //   const horas = Math.floor(minutos / 60)
  //   const dias = Math.floor(horas / 24)
  //
  //   return {
  //     dias,
  //     horas: horas % 24,
  //     minutos: minutos % 60,
  //     segundos: segundos % 60,
  //     milisegundos: diffMs % 1000,
  //   }
  // }
  //
  // public formatearDiferenciaTiempo(unidadesMostradas: number = 2) {
  //   const diferencia: ReturnType<typeof this.obtenerDiferenciaTiempo> = this.obtenerDiferenciaTiempo()
  //   const partes: string[] = []
  //
  //   if (diferencia.dias > 0) partes.push(`${diferencia.dias} día${diferencia.dias !== 1 ? 's' : ''}`)
  //   if (diferencia.horas > 0) partes.push(`${diferencia.horas} hora${diferencia.horas !== 1 ? 's' : ''}`)
  //   if (diferencia.minutos > 0) partes.push(`${diferencia.minutos} minuto${diferencia.minutos !== 1 ? 's' : ''}`)
  //   if (diferencia.segundos > 0) partes.push(`${diferencia.segundos} segundo${diferencia.segundos !== 1 ? 's' : ''}`)
  //
  //   const partesFiltradas = partes.slice(0, unidadesMostradas)
  //
  //   return partesFiltradas.join(', ') || '0 segundos'
  // }
}
