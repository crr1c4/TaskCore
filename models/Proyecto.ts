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

    this.integrantes.forEach(async (correoIntegrante) =>
      await this.enviarNotificacion(
        correoIntegrante,
        new Notificacion(
          '📢 Nuevo anuncio en el proyecto',
          `¡Atención equipo! 👋 Se ha publicado un nuevo anuncio en "${this.nombre}".`,
        ),
      )
    )
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

    this.integrantes.push(correoIntegrante)

    const resultado = await DB.atomic()
      .set(['proyectos', this.id], this)
      .commit()

    await this.enviarNotificacion(
      correoIntegrante,
      new Notificacion(
        '¡Bienvenido/a al equipo!',
        `¡Hola! 👋 Ahora formas parte del proyecto "${this.nombre}".`,
      ),
    )

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

    const fechaExpiracion = new Date()
    fechaExpiracion.setHours(fechaExpiracion.getHours() + 10)

    await this.enviarNotificacion(
      correoIntegrante,
      new Notificacion(
        'Aviso de despedida.',
        `Su acceso al proyecto "${this.nombre}" ha sido revocado.`,
      ),
    )

    if (!resultado.ok) throw new Error('No se pudo eliminar el integrante.')
  }

  /* ******************************* TAREAS ************************************* */
  public async agregarTarea(tarea: Tarea) {
    if (!this.integrantes.includes(tarea.correoResponsable)) {
      throw new Error('El usuario no está registrado en el proyecto.')
    }

    const resultado = await DB.atomic()
      .set(['proyectos', this.id, 'tareas', tarea.id], tarea)
      .commit()

    if (!resultado.ok) throw new Error('No se puede guardar la tarea.')

    await this.enviarNotificacion(
      tarea.correoResponsable,
      new Notificacion(
        '📋 Nueva tarea',
        `Tarea: ${tarea.nombre} del proyecto ${this.nombre}.`,
      ),
    )
  }

  public async eliminarTarea(idTarea: string) {
    const resultado = await DB.atomic()
      .delete(['proyectos', this.id, 'tareas', idTarea])
      .commit()

    if (!resultado.ok) throw new Error(`No se pudo eliminar la tarea con el id ${idTarea}`)
  }

  public async obtenerTareasAdministrador() {
    const tareas: Tarea[] = []

    const consulta = DB.list<Tarea>({ prefix: ['proyectos', this.id, 'tareas'] })

    for await (const tarea of consulta) {
      if (tarea.key.length !== 4) continue
      tareas.push(Tarea.deserializar(tarea))
    }

    return tareas
  }

  public async obtenerTareasIntegrante(correoIntegrante: string) {
    const tareas: Tarea[] = []

    const consulta = DB.list<Tarea>({ prefix: ['proyectos', this.id, 'tareas'] })

    for await (const tarea of consulta) {
      if (tarea.key.length !== 4) continue
      tareas.push(Tarea.deserializar(tarea))
    }

    return tareas.filter((tarea) => tarea.correoResponsable === correoIntegrante)
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
    const tarea = await this.obtenerTarea(idTarea)

    if (!this.integrantes.includes(nuevaTarea.correoResponsable)) {
      throw new Error('El usuario no está registrado en el proyecto.')
    }

    const resultado = await DB.atomic()
      .set(['proyectos', this.id, 'tareas', idTarea], nuevaTarea)
      .commit()

    if (!resultado.ok) throw new Error('No se pudo actualizar la tarea.')

    // La tarea se completo
    if (nuevaTarea.completada && !tarea.completada) {
      await this.enviarNotificacion(
        this.administrador,
        new Notificacion(
          '✅ Tarea completada',
          `🎉 ¡La tarea "${tarea.nombre}" del proyecto "${this.nombre}" ha sido marcada como completada!`,
        ),
      )
    } else if (nuevaTarea.correoResponsable !== tarea.correoResponsable) {
      await this.enviarNotificacion(
        nuevaTarea.correoResponsable,
        new Notificacion(
          '📋 Nueva tarea',
          `Tarea: ${tarea.nombre} del proyecto ${this.nombre}.`,
        ),
      )

      await this.enviarNotificacion(
        tarea.correoResponsable,
        new Notificacion(
          '🔄 Cambio de asignación',
          `❗ Ya no eres responsable de la tarea "${tarea.nombre}" en el proyecto "${this.nombre}".`,
        ),
      )
    } else {
      this.enviarNotificacion(
        nuevaTarea.correoResponsable,
        new Notificacion(
          '✏️ Tarea actualizada',
          `🛠️ La tarea "${tarea.nombre}" del proyecto "${this.nombre}" ha sido modificada. Revisa los nuevos detalles.`,
        ),
      )
    }
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

    return comentarios.sort((a, b) => {
      const fechaA = new Date(a.fecha).getTime()
      const fechaB = new Date(b.fecha).getTime()
      return fechaA - fechaB
    })
  }

  public async enviarNotificacion(correoDestinatario: string, notificacion: Notificacion) {
    const integrante = await Usuario.obtener(correoDestinatario)
    await integrante.agregarNotificacion(notificacion)
  }
}
