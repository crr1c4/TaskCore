import { unsubscribe } from 'node:diagnostics_channel'
import Anuncio from './Anuncio.ts'
import Comentario from './Comentario.ts'
import { DB } from './mod.ts'
import Notificacion from './Notificacion.ts'
import Tarea from './Tarea.ts'
import Usuario from './Usuario.ts'

export default class Proyecto {
  public id: string
  public nombre: string
  public descripcion: string
  public fechaCreacion: Date
  public administrador: string
  public integrantes: string[]

  private constructor() {
    this.id = ''
    this.nombre = ''
    this.descripcion = ''
    this.fechaCreacion = new Date()
    this.administrador = ''
    this.integrantes = []
  }

  public static crear(nombre: string, descripcion: string, correoAdministrador: string): Proyecto {
    const proyecto = new Proyecto()
    proyecto.id = crypto.randomUUID()
    proyecto.nombre = nombre
    proyecto.descripcion = descripcion
    proyecto.administrador = correoAdministrador

    return proyecto
  }

  public static deserializar(proyectoSerializado: Deno.KvEntry<Proyecto>) {
    const proyecto = new Proyecto()

    proyecto.id = proyectoSerializado.value.id
    proyecto.nombre = proyectoSerializado.value.nombre
    proyecto.descripcion = proyectoSerializado.value.descripcion
    proyecto.administrador = proyectoSerializado.value.administrador
    proyecto.fechaCreacion = proyectoSerializado.value.fechaCreacion
    proyecto.integrantes = proyectoSerializado.value.integrantes

    return proyecto
  }

  public async guardar() {
    const resultado = await DB.atomic()
      .check({ key: ['proyectos', this.id], versionstamp: null })
      .set(['proyectos', this.id], this)
      .commit()

    if (!resultado.ok) throw new Error('Ya existe un proyecto con el mismo ID.')
  }

  public static async obtener(id: string): Promise<Proyecto> {
    const resultado = await DB.get<Proyecto>(['proyectos', id])
    if (!resultado.value) throw new Error(`No existe un proyecto con el id: ${id}`)
    return Proyecto.deserializar(resultado)
  }

  public async eliminar() {
    await Proyecto.eliminar(this.id)
  }

  public static async eliminar(id: string) {
    const consulta = DB.list({ prefix: ['proyectos', id] })

    for await (const elementoProyecto of consulta) {
      await DB.delete(elementoProyecto.key)
    }

    await DB.delete(['proyectos', id])
  }

  private async actualizar() {
    const resultado = await DB.atomic()
      .set(['proyectos', this.id], this)
      .commit()

    if (!resultado.ok) throw new Error('No se puede actualizar el proyecto.')
  }

  public async cambiarNombre(nombre: string) {
    this.nombre = nombre
    await this.actualizar()
  }

  public async cambiarDescripcion(descripcion: string) {
    this.descripcion = descripcion
    await this.actualizar()
  }

  // public async obtenerAdministrador() {
  //   return await Usuario.obtener(this.administrador)
  // }

  /* ******************************* ANUNCIOS ************************************* */

  public async agregarAnuncio(anuncio: Anuncio) {
    const resultado = await DB.atomic()
      .set(['proyectos', this.id, 'anuncios', anuncio.id], anuncio)
      .commit()

    if (!resultado.ok) throw new Error('No se pudo crear el anuncio.')
  }

  public async eliminarAnuncio(idAnuncio: string) {
    const resultado = await DB.atomic()
      .delete(['proyectos', this.id, 'anuncios', idAnuncio])
      .commit()

    if (!resultado.ok) throw new Error(`No se pudo eliminar anuncio con el id: ${idAnuncio}.`)
  }

  public async obtenerAnuncios() {
    const anuncios: Anuncio[] = []

    const consulta = DB.list<Anuncio>({ prefix: ['proyectos', this.id, 'anuncios'] })
    for await (const anuncio of consulta) anuncios.push(anuncio.value)

    return anuncios
  }

  /* ******************************* MIEMBROS ************************************* */

  public async obtenerIntegrantes() {
    return await Promise.all(
      this.integrantes.map(async (correoIntegrante) => await Usuario.obtener(correoIntegrante)),
    )
  }

  public async agregarIntegrante(correoIntegrante: string) {
    if (this.integrantes.includes(correoIntegrante)) {
      throw new Error('El usuario ya esta registrado en el proyecto.')
    }

    const integrante = await Usuario.obtener(correoIntegrante)

    if (integrante.rol === 'admin') {
      throw new Error('El correo no puede pertenecer a un administrador.')
    }

    const fechaExpiracion = new Date()
    fechaExpiracion.setDate(fechaExpiracion.getDate() + 2)

    const notificacion = new Notificacion(
      '¡Bienvenido/a al equipo!',
      `¡Hola! 👋 Ahora formas parte del proyecto "${this.nombre}".`,
      fechaExpiracion,
    )

    await integrante.agregarNotificacion(notificacion)

    this.integrantes.push(correoIntegrante)

    const resultado = await DB.atomic()
      .set(['proyectos', this.id], this)
      .commit()

    if (!resultado.ok) throw new Error('No se puede actualizar el proyecto con el nuevo integrante.')
  }

