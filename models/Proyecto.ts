/**
 * @file models/proyecto.ts
 * @author Christian Venegas
 * @description este archivo contiene las funciones de los proyectos para la BD.
 */
import { DB } from './mod.ts'
import Usuario from './Usuario.ts'

export default class Proyecto {
  readonly id: string
  nombre: string
  descripcion: string
  readonly fechaCreacion: Date

  constructor(nombre: string, descripcion: string) {
    this.id = crypto.randomUUID()
    this.nombre = nombre
    this.descripcion = descripcion
    this.fechaCreacion = new Date()
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

  async asignarAdministrador(administrador: Usuario) {
    const resultado = await DB.atomic()
      .check({ key: ['proyectos', this.id, 'admin'], versionstamp: null })
      .set(['proyectos', this.id, 'admin'], administrador)
      .commit()

    if (!resultado.ok) throw new Error('Ya existe un administrador asignado al proyeco.')
  }

  async obtenerAdministrador(): Promise<Usuario> {
    const resultado = await DB.get<Usuario>(['proyectos', this.id, 'admin'])
    if (!resultado.versionstamp || !resultado.value) throw new Error('Usuario no encontrado.')
    return resultado.value
  }

  async agregarMiembro(miembro: Usuario) {
    const resultado = await DB.atomic()
      .check({ key: ['proyectos', this.id, 'miembro', miembro.correo], versionstamp: null })
      .set(['proyectos', this.id, 'admin'], miembro)
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
}
