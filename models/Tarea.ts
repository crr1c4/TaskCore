/**
 * Clase que representa una Tarea en el sistema
 * @class Tarea
 * @property {string} id - Identificador único de la tarea (UUID v4)
 * @property {string} nombre - Nombre/descripción corta de la tarea
 * @property {boolean} completada - Estado de completitud
 * @property {string} descripcion - Descripción detallada
 * @property {Date} fechaExpiracion - Fecha límite para completar
 * @property {string} correoResponsable - Correo del usuario asignado
 * 
 * @description
 * Modelo que representa una tarea con:
 * - Generación automática de ID
 * - Gestión de estados (completado/en progreso/expirado)
 * - Fechas de expiración
 * - Asignación de responsables
 * - Métodos para serialización/deserialización
 * 
 * @example
 * // Crear nueva tarea
 * const tarea = Tarea.crear(
 *   'Implementar feature X',
 *   'Desarrollar la funcionalidad completa',
 *   new Date('2023-12-31'),
 *   'usuario@ejemplo.com'
 * );
 * 
 * @example
 * // Verificar estado
 * const estado = tarea.obtenerEstado(); // 'en progreso' | 'completado' | 'expirado'
 * 
 * @example
 * // Deserializar desde base de datos
 * const tarea = Tarea.deserializar(entradaKV);
 *
 * Métodos principales:
 * @method haExpirado - Verifica si la tarea está vencida
 * @method obtenerEstado - Devuelve estado actual (completado/en progreso/expirado)
 * 
 * Métodos estáticos:
 * @static @method crear - Constructor público para nuevas tareas
 * @static @method deserializar - Reconstruye instancia desde DB
 * 
 * Características clave:
 * - Sistema de estados automático basado en fecha y completitud
 * - Integración con Deno KV para persistencia
 * - Validación implícita de fechas
 * - Compatible con sistema de notificaciones
 */
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