  public async eliminarIntegrante(correoIntegrante: string) {
    // Verificar que el usuario no tenga tareas ASIGNADAS.
    const consulta = DB.list<Tarea>({ prefix: ['proyectos', this.id, 'tareas'] })

    for await (const tarea of consulta) {
      if (tarea.value.correoResponsable === correoIntegrante) {
        throw new Error(
          `El usuario con el correo ${correoIntegrante} tiene tareas asignadas, modifique la tarea ${tarea.value.nombre} para poder eliminar al integrante del proyecto.`,
        )
      }
    }

    this.integrantes = this.integrantes.filter((correoIntegranteRegistrado) =>
      correoIntegranteRegistrado !== correoIntegrante
    )

    const resultado = await DB.atomic()
      .set(['proyectos', this.id], this)
      .commit()

    if (!resultado.ok) throw new Error('No se pudo eliminar el integrante.')
  }

  /* ******************************* TAREAS ************************************* */
  public async agregarTarea(tarea: Tarea) {
    if (!this.integrantes.includes(tarea.correoResponsable)) {
      throw new Error('El usuario no está registrado en el proyecto.')
    }

    const fechaExpiracion = new Date()
    fechaExpiracion.setDate(fechaExpiracion.getDate() + 2)

    const notificacion = new Notificacion(
      'Nueva tarea asignada',
      `Se te ha asignado la tarea: ${tarea.nombre}`,
      fechaExpiracion,
    )

    const integrante = await Usuario.obtener(tarea.correoResponsable)
    await integrante.agregarNotificacion(notificacion)

    const resultado = await DB.atomic()
      .set(['proyectos', this.id, 'tareas', tarea.id], tarea)
      .commit()

    if (!resultado.ok) throw new Error('No se puede guardar la tarea.')
  }

  public async eliminarTarea(idTarea: string) {
    const resultado = await DB.atomic()
      .delete(['proyectos', this.id, 'tareas', idTarea])
      .commit()

    if (!resultado.ok) throw new Error(`No se pudo eliminar la tarea con el id ${idTarea}`)
  }

  public async obtenerTareas() {
    const tareas: Tarea[] = []

    const consulta = DB.list<Tarea>({ prefix: ['proyectos', this.id, 'tareas'] })
    for await (const tarea of consulta) tareas.push(Tarea.deserializar(tarea))

    return tareas
  }

  public async obtenerTarea(idTarea: string): Promise<Tarea> {
    const resultado = await DB.get<Tarea>(['proyectos', this.id, 'tareas', idTarea])
    if (!resultado.value) throw new Error(`No se pudo obtener la tarea con el id ${idTarea}`)
    return Tarea.deserializar(resultado)
  }

  /**
   * Modifica la tarea con un id especifico.
   * WARNING: Se debe obtener la tarea y asignar los nuevos datos antes de mandar a llamar a este método.
   */
  public async actualizarTarea(idTarea: string, nuevaTarea: Tarea) {
    await this.obtenerTarea(idTarea)

    if (!this.integrantes.includes(nuevaTarea.correoResponsable)) {
      throw new Error('El usuario no está registrado en el proyecto.')
    }

    const resultado = await DB.atomic()
      .set(['proyectos', this.id, 'tareas', idTarea], nuevaTarea)
      .commit()

    if (!resultado.ok) throw new Error('No se pudo actualizar la tarea.')
  }

  /* ******************************* COMENTARIOS ************************************* */

  /**
   * Las verificaciones se realizan en las rutas.
   */
  public async agregarComentario(comentario: Comentario, idTarea: string) {
    const resultado = await DB.atomic()
      .set(['proyectos', this.id, 'tareas', idTarea, 'comentarios', comentario.id], comentario)
      .commit()

    if (!resultado.ok) throw new Error('No se pudo crear el comentario.')
  }

  public async eliminarComentario(idTarea: string, idComentario: string) {
    const resultado = await DB.atomic()
      .delete(['proyectos', this.id, 'tareas', idTarea, 'comentarios', idComentario])
      .commit()

    if (!resultado.ok) throw new Error('No se pudo eliminar el comentario.')
  }

  public async obtenerComentariosTarea(idTarea: string) {
    const comentarios: Comentario[] = []

    for await (
      const comentario of DB.list<Comentario>({ prefix: ['proyectos', this.id, 'tareas', idTarea, 'comentarios'] })
    ) {
      comentarios.push(comentario.value)
    }

    return comentarios
  }
}
