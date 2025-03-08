/**
 * @file modelos/anuncio.ts
 * @author Christian Venegas
 * @description Este archivo contiene las funciones de los anuncios para la base de datos.
 */
import { ANUNCIOS, DB, PROYECTOS } from '../mod.ts'

/**
 * Interfaz que define la estructura de un anuncio.
 */
export interface Anuncio {
  id: string
  titulo: string
  descripcion: string
  fechaPublicacion: Date
}

/**
 * Crea un nuevo anuncio y lo guarda en la base de datos.
 * 
 * @param {Object} datosIniciales - Datos iniciales del anuncio.
 * @param {string} datosIniciales.titulo - Título del anuncio.
 * @param {string} datosIniciales.descripcion - Descripción del anuncio.
 * @param {string} idProyecto - ID del proyecto al que pertenece el anuncio.
 * @returns {Promise<string | null>} - El ID del anuncio si la creación es exitosa, o `null` si falla.
 */
export async function crearAnuncio(
  datosIniciales: { titulo: string; descripcion: string },
  idProyecto: string,
): Promise<string | null> {
  const anuncio: Anuncio = {
    ...datosIniciales,
    id: crypto.randomUUID(),
    fechaPublicacion: new Date(),
  }

  // Verificar que el proyecto exista
  const proyecto = await DB.get([PROYECTOS, idProyecto])
  if (!proyecto.value) return null

  const llave = [PROYECTOS, idProyecto, ANUNCIOS, anuncio.id]
  const resultado = await DB.atomic().check({ key: llave, versionstamp: null })
    .set(
      llave,
      anuncio,
    ).commit()

  return resultado.ok ? anuncio.id : null
}

/**
 * Obtiene la lista de anuncios asociados a un proyecto.
 * 
 * @param {string} idProyecto - ID del proyecto del cual se obtendrán los anuncios.
 * @returns {Promise<Anuncio[]>} - Un arreglo con los anuncios del proyecto.
 */
export async function obtenerAnunciosProyecto(
  idProyecto: string,
): Promise<Anuncio[]> {
  const anuncios = DB.list<Anuncio>({
    prefix: [PROYECTOS, idProyecto, ANUNCIOS],
  })
  const anuncios_proyecto = []
  for await (const anuncio of anuncios) {
    anuncios_proyecto.push(anuncio.value)
  }

  return anuncios_proyecto
}

/**
 * Elimina un anuncio de la base de datos.
 * 
 * @param {string} idProyecto - ID del proyecto al que pertenece el anuncio.
 * @param {string} idAnuncio - ID del anuncio a eliminar.
 * @returns {Promise<void>}
 */
export async function eliminarAnuncio(
  idProyecto: string,
  idAnuncio: string,
): Promise<void> {
  await DB.delete([PROYECTOS, idProyecto, ANUNCIOS, idAnuncio])
}
