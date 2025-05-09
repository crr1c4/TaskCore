/**
 * @file modelos/anuncio.ts
 * @author Christian Venegas
 * @description Este archivo contiene las funciones de los anuncios para la base de datos.
 */
import { DB } from './mod.ts'

export default class Anuncio {
  public id: string
  public titulo: string
  public descripcion: string
  public fechaPublicacion: Date

  public constructor(titulo: string, descripcion: string, fechaPublicacion: Date) {
    this.id = crypto.randomUUID()
    this.titulo = titulo
    this.descripcion = descripcion
    this.fechaPublicacion = fechaPublicacion
  }

  private static deserializar(anuncioSerializado: Deno.KvEntry<Anuncio>) {
    const anuncio = new Anuncio(
      anuncioSerializado.value.titulo,
      anuncioSerializado.value.descripcion,
      anuncioSerializado.value.fechaPublicacion,
    )

    anuncio.id = anuncioSerializado.value.id
    return anuncio
  }

  public async eliminar() {
    await Anuncio.eliminar(this.id)
  }

  public static async eliminar(id: string) {
    const resultado = await DB.atomic().delete(['anuncios', id]).commit()
    if (!resultado.ok) throw new Error('Ocurrio un error al eliminar el anuncio.')
  }

  public async guardar() {
    const resultado = await DB.atomic()
      .check({ key: ['anuncios', this.id], versionstamp: null })
      .set(['anuncios', this.id], this)
      .commit()

    if (!resultado.ok) throw new Error('Ocurrio un error al guardar el anuncio')
  }

  public static async obtener(id: string) {
    const resultado = await DB.get<Anuncio>(['anuncios', id])
    if (!resultado.value) throw new Error('No existe un anuncio con el id ' + id)
    return Anuncio.deserializar(resultado)
  }
}
