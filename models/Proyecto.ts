/**
 * @file models/proyecto.ts
 * @author Christian Venegas
 * @description este archivo contiene las funciones de los proyectos para la BD.
 */
import { DB } from './mod.ts'
import Tarea from './Tarea.ts'
import Usuario from './Usuario.ts'

export default class Proyecto {
  readonly id: string
  nombre: string
  descripcion: string
  readonly fechaCreacion: Date
  readonly administrador: Usuario
  miembros: ["usuarios.nombre", string][]
  tareas: ["tareas", string][]
  anuncios: ["anuncios", string][]

  constructor(nombre: string, descripcion: string, administrador: Usuario) {
    this.id = crypto.randomUUID()
    this.nombre = nombre
    this.descripcion = descripcion
    this.fechaCreacion = new Date()
    this.administrador = administrador
    this.miembros = []
    this.tareas = []
    this.anuncios = []
  }

  async guardar() {
    const resultado = await DB.atomic()
      .check({ key: ['proyectos', this.id], versionstamp: null })
      .set(['proyectos', this.id], this)
      .commit()

    if (!resultado.ok) throw new Error('Ya existe un proyecto con el mismo ID.')
  }

  static async obtener(id: string): Promise<Proyecto> {
    const resultado = await DB.get<Proyecto>(['proyectos', id])
    if (!resultado.value) throw new Error('No existe un proyecto con el id: ' + id)
    return resultado.value
  }

  async agregarMiembro(miembro: Usuario) {
    const resultado = await DB.atomic()
      .check({ key: ['proyectos', this.id, 'miembro', miembro.nombre], versionstamp: null })
      .set(['proyectos', this.id, 'miembro', miembro.nombre], ["usuarios", miembro.nombre])
      .commit()

    if (!resultado.ok) throw new Error('El miembro ya esta registrado en el proyeco.')
  }

  async eliminar() {
    await Proyecto.eliminar(this.id)
  }

  static async eliminar(id: string) {
    const datosProyecto = DB.list({ prefix: ['proyectos', id] })
    for await (const registro of datosProyecto) {
      await DB.delete(registro.key)
    }
  }

  public async editar(datosNuevos: Partial<Proyecto>) {
    Object.assign(this, datosNuevos)
    const resultado = await DB.atomic()
      .set(['proyectos', this.id], this)
      .commit()
    if (!resultado.ok) throw new Error('Hubo un error al editar al proyecto')
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
}
