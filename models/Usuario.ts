/**
 * @author Christian Venegas
 * @description Modelo de Usuario, con los metodos para manejarlo en la BD.
 * @license MIT
 */
import { hashSync as encriptar, compareSync as verificarContraseñaHasheada } from 'jsr:@da/bcrypt'
import { DB } from './mod.ts'
import { z as esquema } from 'zod'
import Proyecto from './Proyecto.ts'
import Notificacion from './Notificacion.ts'

/**
 * @description Esquema para validar la complejidad de la contraseña.
 * Requisitos:
 * - Mínimo 8 caracteres.
 * - Al menos una letra mayúscula.
 * - Al menos una letra minúscula.
 * - Al menos un número.
 * - Al menos un carácter especial.
 */
const esquemaContraseña = esquema
  .string()
  .min(8)
  .refine((val) => /[A-Z]/.test(val))
  .refine((val) => /[a-z]/.test(val))
  .refine((val) => /[0-9]/.test(val))
  .refine((val) => /[!@#$%^&*(),.?":{}|<>-_]/.test(val))

/**
 * @description Esquema de validación para nombres.
 * - Debe ser una cadena de texto con al menos 5 caracteres.
 */
const esquemaNombre = esquema.string().min(5)

/**
 * @description Esquema de validación para correos electrónicos.
 * - Debe ser una cadena de texto en formato de correo válido.
 */
const esquemaCorreo = esquema.string().email()

export type Rol = 'admin' | 'miembro'
export type Tema = 'dark' | ''

/**
 * Clase que representa un Usuario en el sistema
 * @class Usuario
 * @property {string} nombre - Nombre del usuario
 * @property {string} correo - Correo electrónico (identificador único)
 * @property {string} contraseña - Contraseña hasheada
 * @property {Rol} rol - Rol del usuario (admin/miembro)
 * @property {Tema} tema - Preferencia de tema visual (dark/light)
 * 
 * @description
 * Modelo principal para gestión de usuarios que incluye:
 * - Validación robusta de datos (correo, contraseña, nombre)
 * - Encriptación segura de contraseñas (bcrypt)
 * - Gestión de preferencias de usuario
 * - Sistema de notificaciones
 * - Gestión de proyectos asociados
 * - Persistencia en base de datos (Deno KV)
 * 
 * @example
 * // Crear nuevo usuario
 * const usuario = new Usuario(
 *   'Nombre Usuario',
 *   'correo@ejemplo.com',
 *   'ContraseñaSegura123!',
 *   'miembro'
 * );
 * await usuario.guardar();
 * 
 * @example
 * // Autenticar usuario
 * const usuario = await Usuario.obtener('correo@ejemplo.com');
 * const valido = await usuario.verificarContraseña('contraseña');
 *
 * Métodos principales:
 * @method guardar - Guarda usuario nuevo con validaciones
 * @method verificarContraseña - Compara contraseña con hash
 * @method cambiarNombre - Actualiza nombre con validación
 * @method cambiarTema - Alterna entre temas dark/light
 * @method cambiarContraseña - Cambia contraseña con validación
 * 
 * Gestión de proyectos:
 * @method obtenerProyectos - Obtiene proyectos según rol
 * @private obtenerProyectosAdministrador - Proyectos como admin
 * @private obtenerProyectosIntegrante - Proyectos como miembro
 * 
 * Gestión de notificaciones:
 * @method agregarNotificacion - Añade notificación con expiración
 * @method eliminarNotificaciones - Elimina todas las notificaciones
 * @method obtenerNotificaciones - Obtiene notificaciones ordenadas
 * 
 * Métodos estáticos:
 * @static obtener - Obtiene usuario por correo
 * @private static deserializar - Reconstruye instancia desde DB
 */
export default class Usuario {
  public nombre: string
  public readonly correo: string
  private contraseña: string
  public readonly rol: Rol
  public tema: Tema

  public constructor(nombre: string, correo: string, contraseña: string, rol: Rol) {
    this.nombre = nombre
    this.correo = correo
    this.rol = rol
    this.tema = ''
    this.contraseña = contraseña
  }

  public async guardar() {
    if (!esquemaCorreo.safeParse(this.correo).success) throw new Error('El correo electronico no es valido.')
    if (!esquemaNombre.safeParse(this.nombre).success) {
      throw new Error(
        'El nombre de usuario no es válido. Debe contar con un mínimo de 5 caracteres y solo puede contener caracteres alfanuméricos.',
      )
    }
    if (!esquemaContraseña.safeParse(this.contraseña).success) {
      throw new Error(
        'Las contraseñas deben ser mayor de 8 caracteres, debe contar con mayúsculas, minúsculas, números y carácteres especiales.',
      )
    }

    this.contraseña = encriptar(this.contraseña)

    const llave = ['usuarios', this.correo]

    const resultado = await DB.atomic()
      .check({ key: llave, versionstamp: null })
      .set(llave, this)
      .commit()

    if (!resultado.ok) {
      throw new Error(
        'Los datos ya están registrados en la aplicación. Prueba a cambiar el nombre de usuario o el correo electrónico.',
      )
    }
  }

  public verificarContraseña(contraseña: string) {
    return verificarContraseñaHasheada(contraseña, this.contraseña)
  }

  private static deserializar(usuarioSerializado: Deno.KvEntry<Usuario>) {
    const usuario = new Usuario(
      usuarioSerializado.value.nombre,
      usuarioSerializado.value.correo,
      usuarioSerializado.value.contraseña,
      usuarioSerializado.value.rol,
    )
    usuario.tema = usuarioSerializado.value.tema
    return usuario
  }

  public static async obtener(correo: string): Promise<Usuario> {
    const resultado = await DB.get<Usuario>(['usuarios', correo])
    if (!resultado.versionstamp || !resultado.value) throw new Error('Usuario no encontrado.')
    return Usuario.deserializar(resultado)
  }

  private async actualizar() {
    const resultado = await DB.atomic()
      .set(['usuarios', this.correo], this)
      .commit()

    if (!resultado.ok) throw new Error('No se pudo cambiar los datos de usuario.')
  }

  public async cambiarNombre(nombre: string) {
    if (!esquemaNombre.safeParse(nombre).success) {
      throw new Error('El nombre de usuario no es válido.')
    }

    this.nombre = nombre
    await this.actualizar()
  }

  public async cambiarTema() {
    this.tema = this.tema === '' ? 'dark' : ''
    await this.actualizar()
  }

  public async cambiarContraseña(contraseña: string) {
    if (!esquemaContraseña.safeParse(contraseña).success) {
      throw new Error(
        'Las contraseñas deben ser mayor de 8 caracteres, debe contar con mayúsculas, minúsculas, números y carácteres especiales.',
      )
    }

    this.contraseña = encriptar(contraseña)
    await this.actualizar()
  }

  /* MÉTODOS PARA PROYECTOS */
  public async obtenerProyectos() {
    return this.rol === 'admin' ? await this.obtenerProyectosAdministrador() : await this.obtenerProyectosIntegrante()
  }

  private async obtenerProyectosAdministrador(): Promise<Proyecto[]> {
    const proyectos: Proyecto[] = []

    for await (const proyecto of DB.list<Proyecto>({ prefix: ['proyectos'] })) {
      // Para ignorar las otros elementos del proyecto (tareas, comentarios, anuncios, etc...)
      if (proyecto.key.length !== 2) continue

      if (proyecto.value.administrador === this.correo) {
        proyectos.push(Proyecto.deserializar(proyecto))
      }
    }

    return proyectos
  }

  private async obtenerProyectosIntegrante() {
    const proyectos: Proyecto[] = []

    for await (const proyecto of DB.list<Proyecto>({ prefix: ['proyectos'] })) {
      // Para ignorar las otros elementos del proyecto (tareas, comentarios, anuncios, etc...)
      if (proyecto.key.length !== 2) continue

      if (proyecto.value.integrantes.includes(this.correo)) {
        proyectos.push(Proyecto.deserializar(proyecto))
      }
    }

    return proyectos
  }

  public async agregarNotificacion(notificacion: Notificacion) {
    const ahora = Date.now()
    const tiempoRestante = notificacion.fechaExpiracion.getTime() - ahora

    // Validación importante
    if (tiempoRestante <= 0) {
      throw new Error('La fecha de expiración debe ser en el futuro')
    }

    const resultado = await DB
      .atomic()
      .set(
        ['usuarios', this.correo, 'notificaciones', notificacion.id],
        notificacion,
        { expireIn: tiempoRestante }, // Deno KV espera milisegundos
      )
      .commit()

    if (!resultado.ok) {
      throw new Error('No se pudo crear la notificación')
    }

    return notificacion
  }

  public async eliminarNotificaciones() {
    for await (const notificacion of DB.list({ prefix: ['usuarios', this.correo, 'notificaciones'] })) {
      await DB.delete(notificacion.key)
    }
  }

  public async obtenerNotificaciones() {
    const notificaciones: Notificacion[] = []

    for await (const notificacion of DB.list<Notificacion>({ prefix: ['usuarios', this.correo, 'notificaciones'] })) {
      notificaciones.push(notificacion.value)
    }

    return notificaciones.sort((a, b) => {
      const fechaA = new Date(a.fechaCreacion).getTime()
      const fechaB = new Date(b.fechaCreacion).getTime()
      return fechaB - fechaA
    })
  }
}
