// /**
//  * @file tests/proyectos.ts
//  * @author Christian Venegas
//  * @description Archivo que contiene las pruebas para la gestión de proyectos en la base de datos.
//  */
//
// import * as Proyectos from "../modelos/proyecto.ts"
// import * as Usuarios from "../modelos/usuario.ts"
// import { eliminarBaseDatos } from "../mod.ts"
// import { expect } from "jsr:@std/expect"
// import * as DatosEjemplo from "./datosEjemplo.ts"
// import { Proyecto } from "../modelos/proyecto.ts"
//
// /**
//  * Registra todos los usuarios y proyectos en la base de datos para los tests.
//  * @returns {Promise<void>}
//  */
// async function registrarTodo(): Promise<void> {
//   await eliminarBaseDatos()
//
//   await Usuarios.insertarUsuario(DatosEjemplo.admin)
//   await Usuarios.insertarUsuario(DatosEjemplo.miembro1)
//   await Usuarios.insertarUsuario(DatosEjemplo.miembro2)
//   await Usuarios.insertarUsuario(DatosEjemplo.miembro3)
//   await Usuarios.insertarUsuario(DatosEjemplo.miembro4)
//   await Usuarios.insertarUsuario(DatosEjemplo.miembro5)
//
//   await Proyectos.crearProyecto(
//     DatosEjemplo.proyecto1,
//     // DatosEjemplo.admin.correo,
//   )
//
//   await Proyectos.crearProyecto(
//     DatosEjemplo.proyecto2,
//     // DatosEjemplo.admin.correo,
//   )
//
//   await Proyectos.crearProyecto(
//     DatosEjemplo.proyecto3,
//     // DatosEjemplo.admin.correo,
//   )
// }
//
// /**
//  * Prueba la creación de proyectos.
//  */
// Deno.test("proyecto.creacion", async (tests) => {
//   await registrarTodo()
//
//   await tests.step("exito.admin", async () => {
//     // Registrar primero el admin
//     await Usuarios.insertarUsuario(DatosEjemplo.admin)
//
//     const resultado = await Proyectos.crearProyecto(
//       DatosEjemplo.proyecto1,
//       // DatosEjemplo.admin.correo,
//     )
//     expect(resultado).not.toBeNull()
//   })
// })
//
// /**
//  * Prueba la obtención y listado de proyectos.
//  */
// Deno.test("proyecto.listar", async (tests) => {
//   await registrarTodo()
//
//   await tests.step("admin", async () => {
//     const proyectos = await Proyectos.obtenerListaProyectosAdmin(
//       DatosEjemplo.admin.correo,
//     )
//     expect(proyectos.length).toBe(3)
//     const nombres = proyectos.map((proyecto) => proyecto.nombre)
//     expect(nombres).toContain(DatosEjemplo.proyecto1.nombre)
//     expect(nombres).toContain(DatosEjemplo.proyecto2.nombre)
//     expect(nombres).toContain(DatosEjemplo.proyecto3.nombre)
//   })
//
//   await tests.step("miembro.correctos", async () => {
//     // Javier
//     const proyectos = await Proyectos.obtenerListaProyectosMiembro(
//       DatosEjemplo.miembro1.correo,
//     )
//     expect(proyectos.length).toBe(2)
//     const nombres = proyectos.map((proyecto) => proyecto.nombre)
//     expect(nombres).toContain(DatosEjemplo.proyecto1.nombre)
//     expect(nombres).toContain(DatosEjemplo.proyecto3.nombre)
//   })
//
//   await tests.step("miembro.incorrectos", async () => {
//     // Sofia
//     const proyectos = await Proyectos.obtenerListaProyectosMiembro(
//       DatosEjemplo.miembro2.correo,
//     )
//     expect(proyectos.length).toBe(2)
//     const nombres = proyectos.map((proyecto) => proyecto.nombre)
//     expect(nombres).not.toContain(DatosEjemplo.proyecto2.nombre)
//   })
// })
//
// /**
//  * Prueba la eliminación de proyectos.
//  */
// Deno.test("proyecto.eliminar", async () => {
//   await registrarTodo()
//   let proyectos = await Proyectos.obtenerListaProyectosAdmin(
//     DatosEjemplo.admin.correo,
//   )
//   expect(proyectos.length).toBe(3)
//   proyectos.forEach((proyecto) =>
//     Proyectos.eliminarProyecto(proyecto.id)
//   )
//   proyectos = await Proyectos.obtenerListaProyectosAdmin(
//     DatosEjemplo.admin.correo,
//   )
//   expect(proyectos.length).toBe(0)
// })
//
// /**
//  * Prueba la obtención de un proyecto por su ID.
//  */
// Deno.test("proyecto.obtener", async () => {
//   await registrarTodo()
//
//   const proyectos = await Proyectos.obtenerListaProyectosAdmin(
//     DatosEjemplo.admin.correo,
//   )
//   expect(proyectos.length).toBe(3)
//
//   expect(
//     await Proyectos.obtenerProyecto(proyectos[0].id),
//   ).toBeTruthy()
//   expect(
//     await Proyectos.obtenerProyecto(proyectos[1].id),
//   ).toBeTruthy()
//   expect(
//     await Proyectos.obtenerProyecto(proyectos[2].id),
//   ).toBeTruthy()
// })
//
// /**
//  * Prueba la edición de un proyecto.
//  */
// Deno.test("proyecto.editar", async () => {
//   await registrarTodo()
//   const id = await Proyectos.crearProyecto(
//     DatosEjemplo.proyecto4,
//   )
//   expect(id).not.toBeNull()
//   const nuevosDatos: Partial<Proyecto> = {
//     nombre: "Descanso",
//     descripcion: "Necesito un descanso",
//     correosIntegrantesEquipo: [
//       "javier.rodriguez@correo.com",
//       "valeria.castillo@correo.com",
//       "sofia.mendez@correo.com",
//     ],
//   }
//
//   await Proyectos.editarProyecto(id!, nuevosDatos)
//   const proyecto = await Proyectos.obtenerProyecto(
//     id!,
//   )
//
//   expect(proyecto).toBeTruthy()
//   expect(proyecto!.nombre).toBe("Descanso")
//   expect(proyecto!.descripcion).toBe("Necesito un descanso")
//   expect(proyecto!.correosIntegrantesEquipo.length).toBe(3)
// })
