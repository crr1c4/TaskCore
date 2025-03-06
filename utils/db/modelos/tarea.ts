export interface Tarea {
  id: string
  nombre: string
  completado: boolean
  descripcion: string
  fechaCreacion: Date
  fechaExpiracion: Date
  enlacesEvidencia: string[]
}
