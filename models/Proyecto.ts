/**
 * @file models/proyecto.ts
 * @author Christian Venegas
 * @description este archivo contiene las funciones de los proyectos para la BD.
 */
import Anuncio from './Anuncio.ts'
import { DB } from './mod.ts'
import Tarea from './Tarea.ts'
import Usuario from './Usuario.ts'

export default class Proyecto {
  public id: string
  public nombre: string
  public descripcion: string
  public fechaCreacion: Date
  public administrador: Usuario

  // Van a ser arreglos de IDs
  public miembros: string[]
  public tareas: string[]
  public anuncios: string[]

  public constructor(nombre: string, descripcion: string, administrador: Usuario) {
    this.id = crypto.randomUUID()
    this.nombre = nombre
    this.descripcion = descripcion
    this.fechaCreacion = new Date()
    this.administrador = administrador
    this.miembros = []
    this.tareas = []
    this.anuncios = []
  }

  private static async deserializar(proyectoSerializado: Deno.KvEntry<Proyecto>) {
    console.log(proyectoSerializado.value.administrador)
    const proyecto = new Proyecto(
      proyectoSerializado.value.nombre,
      proyectoSerializado.value.descripcion,
      await Usuario.obtenerPorCorreo(proyectoSerializado.value.administrador.correo),
    )

    proyecto.id = proyectoSerializado.value.id
    proyecto.fechaCreacion = proyectoSerializado.value.fechaCreacion
    proyecto.miembros = proyectoSerializado.value.miembros
    proyecto.tareas = proyectoSerializado.value.tareas
    proyecto.anuncios = proyectoSerializado.value.anuncios

    return proyecto
  }

  public async guardar() {
    const resultado = await DB.atomic()
      .check({ key: ['proyectos', this.id], versionstamp: null })
      .set(['proyectos', this.id], this)
      .commit()

    if (!resultado.ok) throw new Error('Ya existe un proyecto con el mismo ID.')
  }

  static async obtener(id: string): Promise<Proyecto> {
    const resultado = await DB.get<Proyecto>(['proyectos', id])
    if (!resultado.value) throw new Error('No existe un proyecto con el id: ' + id)
    return Proyecto.deserializar(resultado)
  }

  async eliminar() {
    await Proyecto.eliminar(this.id)
  }

  static async eliminar(id: string) {
    const proyecto = await Proyecto.obtener(id)

    await Promise.all(
      proyecto.anuncios.map((idAnuncio) => proyecto.eliminarAnuncio(idAnuncio)),
    )

    // TODO: Agregar las tareas

    const resultado = await DB.atomic().delete(['proyectos', id]).commit()
    if (!resultado.ok) throw new Error('Hubo un error al eliminar el proyecto.')
  }

  public async cambiarNombre(nombre: string) {
    this.nombre = nombre
    const resultado = await DB.atomic()
      .set(['proyectos', this.id], this)
      .commit()
    if (!resultado.ok) throw new Error('Hubo un error al editar el titulo del proyecto')
  }

  public async cambiarDescripcion(descripcion: string) {
    this.descripcion = descripcion
    const resultado = await DB.atomic()
      .set(['proyectos', this.id], this)
      .commit()
    if (!resultado.ok) throw new Error('Hubo un error al editar la descripción del proyecto')
  }

  /******************************************+ TAREAS *********************************************/
  public async guardarTarea(tarea: Tarea, correoEncargado: string) {
    const llave = ['proyectos', this.id, 'tareas', correoEncargado, tarea.id]
    const resultado = await DB.atomic()
      .check({ key: llave, versionstamp: null })
      .set(llave, tarea)
      .commit()

    if (!resultado.ok) throw new Error('Ya existe una tarea con el mismo ID.')
  }

  public async eliminarTarea(idTarea: string) {
    const datosProyecto = DB.list({ prefix: ['proyectos', this.id, 'miembro'] })
    for await (const registro of datosProyecto) {
      await DB.delete(registro.key)
    }
  }

  /* ******************************* ANUNCIOS ************************************* */

  public async agregarAnuncio(anuncio: Anuncio) {
    await anuncio.guardar()
    this.anuncios.push(anuncio.id)

    const resultado = await DB.atomic()
      .set(['proyectos', this.id], this)
      .commit()

    if (!resultado.ok) throw new Error('NO se puede actualizar el proyecto con el nuevo anuncio.')
  }

  public async eliminarAnuncio(idAnuncio: string) {
    await Anuncio.eliminar(idAnuncio)
    this.anuncios = this.anuncios.filter((id) => id !== idAnuncio)

    const resultado = await DB.atomic()
      .set(['proyectos', this.id], this)
      .commit()

    if (!resultado.ok) throw new Error('NO se puede eliminar anuncio.')
  }

  /* ******************************* MIEMBROS ************************************* */

  async agregarIntegrante(miembro: Usuario) {
    if (this.miembros.includes(miembro.correo)) {
      throw new Error('El usuario ya esta registrado en el proyecto.')
    }
    this.miembros.push(miembro.correo)

    const resultado = await DB.atomic()
      .set(['proyectos', this.id], this)
      .commit()

    if (!resultado.ok) throw new Error('NO se puede actualizar el proyecto con el nuevo integrante.')
  }

  async eliminarIntegrante(correo: string) {
    // TODO: AGREGAR LOGICA PARA TAREAS, NO OSE PUEDEN ELIMINAR USUARIOS CON TAREAS ASIGNADAS
    this.miembros = this.miembros.filter((correoIntegrante) => correoIntegrante !== correo)

    const resultado = await DB.atomic()
      .set(['proyectos', this.id], this)
      .commit()

    if (!resultado.ok) throw new Error('NO se puede eliminar el integrante.')

  }
}

