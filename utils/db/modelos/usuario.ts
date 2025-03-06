/**
 * @file models/usuarios.ts
 * @author Christian Venegas
 * @description este archivo contiene las funciones de los usuarios para la BD.
 */
import * as bcrypt from "jsr:@felix/bcrypt"
import { DB, USUARIOS } from "../mod.ts"

export interface Usuario {
  nombre: string
  correo: string
  contraseña: string
  rol: "admin" | "miembro"
}

/**
 * @description Inserta un nuevo usuario en la base de datos.
 * @param usuario {Usuario} el objeto con los datos del usuario.
 * @returns {boolean} Si el usuario se inserto exitosamente.
 */
export async function insertarUsuario(usuario: Usuario): Promise<boolean> {
  // Llaves de los usuarios
  const llave = [USUARIOS, usuario.correo]

  // Encriptacion de la contraseña
  usuario.contraseña = await bcrypt.hash(usuario.contraseña)

  // Checar que no existan usuarios
  const resultado = await DB.atomic()
    .check({ key: llave, versionstamp: null })
    .set(llave, usuario)
    .commit()

  return resultado.ok
}

/**
 * @description Obtiene un usuario de la base de datos por correo.
 * @param correo {string} el correo con el que se consultará por el usuario.
 * @returns {Promise<Usuario|null>} El objeto usuario.
 */
export async function obtenerUsuario(
  correo: string,
): Promise<Usuario | null> {
  const resultado = await DB.get<Usuario>([USUARIOS, correo])
  return resultado.value
}

/**
 * @description Edita un usuario en la base de datos.
 * @param correo {string} el correo con el que se va a buscar en la base de datos.
 * @param nuevoDatos {Partial<Usuario>} el objeto con los nuevos datos.
 * @returns {boolean} Si el usuario se edito exitosamente.
 */
export async function editarUsuario(
  correo: string,
  datosNuevos: Partial<Usuario>,
): Promise<boolean> {
  // Obtención de los datos actuales
  const usuario = await obtenerUsuario(correo)
  if (!usuario) return false

  // Encriptación de la nueva contraseña en caso de actualización.
  if (datosNuevos.contraseña) {
    datosNuevos.contraseña = await bcrypt.hash(datosNuevos.contraseña)
  }

  // Si hay un correo nuevo, se debe eliminar el registro
  if (datosNuevos.correo) {
    await DB.delete([USUARIOS, correo])
  }

  // Actualización de los datos
  const usuarioActualizado = {
    ...usuario,
    ...datosNuevos,
  }

  // Inserción de los nuevos datos.
  const resultado = await DB.atomic()
    .set([USUARIOS, usuarioActualizado.correo], usuarioActualizado)
    .commit()
  return resultado.ok
}

/**
 * @description Elimina un usuario en la base de datos.
 * @param correo {string} el correo con el que se va a buscar en la base de datos.
 */
export async function eliminarUsuario(correo: string) {
  await DB.delete([USUARIOS, correo])
}
