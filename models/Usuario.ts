/**
 * @author Christian Venegas
 * @description Modelo de Usuario, con los metodos para manejarlo en la BD.
 * @license MIT
 */
import { hash as encriptar, verify as verificarContraseñaHasheada } from '@felix/bcrypt'
import { DB } from './mod.ts'
import { z as esquema } from 'zod'
import Proyecto from './Proyecto.ts'

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
  .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val))

/**
 * @description Esquema de validación para nombres.
 * - Debe ser una cadena de texto con al menos 1 carácter.
 */
const esquemaNombre = esquema.string()
  .min(5)
  .regex(/^[a-zA-Z0-9]+$/)

/**
 * @description Esquema de validación para correos electrónicos.
 * - Debe ser una cadena de texto en formato de correo válido.
 */
const esquemaCorreo = esquema.string().email()

export type Rol = 'admin' | 'miembro'
export type Tema = 'dark' | ''

export default class Usuario {
  public nombre: string
  public correo: string
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

    this.contraseña = await encriptar(this.contraseña)

    const llaveCorreo = ['usuarios.correo', this.correo]
    const llaveNombre = ['usuarios.nombre', this.nombre]

    const resultado = await DB.atomic()
      .check({ key: llaveNombre, versionstamp: null })
      .check({ key: llaveCorreo, versionstamp: null })
      .set(llaveNombre, this)
      .set(llaveCorreo, this)
      .commit()

    if (!resultado.ok) {
      throw new Error(
        'Los datos ya están registrados en la aplicación. Prueba a cambiar el nombre de usuario o el correo electrónico.',
      )
    }
  }

  public async verificarContraseña(contraseña: string) {
    return await verificarContraseñaHasheada(contraseña, this.contraseña)
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

  public static async obtenerPorCorreo(correo: string): Promise<Usuario> {
    const resultado = await DB.get<Usuario>(['usuarios.correo', correo])
    if (!resultado.versionstamp || !resultado.value) throw new Error('Usuario no encontrado.')
    return Usuario.deserializar(resultado)
  }

  public static async obtenerPorNombre(nombre: string): Promise<Usuario> {
    const resultado = await DB.get<Usuario>(['usuarios.nombre', nombre])
    if (!resultado.versionstamp || !resultado.value) throw new Error('Usuario no encontrado.')
    return Usuario.deserializar(resultado)
  }

  public static async verificarExistenciaNombre(nombre: string) {
    const resultado = await DB.get(['usuarios.nombre', nombre])
    return resultado.versionstamp && resultado.value
  }

  public async cambiarNombre(nombre: string) {
    if (!esquemaNombre.safeParse(nombre).success) {
      throw new Error('El nombre de usuario no es válido.')
    }

    if (await Usuario.verificarExistenciaNombre(nombre)) {
      throw new Error('Ya existe un usuario con ese nombre.')
    }

    const nombreAntiguo = this.nombre
    this.nombre = nombre

    const resultado = await DB.atomic()
      // .check({ key: ['usuarios.nombre', this.nombre], versionstamp: null })
      .delete(['usuarios.nombre', nombreAntiguo])
      .set(['usuarios.nombre', this.nombre], this)
      .set(['usuarios.correo', this.correo], this)
      .commit()

    if (!resultado.ok) throw new Error('No se pudo cambiar el nombre de usuario.')
  }

  public async cambiarCorreo(correo: string) {
    if (!esquemaCorreo.safeParse(correo).success) {
      throw new Error('El correo no es válido.')
    }

    const usuarioExistente = await Usuario.obtenerPorCorreo(correo)

    if (usuarioExistente) {
      throw new Error('Ya existe un usuario con ese correo.')
    }

    const correoAntiguo = this.correo
    this.correo = correo

    const resultado = await DB.atomic()
      // .check({ key: ['usuarios.correo', this.correo], versionstamp: null })
      .delete(['usuarios.correo', correoAntiguo])
      .set(['usuarios.nombre', this.nombre], this)
      .set(['usuarios.correo', this.correo], this)
      .commit()

    if (!resultado.ok) throw new Error('No se pudo cambiar el correo electronico.')
  }

  public async cambiarTema() {
    this.tema = this.tema === '' ? 'dark' : ''

    const resultado = await DB.atomic()
      .set(['usuarios.nombre', this.nombre], this)
      .set(['usuarios.correo', this.correo], this)
      .commit()

    if (!resultado.ok) throw new Error('No se pudo cambiar el tema de la aplicación.')
  }

  public async cambiarContraseña(contraseña: string) {
    if (!esquemaContraseña.safeParse(contraseña).success) {
      throw new Error(
        'Las contraseñas deben ser mayor de 8 caracteres, debe contar con mayúsculas, minúsculas, números y carácteres especiales.',
      )
    }

    this.contraseña = await encriptar(contraseña)

    const resultado = await DB.atomic()
      .set(['usuarios.nombre', this.nombre], this)
      .set(['usuarios.correo', this.correo], this)
      .commit()

    if (!resultado.ok) throw new Error('No se pudo cambiar la contraseña.')
  }

  /* MÉTODOS PARA PROYECTOS */
  public async obtenerProyectos() {
    return this.rol === 'admin' ? await this.proyectosAdministrador() : await this.obtenerProyectosMiembro()
  }

  private async proyectosAdministrador(): Promise<Proyecto[]> {
    const proyectos: Proyecto[] = []

    for await (const entrada of DB.list<Proyecto>({ prefix: ['proyectos'] })) {
      if (
        entrada.value.administrador.correo === this.correo && entrada.value.administrador.nombre === this.nombre
      ) {
        proyectos.push(entrada.value)
      }
    }

    return proyectos
  }

  private async obtenerProyectosMiembro() {
    const proyectos: Proyecto[] = []

    for await (const entrada of DB.list<Proyecto>({ prefix: ['proyectos'] })) {
      const [_cadenaProyecto, idProyecto] = entrada.key as [string, string]
      const proyecto = await Proyecto.obtener(idProyecto)
      if (proyecto.miembros.includes(this.correo)) {
        proyectos.push(proyecto)
      }
    }

    return proyectos
  }

  // public async obtenerTareas(idProyecto: string): Promise<Tarea[]> {
  //   const tareas: Tarea[] = []
  //
  //   for await (const entrada of DB.list<Usuario>({ prefix: ['proyectos', idProyecto, 'tareas', this.#correo] })) {
  //   }
  //
  //   return tareas
  // }
}
