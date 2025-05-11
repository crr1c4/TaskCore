/**
 * @file tests/usuarios.ts
 * @author Christian Venegas
 * @description este archivo se usará para verificar la integridad y buen
 * funcionamiento de la base de datos de los usuarios.
 *
 * @see {@link https://jsr.io/@felix/bcrypt}
 * @see {@link https://jsr.io/@std/expect}
 */

// import * as Usuarios from "../modelos/usuario.ts"
// import { eliminarBaseDatos } from "../mod.ts"
// import { expect } from "jsr:@std/expect"
// import { verify } from "jsr:@felix/bcrypt"
// import { admin } from "./datosEjemplo.ts"
//
// Deno.test("usuario.creacion", async (tests) => {
//   await eliminarBaseDatos()
//
//   /**
//    * @description El test insertará un usuario en la base datos e verificará
//    * que no hubo problemas.
//    */
//   await tests.step("exito", async () => {
//     const resultado = await Usuarios.insertarUsuario(admin)
//     expect(resultado).toBeTruthy()
//   })
//
//   /**
//    * @description El test insertará un usuario con los mismos datos dos veces;
//    * la primera inserción se debe hacer de manera exitosa,
//    * la segunda inserción debe fallar debido a que ya existe en la BD.
//    */
//   await tests.step("error", async () => {
//     await eliminarBaseDatos()
//
//     expect(await Usuarios.insertarUsuario(admin)).toBeTruthy()
//     expect(await Usuarios.insertarUsuario(admin)).toBeFalsy()
//   })
// })
//
// Deno.test("usuario.obtener", async (tests) => {
//   await eliminarBaseDatos()
//
//   /**
//    * @description El test insertará un usuario en la BD y obtendra despues para
//    * verificar la igualdad de todos los parametros.
//    */
//   await tests.step("exito", async () => {
//     // Es necesario el spread operator por que se va a verificar la contraseña despues.
//     const resultado = await Usuarios.insertarUsuario({ ...admin })
//     // Creación correcta del usuario.
//     expect(resultado).toBeTruthy()
//
//     const usuarioBD = await Usuarios.obtenerUsuario(admin.correo)
//     // Verificar que no sea null
//     expect(usuarioBD).not.toBeNull()
//
//     // Verificar que los datos de la BD coincidan con los insertados.
//     expect(usuarioBD!.nombre).toBe(admin.nombre)
//     expect(usuarioBD!.correo).toBe(admin.correo)
//     expect(usuarioBD!.rol).toBe(admin.rol)
//     expect(await verify(admin.contraseña, usuarioBD!.contraseña))
//       .toBeTruthy()
//   })
//
//   /**
//    * @description El test insertará un usuario en la BD y
//    * tratará de obtenerlo despues con otro correo para checar
//    * que se retorne null.
//    */
//   await tests.step("error", async () => {
//     const usuarioBd = await Usuarios.obtenerUsuario("otro.correo@correo.com")
//     // Verificar que no sea null
//     expect(usuarioBd).toBeNull()
//   })
// })
//
// /**
//  * @description El test insertará un nuevo usuario y modificará todos los parametros
//  * del usuario.
//  */
// Deno.test("usuario.editar", async (tests) => {
//   await eliminarBaseDatos()
//   await Usuarios.insertarUsuario(admin)
//
//   // Contraseña
//   await tests.step("exito.contraseña", async () => {
//     await Usuarios.editarUsuario(admin.correo, {
//       contraseña: "nuevaContraseña",
//     })
//     const usuarioBD = await Usuarios.obtenerUsuario(admin.correo)
//     expect(usuarioBD).not.toBeNull()
//     expect(await verify("nuevaContraseña", usuarioBD!.contraseña)).toBeTruthy()
//   })
//
//   // Nombre
//   await tests.step("exito.nombre", async () => {
//     await Usuarios.editarUsuario(admin.correo, { nombre: "Carlos Acevedo" })
//     const usuarioBD = await Usuarios.obtenerUsuario(admin.correo)
//     expect(usuarioBD).not.toBeNull()
//     expect(usuarioBD!.nombre).toEqual("Carlos Acevedo")
//   })
//
//   // Rol
//   await tests.step("exito.rol", async () => {
//     await Usuarios.editarUsuario(admin.correo, { rol: "miembro" })
//     const usuarioBD = await Usuarios.obtenerUsuario(admin.correo)
//     expect(usuarioBD).not.toBeNull()
//     expect(usuarioBD!.rol).toEqual("miembro")
//   })
//
//   // Correo
//   await tests.step("exito.correo", async () => {
//     await Usuarios.editarUsuario(admin.correo, {
//       correo: "otro.correo@correo.com",
//     })
//     const usuarioBD = await Usuarios.obtenerUsuario("otro.correo@correo.com")
//     expect(usuarioBD).not.toBeNull()
//     expect(usuarioBD!.correo).toEqual("otro.correo@correo.com")
//   })
//
//   // Error, debe retornar false
//   await tests.step("error", async () => {
//     expect(
//       await Usuarios.editarUsuario(admin.correo, {
//         correo: "otro.correo@correo.com",
//       }),
//     ).toBeFalsy()
//   })
// })
//
// /**
//  * @description El test insertará un usuario en la BD y despues lo
//  * eliminará; luego se tratará de obtener, y se verificará que sea null.
//  */
// Deno.test("usuario.eliminar", async () => {
//   await eliminarBaseDatos()
//   expect(await Usuarios.insertarUsuario(admin)).toBeTruthy()
//   expect(await Usuarios.obtenerUsuario(admin.correo)).not.toBeNull()
//   await Usuarios.eliminarUsuario(admin.correo)
//   expect(await Usuarios.obtenerUsuario(admin.correo)).toBeNull()
// })
