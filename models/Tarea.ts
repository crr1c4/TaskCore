import { DB, PROYECTOS, TAREAS } from '../mod.ts'
import { obtenerProyecto } from './proyecto.ts'

export interface Tarea {
  id: string
  nombre: string
  estado: boolean
  descripcion: string
  fechaExpiracion: Date
}

/**
 * Crea una nueva tarea dentro de un proyecto.
 * @param {Object} datosIniciales - Datos iniciales de la tarea.
 * @param {string} datosIniciales.nombre - Nombre de la tarea.
 * @param {string} datosIniciales.descripcion - Descripción de la tarea.
 * @param {Date} datosIniciales.fechaExpiracion - Fecha de expiración de la tarea.
 * @param {string} correoMiembro - Correo del miembro encargado de la tarea.
 * @param {string} idProyecto - Identificador del proyecto donde se agregará la tarea.
 * @returns {Promise<string | null>} ID de la tarea creada o null si falla la operación.
 */
export async function crearTarea(
  datosIniciales: {
    nombre: string
    descripcion: string
    fechaExpiracion: Date
  },
  correoMiembro: string,
  idProyecto: string,
): Promise<string | null> {
  // Creación del objeto.
  const tarea: Tarea = {
    ...datosIniciales,
    id: crypto.randomUUID(),
    estado: false,
  }

  // Verificaciones
  const proyecto = await obtenerProyecto(idProyecto)
  if (!proyecto) return null

  if (!proyecto.correosIntegrantesEquipo.includes(correoMiembro)) {
    return null
  }

  const llave = [PROYECTOS, idProyecto, TAREAS, correoMiembro, tarea.id]

  const resultado = await DB.atomic()
    .check({ key: llave, versionstamp: null })
    .set(llave, tarea)
    .commit()

  return resultado.ok ? tarea.id : null
}

/**
 * Elimina una tarea de un proyecto.
 * @param {string} idProyecto - Identificador del proyecto.
 * @param {string} correoMiembro - Correo del miembro encargado de la tarea.
 * @param {string} idTarea - Identificador de la tarea a eliminar.
 * @returns {Promise<void>}
 */
export async function eliminarTarea(idProyecto: string, correoMiembro: string, idTarea: string): Promise<void> {
  const llave = [PROYECTOS, idProyecto, TAREAS, correoMiembro, idTarea]
  await DB.delete(llave)
}

/**
 * Obtiene una tarea específica de un proyecto.
 * @param {string} idProyecto - Identificador del proyecto.
 * @param {string} correoMiembro - Correo del miembro encargado de la tarea.
 * @param {string} idTarea - Identificador de la tarea.
 * @returns {Promise<Tarea | null>} La tarea encontrada o null si no existe.
 */
export async function obtenerTarea(idProyecto: string, correoMiembro: string, idTarea: string): Promise<Tarea | null> {
  return (await DB.get<Tarea>([PROYECTOS, idProyecto, TAREAS, correoMiembro, idTarea])).value
}

/**
 * Edita los datos de una tarea en un proyecto.
 * @param {Partial<Tarea>} datosNuevos - Datos a actualizar en la tarea.
 * @param {string} idProyecto - Identificador del proyecto.
 * @param {string} correoMiembro - Correo del miembro encargado de la tarea.
 * @param {string} idTarea - Identificador de la tarea a editar.
 * @returns {Promise<boolean>} True si la edición fue exitosa, False en caso contrario.
 */
export async function editarTarea(
  datosNuevos: Partial<Tarea>,
  idProyecto: string,
  correoMiembro: string,
  idTarea: string,
): Promise<boolean> {
  // Verificar que la tarea exista
  const tarea = await obtenerTarea(idProyecto, correoMiembro, idTarea)
  if (!tarea) return false

  // Actualización de los datos
  const tareaActualizada = {
    ...tarea,
    ...datosNuevos,
    id: idTarea,
  }

  // Inserción de los nuevos datos.
  const resultado = await DB.atomic()
    .set([PROYECTOS, idProyecto, TAREAS, correoMiembro, idTarea], tareaActualizada)
    .commit()
  return resultado.ok
}

/**
 * Obtiene todas las tareas de un proyecto.
 * @param {string} idProyecto - Identificador del proyecto.
 * @returns {Promise<Tarea[]>} Lista de tareas del proyecto.
 */
export async function obtenerTareasProyecto(idProyecto: string): Promise<Tarea[]> {
  const tareas = DB.list<Tarea>({ prefix: [PROYECTOS, idProyecto, TAREAS] })

  const arreglo_tareas = []

  for await (const tarea of tareas) {
    arreglo_tareas.push(tarea.value)
  }

  return arreglo_tareas
}

/**
 * Obtiene todas las tareas asignadas a un miembro dentro de un proyecto.
 * @param {string} idProyecto - Identificador del proyecto.
 * @param {string} correoMiembro - Correo del miembro encargado de la tarea.
 * @returns {Promise<Tarea[]>} Lista de tareas asignadas al miembro.
 */
export async function obtenerTareasMiembro(idProyecto: string, correoMiembro: string): Promise<Tarea[]> {
  const tareas = DB.list<Tarea>({ prefix: [PROYECTOS, idProyecto, TAREAS, correoMiembro] })

  const arreglo_tareas = []

  for await (const tarea of tareas) {
    arreglo_tareas.push(tarea.value)
  }

  return arreglo_tareas
}
