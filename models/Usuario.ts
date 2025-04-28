/**
 * @author Christian Venegas
 * @description Modelo de Usuario, con los metodos para manejarlo en la BD.
 * @license MIT
 */
import { hash as encriptar } from '@felix/bcrypt'
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
const esquemaNombre = esquema.string().min(1)

/**
 * @description Esquema de validación para correos electrónicos.
 * - Debe ser una cadena de texto en formato de correo válido.
 */
const esquemaCorreo = esquema.string().email()

export type Rol = 'admin' | 'miembro'
export type Tema = 'dark' | ''

export default class Usuario {
  nombre: string
  readonly correo: string
  contraseña: string
  readonly rol: Rol
  tema: Tema

  constructor(nombre: string, correo: string, contraseña: string, rol: Rol, tema: Tema) {
    this.nombre = nombre
    this.correo = correo
    this.rol = rol
    this.tema = tema
    this.contraseña = contraseña
  }

  async guardar() {
    if (!esquemaCorreo.safeParse(this.correo).success) throw new Error('El correo electronico no es valido.')
    if (!esquemaNombre.safeParse(this.nombre).success) throw new Error('El nombre de usuario no es valido.')
    if (!esquemaContraseña.safeParse(this.contraseña).success) {
      throw new Error(
        'Las contraseñas deben ser mayor de 8 caracteres, debe contar con mayúsculas, minúsculas, números y carácteres especiales.',
      )
    }

    this.contraseña = await encriptar(this.contraseña)

    const llave = ["usuarios", this.correo]
    const resultado = await DB.atomic()
      .check({ key: llave, versionstamp: null })
      .set(llave, this)
      .commit()

    if (!resultado.ok) throw new Error('El usuario ya está registrado.')
  }

  static async obtener(correo: string): Promise<Usuario> {
    const resultado = await DB.get<Usuario>(["usuarios", correo])
    if (!resultado.versionstamp || !resultado.value) throw new Error('Usuario no encontrado.')
    return resultado.value
  }

  static async eliminar(correo: string) {
    await DB.delete(["usuarios", correo])
  }

  async eliminar() {
    await Usuario.eliminar(this.correo)
  }

  async editar(nuevosDatos: Partial<Usuario>) {
    if (nuevosDatos.nombre) {
      if (!esquemaNombre.safeParse(nuevosDatos.nombre).success) {
        throw new Error('El nombre de usuario no es válido.')
      }
      this.nombre = nuevosDatos.nombre
    }

    if (nuevosDatos.tema) {
      this.tema = nuevosDatos.tema
    }

    if (nuevosDatos.contraseña) {
      if (!esquemaContraseña.safeParse(nuevosDatos.contraseña).success) {
        throw new Error(
          'Las contraseñas deben ser mayor de 8 caracteres, debe contar con mayúsculas, minúsculas, números y carácteres especiales.',
        )
      }
      this.contraseña = await encriptar(nuevosDatos.contraseña)
    }

    const resultado = await DB.atomic()
      .set(["usuarios", this.correo], this)
      .commit()

    if (!resultado.ok) throw new Error('Hubo un error al actualizar los datos.')
  }

  public async obtenerProyectos(): Promise<Proyecto[]> {
    const proyectos: Proyecto[] = []

    for await (const entrada of DB.list<Usuario>({ prefix: ['proyectos'] })) {
      const [_, idProyecto, rol, correoMiembro] = entrada.key as [string, string, string, string?]

      if (rol === 'admin' && entrada.value.correo === this.correo) {
        const entradaProyecto = await DB.get<Proyecto>(['proyectos', idProyecto])
        if (entradaProyecto.value) {
          proyectos.push(entradaProyecto.value)
        }
      } else if (rol === 'miembro' && correoMiembro === this.correo) {
        const entradaProyecto = await DB.get<Proyecto>(['proyectos', idProyecto])
        if (entradaProyecto.value) {
          proyectos.push(entradaProyecto.value)
        }
      }
    }

    return proyectos
  }
}
