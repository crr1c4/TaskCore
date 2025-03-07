/**
 * @file modelos/anuncio.ts
 * @author Christian Venegas
 * @description este archivo contiene las funciones de los anuncios para la BD.
 */
import { ANUNCIOS, DB, PROYECTOS } from "../mod.ts"
import { obtenerUsuario } from "./usuario.ts"

export interface Anuncio {
  id: string
  titulo: string
  descripcion: string
  fechaPublicacion: Date
}

export async function crearAnuncio(
  datosIniciales: { titulo: string; descripcion: string },
  correoAdmin: string,
  idProyecto: string,
): Promise<string | null> {
  const anuncio: Anuncio = {
    ...datosIniciales,
    id: crypto.randomUUID(),
    fechaPublicacion: new Date(),
  }

  const admin = await obtenerUsuario(correoAdmin)

  // Solo los usuarios que son administradores pueden crear proyectos
  if (!admin) return null
  if (admin.rol != "admin") return null

  const llave = [PROYECTOS, correoAdmin, idProyecto, ANUNCIOS, anuncio.id]

  const resultado = await DB.atomic().check({ key: llave, versionstamp: null })
    .set(
      llave,
      anuncio,
    ).commit()

  return resultado.ok ? anuncio.id : null
}

export async function obtenerAnunciosProyecto(
  correoAdmin: string,
  idProyecto: string,
): Promise<Anuncio[]> {
  const anuncios = DB.list<Anuncio>({
    prefix: [PROYECTOS, correoAdmin, idProyecto, ANUNCIOS],
  })
  const anuncios_proyecto = []
  for await (const anuncio of anuncios) {
    anuncios_proyecto.push(anuncio.value)
  }

  return anuncios_proyecto
}

export async function eliminarAnuncio(
  correoAdmin: string,
  idProyecto: string,
  idAnuncio: string,
) {
  await DB.delete([PROYECTOS, correoAdmin, idProyecto, ANUNCIOS, idAnuncio])
}
