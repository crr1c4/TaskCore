export interface Tarea {
  id: string
  nombre: string
  completado: boolean
  descripcion: string
  fechaCreacion: Date
  fechaExpiracion: Date
  enlacesEvidencia: string[]
}

export interface Comentario {
  id: string
  contenido: string
  creadoPor: string
}

export interface Anuncio {
  id: string
  titulo: string
  descripcion: string
  fechaPublicacion: Date
}
