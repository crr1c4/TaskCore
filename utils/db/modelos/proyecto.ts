/**
 * @file models/proyecto.ts
 * @author Christian Venegas
 * @description este archivo contiene las funciones de los proyectos para la BD.
 */
import { DB, PROYECTOS } from "../mod.ts"
import { obtenerUsuario } from "./usuario.ts"

// TODO: Añadir verificacion para correos no existentes.
/**
 * Representa un proyecto en la base de datos.
 */
export interface Proyecto {
  id: string
  nombre: string
  descripcion: string
  fechaCreacion: Date
  correoAdmin: string
  correosIntegrantesEquipo: string[]
}

/**
 * Crea un nuevo proyecto y lo guarda en la base de datos.
 * @param {Object} datosInicialesProyecto - Datos iniciales del proyecto.
 * @param {string} datosInicialesProyecto.nombre - Nombre del proyecto.
 * @param {string} datosInicialesProyecto.descripcion - Descripción del proyecto.
 * @param {string[]} datosInicialesProyecto.correosIntegrantesEquipo - Correos de los integrantes del equipo.
 * @param {string} correoAdmin - Correo del administrador que crea el proyecto.
 * @returns {Promise<boolean>} `true` si el proyecto se creó con éxito, `false` en caso contrario.
 */
export async function crearProyecto(
  datosInicialesProyecto: {
    nombre: string
    descripcion: string
    correosIntegrantesEquipo: string[]
    correoAdmin: string
  },
): Promise<string | null> {
  // Creacion del proyecto
  const proyecto: Proyecto = {
    id: crypto.randomUUID(),
    nombre: datosInicialesProyecto.nombre,
    descripcion: datosInicialesProyecto.descripcion,
    fechaCreacion: new Date(),
    correoAdmin: datosInicialesProyecto.correoAdmin,
    correosIntegrantesEquipo: datosInicialesProyecto.correosIntegrantesEquipo,
  }

  const admin = await obtenerUsuario(datosInicialesProyecto.correoAdmin)

  // Solo los usuarios que son administradores pueden crear proyectos
  if (!admin) return null
  if (admin.rol != "admin") return null

  const llave = [PROYECTOS, proyecto.id]

  const resultado = await DB.atomic()
    .check({ key: llave, versionstamp: null })
    .set(llave, proyecto)
    .commit()

  return resultado.ok ? proyecto.id : null
}

/**
 * Elimina un proyecto de la base de datos.
 * @param {string} id - Identificador del proyecto a eliminar.
 */
export async function eliminarProyecto(id: string) {
  await DB.delete([PROYECTOS, id])
}

/**
 * Obtiene la lista de proyectos de un administrador.
 * @param {string} correoAdmin - Correo del administrador.
 * @returns {Promise<Proyecto[]>} Lista de proyectos asociados al administrador.
 */
export async function obtenerListaProyectosAdmin(
  correoAdmin: string,
): Promise<Proyecto[]> {
  const proyectos = DB.list<Proyecto>({ prefix: [PROYECTOS] })
  const proyectos_admin = []
  for await (const proyecto of proyectos) {
    if (proyecto.value.correoAdmin === correoAdmin) {
      proyectos_admin.push(proyecto.value)
    }
  }

  return proyectos_admin
}

/**
 * Obtiene la lista de proyectos en los que un miembro participa.
 * @param {string} correoMiembro - Correo del miembro del equipo.
 * @returns {Promise<Proyecto[]>} Lista de proyectos en los que el miembro participa.
 */
export async function obtenerListaProyectosMiembro(
  correoMiembro: string,
): Promise<Proyecto[]> {
  const proyectos = DB.list<Proyecto>({ prefix: [PROYECTOS] })
  const proyectos_miembro = []
  for await (const proyecto of proyectos) {
    if (proyecto.value.correosIntegrantesEquipo.includes(correoMiembro)) {
      proyectos_miembro.push(proyecto.value)
    }
  }

  return proyectos_miembro
}

/**
 * Obtiene un proyecto específico de un administrador.
 * @param {string} correoAdmin - Correo del administrador.
 * @param {string} id - Identificador del proyecto.
 * @returns {Promise<Proyecto | null>} El proyecto si existe, de lo contrario `null`.
 */
export async function obtenerProyecto(
  correoAdmin: string,
  id: string,
): Promise<Proyecto | null> {
  return (await DB.get<Proyecto>([PROYECTOS, correoAdmin, id])).value
}

/**
 * Edita los datos de un proyecto existente.
 * @param {string} correoAdmin - Correo del administrador del proyecto.
 * @param {string} id - Identificador del proyecto.
 * @param {Partial<Proyecto>} datosNuevos - Datos nuevos del proyecto.
 * @returns {Promise<boolean>} `true` si la edición fue exitosa, `false` en caso contrario.
 */
export async function editarProyecto(
  correoAdmin: string,
  id: string,
  datosNuevos: Partial<Proyecto>,
): Promise<boolean> {
  const proyecto = await obtenerProyecto(correoAdmin, id)
  if (!proyecto) return false

  const proyectoActualizado: Proyecto = {
    ...proyecto,
    correosIntegrantesEquipo: datosNuevos.correosIntegrantesEquipo ??
      proyecto.correosIntegrantesEquipo,
    nombre: datosNuevos.nombre ?? proyecto.nombre,
    descripcion: datosNuevos.descripcion ?? proyecto.descripcion,
  }

  // Inserción de los nuevos datos.
  const resultado = await DB.atomic()
    .set([PROYECTOS, correoAdmin, id], proyectoActualizado)
    .commit()
  return resultado.ok
}
