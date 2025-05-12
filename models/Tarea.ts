export default class Tarea {
  public readonly id: string
  public nombre: string
  public completada: boolean
  public descripcion: string
  public fechaExpiracion: Date
  public correoResponsable: string // Correo del responsable de la tarea

  private constructor(
    id: string,
    nombre: string,
    descripcion: string,
    completada: boolean,
    fechaExpiracion: Date,
    correoResponsable: string,
  ) {
    this.id = id
    this.nombre = nombre
    this.descripcion = descripcion
    this.completada = completada
    this.fechaExpiracion = fechaExpiracion
    this.correoResponsable = correoResponsable
  }

  public haExpirado(): boolean {
    const fechaActual = new Date()
    return this.fechaExpiracion < fechaActual
  }

  public static deserializar(tareaSerializado: Deno.KvEntry<Tarea>): Tarea {
    return new Tarea(
      tareaSerializado.value.id,
      tareaSerializado.value.nombre,
      tareaSerializado.value.descripcion,
      tareaSerializado.value.completada,
      tareaSerializado.value.fechaExpiracion,
      tareaSerializado.value.correoResponsable,
    )
  }

  public static crear(nombre: string, descripcion: string, fechaExpiracion: Date, responsable: string): Tarea {
    return new Tarea(
      crypto.randomUUID(),
      nombre,
      descripcion,
      false,
      fechaExpiracion,
      responsable,
    )
  }

  public obtenerEstado(): 'completado' | 'en progreso' | 'expirado' {
    if (this.completada) return 'completado'
    else if (!this.completada && !this.haExpirado()) return 'en progreso'
    else if (!this.completada && this.haExpirado()) return 'expirado'
    else throw new Error(`Estado de la tarea ${this.id} desconocido.`)
  }
}
