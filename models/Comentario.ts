// import { COMENTARIOS, DB, PROYECTOS, TAREAS } from '../mod.ts'
// import { obtenerTarea } from './tarea.ts'
//
// // TODO: comparar creador comentario con admin y encargado de la tarea
// /**
//  * Representa un comentario dentro de una tarea.
//  */
// export interface Comentario {
//   id: string
//   contenido: string
//   creadoPor: string
// }
// /**
//  * Representa la estructura de una llave para identificar un comentario dentro de la base de datos.
//  */
// export interface LlaveComentario {
//   idProyecto: string
//   idTarea: string
//   correoMiembro: string
//   idComentario: string
// }
//
// /**
//  * Genera una llave única para almacenar o recuperar un comentario de la base de datos.
//  * @param {LlaveComentario} datos - Datos necesarios para construir la llave del comentario.
//  * @returns {string[]} La llave única en forma de arreglo de strings.
//  */
// export function crearLlaveComentario(datos: LlaveComentario): string[] {
//   return [PROYECTOS, datos.idProyecto, TAREAS, datos.correoMiembro, datos.idTarea, COMENTARIOS, datos.idComentario]
// }
//
// /**
//  * Crea un nuevo comentario en una tarea específica.
//  * @param {{ creadoPor: string; contenido: string }} datosIniciales - Datos del comentario (autor y contenido).
//  * @param {{ idProyecto: string, correoMiembro: string, idTarea: string }} datosLlave - Identificadores del proyecto, tarea y usuario asociado.
//  * @returns {Promise<string | null>} El ID del comentario creado o `null` si la tarea no existe.
//  */
// export async function crearComentario(
//   datosIniciales: { creadoPor: string; contenido: string },
//   datosLlave: {
//     idProyecto: string,
//     correoMiembro: string,
//     idTarea: string
//   },
// ): Promise<string | null> {
//   const comentario: Comentario = {
//     ...datosIniciales,
//     id: crypto.randomUUID(),
//   }
//
//   // Verificar que la tarea exista.
//   const tarea = await obtenerTarea(datosLlave.idProyecto, datosLlave.correoMiembro, datosLlave.idTarea)
//   if (!tarea) return null
//
//   const llave = crearLlaveComentario({ ...datosLlave, idComentario: comentario.id })
//   const resultado = await DB.atomic().check({ key: llave, versionstamp: null })
//     .set(
//       llave,
//       comentario,
//     ).commit()
//
//   return resultado.ok ? comentario.id : null
// }
//
// /**
//  * Obtiene todos los comentarios de una tarea específica.
//  * @param {{ idProyecto: string, correoMiembro: string, idTarea: string }} datosLlave - Identificadores del proyecto, tarea y usuario asociado.
//  * @returns {Promise<Comentario[]>} Un arreglo con todos los comentarios de la tarea.
//  */
// export async function obtenerComentariosTarea(
//   datosLlave: {
//     idProyecto: string,
//     correoMiembro: string,
//     idTarea: string
//   },
// ): Promise<Comentario[]> {
//   if (!datosLlave.correoMiembro || !datosLlave.idProyecto || !datosLlave.idTarea) return []
//
//   const llave = [PROYECTOS, datosLlave.idProyecto, TAREAS, datosLlave.correoMiembro, datosLlave.idTarea, COMENTARIOS]
//
//   const comentarios = DB.list<Comentario>({
//     prefix: llave,
//   })
//   const comentariosTarea = []
//   for await (const comentario of comentarios) {
//     comentariosTarea.push(comentario.value)
//   }
//
//   return comentariosTarea
// }
//
// /**
//  * Elimina un comentario específico de una tarea.
//  * @param {LlaveComentario} datosLlave - Identificadores del comentario dentro del proyecto y tarea correspondiente.
//  * @returns {Promise<void>} No retorna ningún valor.
//  */
// export async function eliminarComentario(
//   datosLlave: LlaveComentario,
// ): Promise<void> {
//   await DB.delete(crearLlaveComentario(datosLlave))
// }
