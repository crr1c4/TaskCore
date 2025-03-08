import { Usuario } from "../modelos/usuario.ts"
import { Proyecto } from "../modelos/proyecto.ts"

/**
 * Ejemplo del usuario.
 */
export const admin: Usuario = {
  nombre: "Christian",
  correo: "christian.venegas@correo.com",
  contraseña: "odyperrofeliz",
  rol: "admin",
}

export const miembro1: Usuario = {
  nombre: "Javier Rodríguez",
  correo: "javier.rodriguez@correo.com",
  contraseña: "tareaSegura123",
  rol: "miembro",
}

export const miembro2: Usuario = {
  nombre: "Sofía Méndez",
  correo: "sofia.mendez@correo.com",
  contraseña: "colaboracion2024",
  rol: "miembro",
}

export const miembro3: Usuario = {
  nombre: "Diego Fernández",
  correo: "diego.fernandez@correo.com",
  contraseña: "proyectoListo99",
  rol: "miembro",
}

export const miembro4: Usuario = {
  nombre: "Valeria Castillo",
  correo: "valeria.castillo@correo.com",
  contraseña: "equipoFuerte77",
  rol: "miembro",
}

export const miembro5: Usuario = {
  nombre: "Luis Ramírez",
  correo: "luis.ramirez@correo.com",
  contraseña: "avanceConstante88",
  rol: "miembro",
}

/**
 * Ejemplo del proyecto.
 */

export const proyecto1 = {
  nombre: "Sistema de Gestión de Tareas",
  descripcion:
    "Desarrollo de una aplicación web para la gestión de tareas en equipo.",
  correosIntegrantesEquipo: [
    "javier.rodriguez@correo.com",
    "sofia.mendez@correo.com",
    "diego.fernandez@correo.com",
  ],
  correoAdmin: "christian.venegas@correo.com"
}

export const proyecto2 = {
  nombre: "Rediseño de Sitio Web Corporativo",
  descripcion:
    "Mejorar la experiencia de usuario y el diseño visual del sitio web de la empresa.",
  correosIntegrantesEquipo: [
    "valeria.castillo@correo.com",
    "luis.ramirez@correo.com",
    "diego.fernandez@correo.com",
  ],
  correoAdmin: "christian.venegas@correo.com"
}

export const proyecto3 = {
  nombre: "Implementación de API REST",
  descripcion:
    "Desarrollo de una API RESTful para la integración con aplicaciones móviles.",
  correosIntegrantesEquipo: [
    "javier.rodriguez@correo.com",
    "valeria.castillo@correo.com",
    "sofia.mendez@correo.com",
  ],
  correoAdmin: "christian.venegas@correo.com"
}

export const proyecto4 = {
  nombre: "Testing",
  descripcion: "Testing para la aplicacion de TaskCore",
  correosIntegrantesEquipo: [],
  correoAdmin: "christian.venegas@correo.com"
}

/**
 * Ejemplo de anuncios para cada proyecto.
 */
export const anuncio1 = {
  titulo: "Inicio del Proyecto",
  descripcion:
    "Hoy damos inicio al desarrollo del Sistema de Gestión de Tareas. Revisen los requisitos iniciales.",
}

export const anuncio2 = {
  titulo: "Entrega de primeros bocetos",
  descrpcion:
    "Se ha completado el primer diseño del nuevo sitio web. Revisar y enviar comentarios.",
}

export const anuncio3 = {
  titulo: "Revisión del API",
  descrpcion:
    "Se ha implementado la autenticación en la API. Favor de probarla y reportar errores.",
}

export const tarea1 = {
  nombre: "Tarea 1",
  descripcion: "Bañar al perro",
  fechaExpiracion: new Date(2030, 10, 3)
}

export const tarea2 = {
  nombre: "Tarea 2",
  descripcion: "Bañar al gato",
  fechaExpiracion: new Date(2025, 1, 6)
}

export const tarea3 = {
  nombre: "Tarea 3",
  descripcion: "Bañar al zorro",
  fechaExpiracion: new Date(2025, 10, 21)
}
