import * as Proyectos from '../modelos/proyecto.ts'
import * as Usuarios from '../modelos/usuario.ts'
import * as Tareas from '../modelos/tarea.ts'
import * as Comentarios from '../modelos/comentario.ts'
import { eliminarBaseDatos } from '../mod.ts'
import { expect } from 'jsr:@std/expect'
import * as DatosEjemplo from './datosEjemplo.ts'

/**
 * Registra usuarios, un proyecto y una tarea en la base de datos.
 * @returns {Promise<{idProyecto: string, idTarea: string}>} 
 * Un objeto con los identificadores del proyecto y la tarea creados.
 */
async function registrarTodo(): Promise<{ idProyecto: string; idTarea: string }> {
  await eliminarBaseDatos()

  await Usuarios.insertarUsuario(DatosEjemplo.admin)
  await Usuarios.insertarUsuario(DatosEjemplo.miembro1)
  await Usuarios.insertarUsuario(DatosEjemplo.miembro2)
  await Usuarios.insertarUsuario(DatosEjemplo.miembro3)
  await Usuarios.insertarUsuario(DatosEjemplo.miembro4)
  await Usuarios.insertarUsuario(DatosEjemplo.miembro5)

  const datosPrueba = {
    idProyecto: '',
    idTarea: '',
  }

  datosPrueba.idProyecto = (await Proyectos.crearProyecto(
    DatosEjemplo.proyecto1,
  ))!

  datosPrueba.idTarea =
    (await Tareas.crearTarea(DatosEjemplo.tarea1, DatosEjemplo.miembro2.correo, datosPrueba.idProyecto))!
  // const idTarea2 = (await Tareas.crearTarea(DatosEjemplo.tarea2, DatosEjemplo.miembro1.correo, datosPrueba.idProyecto))!
  //
  return datosPrueba
}

/**
 * Prueba la creación de comentarios en una tarea.
 */
Deno.test('comentario.crear', async (tests) => {
  const datos = await registrarTodo()

  await tests.step('exito', async () => {
    const idComentario = await Comentarios.crearComentario({
      creadoPor: DatosEjemplo.miembro2.correo,
      contenido: 'Comentario jajaja',
    }, { correoMiembro: DatosEjemplo.miembro2.correo, idProyecto: datos.idProyecto, idTarea: datos.idTarea })
    expect(idComentario).not.toBeNull()
  })

  await tests.step('error', async () => {
    const idComentario = await Comentarios.crearComentario({
      creadoPor: DatosEjemplo.miembro3.correo,
      contenido: 'Comentario jajaja',
    }, { correoMiembro: DatosEjemplo.miembro3.correo, idProyecto: datos.idProyecto, idTarea: 'otro_id' })
    expect(idComentario).toBeNull()
  })
})

/**
 * Prueba la eliminación y recuperación de comentarios en una tarea.
 */
Deno.test('anuncios.eliminar.obtener', async () => {
  const datos = await registrarTodo()

  const idComentario1 = await Comentarios.crearComentario({
    creadoPor: DatosEjemplo.miembro2.correo,
    contenido: 'Comentario jajaja',
  }, { correoMiembro: DatosEjemplo.miembro2.correo, idProyecto: datos.idProyecto, idTarea: datos.idTarea })

  const idComentario2 = await Comentarios.crearComentario({
    creadoPor: DatosEjemplo.miembro2.correo,
    contenido: 'Comentario jajaja',
  }, { correoMiembro: DatosEjemplo.miembro2.correo, idProyecto: datos.idProyecto, idTarea: datos.idTarea })

  expect(idComentario1).not.toBeNull()
  expect(idComentario2).not.toBeNull()

  let comentarios = await Comentarios.obtenerComentariosTarea({ correoMiembro: DatosEjemplo.miembro2.correo, idProyecto: datos.idProyecto, idTarea: datos.idTarea })
  expect(comentarios.length).toBe(2)


  await Comentarios.eliminarComentario({
    correoMiembro: DatosEjemplo.miembro2.correo,
    idProyecto: datos.idProyecto,
    idTarea: datos.idTarea,
    idComentario: idComentario2!
  })

  comentarios = await Comentarios.obtenerComentariosTarea({ correoMiembro: DatosEjemplo.miembro2.correo, idProyecto: datos.idProyecto, idTarea: datos.idTarea })
  expect(comentarios.length).toBe(1)
})
