import * as Proyectos from '../modelos/proyecto.ts'
import * as Usuarios from '../modelos/usuario.ts'
import * as Tareas from '../modelos/tarea.ts'
import { eliminarBaseDatos } from '../mod.ts'
import { expect } from 'jsr:@std/expect'
import * as DatosEjemplo from './datosEjemplo.ts'

/**
 * Registra todos los datos iniciales en la base de datos.
 * @async
 * @returns {Promise<string>} ID del proyecto creado.
 */
async function registrarTodo() {
  await eliminarBaseDatos()

  await Usuarios.insertarUsuario(DatosEjemplo.admin)
  await Usuarios.insertarUsuario(DatosEjemplo.miembro1)
  await Usuarios.insertarUsuario(DatosEjemplo.miembro2)
  await Usuarios.insertarUsuario(DatosEjemplo.miembro3)
  await Usuarios.insertarUsuario(DatosEjemplo.miembro4)
  await Usuarios.insertarUsuario(DatosEjemplo.miembro5)

  return await Proyectos.crearProyecto(
    DatosEjemplo.proyecto1,
  )
}

/**
 * @description Crear una tarea
 */
Deno.test('tareas.crear', async (tests) => {
  const idProyecto = await registrarTodo()

  await tests.step('exito', async () => {
    const idTarea1 = await Tareas.crearTarea(DatosEjemplo.tarea1, DatosEjemplo.miembro2.correo, idProyecto!)
    const idTarea2 = await Tareas.crearTarea(DatosEjemplo.tarea2, DatosEjemplo.miembro1.correo, idProyecto!)
    expect(idTarea1).not.toBeNull()
    expect(idTarea2).not.toBeNull()
  })

  await tests.step('error', async () => {
    // Miembro no existente en el proyecto
    const idTarea3 = await Tareas.crearTarea(DatosEjemplo.tarea3, DatosEjemplo.miembro4.correo, idProyecto!)
    expect(idTarea3).toBeNull()

    // No existe un proyecto
    const idTarea4 = await Tareas.crearTarea(DatosEjemplo.tarea3, DatosEjemplo.miembro1.correo, 'otro id')
    expect(idTarea4).toBeNull()
  })
})

/**
 * @description Obtener todas las tareas de un miembro
 */
Deno.test('tareas.obtener', async (tests) => {
  const idProyecto = await registrarTodo()

  await tests.step('exito', async () => {
    const idTarea1 = await Tareas.crearTarea(DatosEjemplo.tarea1, DatosEjemplo.miembro2.correo, idProyecto!)
    const idTarea2 = await Tareas.crearTarea(DatosEjemplo.tarea2, DatosEjemplo.miembro1.correo, idProyecto!)
    const idTarea3 = await Tareas.crearTarea(DatosEjemplo.tarea3, DatosEjemplo.miembro2.correo, idProyecto!)
    expect(idTarea1).not.toBeNull()
    expect(idTarea2).not.toBeNull()
    expect(idTarea3).not.toBeNull()

    let tareas = await Tareas.obtenerTareasMiembro(idProyecto!, DatosEjemplo.miembro2.correo)
    expect(tareas.length).toBe(2)
    tareas = await Tareas.obtenerTareasMiembro(idProyecto!, DatosEjemplo.miembro1.correo)
    expect(tareas.length).toBe(1)
  })
})

/**
 * @description Editar los parametros de la tarea (solo admin)
 */
Deno.test('tareas.editar', async (tests) => {
  const idProyecto = await registrarTodo()

  await tests.step('exito', async () => {
    const idTarea1 = await Tareas.crearTarea(DatosEjemplo.tarea1, DatosEjemplo.miembro2.correo, idProyecto!)
    expect(idTarea1).not.toBeNull()

    await Tareas.editarTarea({ estado: true, nombre: 'Cambio' }, idProyecto!, DatosEjemplo.miembro2.correo, idTarea1!)
    const tareaEditada = await Tareas.obtenerTarea(idProyecto!, DatosEjemplo.miembro2.correo, idTarea1!)
    expect(tareaEditada).not.toBeNull()
    expect(tareaEditada?.nombre).toBe('Cambio')
    expect(tareaEditada?.estado).toBe(true)
  })

  await tests.step('error', async () => {
    const resultado = await Tareas.editarTarea(
      { estado: true, nombre: 'Cambio' },
      idProyecto!,
      DatosEjemplo.miembro2.correo,
      'otro_id',
    )
    expect(resultado).toBeFalsy()
  })
})

/**
 * @description Eliminar una tarea
 */
Deno.test('tareas.eliminar', async () => {
  const idProyecto = await registrarTodo()

  const idTarea1 = await Tareas.crearTarea(DatosEjemplo.tarea1, DatosEjemplo.miembro2.correo, idProyecto!)
  await Tareas.crearTarea(DatosEjemplo.tarea2, DatosEjemplo.miembro1.correo, idProyecto!)

  let tareasProyecto = await Tareas.obtenerTareasProyecto(idProyecto!)
  expect(tareasProyecto.length).toBe(2)

  await Tareas.eliminarTarea(idProyecto!, DatosEjemplo.miembro2.correo, idTarea1!)

  tareasProyecto = await Tareas.obtenerTareasProyecto(idProyecto!)
  expect(tareasProyecto.length).toBe(1)
})
