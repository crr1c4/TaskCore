import * as Proyectos from '../modelos/proyecto.ts'
import * as Usuarios from '../modelos/usuario.ts'
import * as Anuncios from '../modelos/anuncio.ts'
import { eliminarBaseDatos } from '../mod.ts'
import { expect } from 'jsr:@std/expect'
import * as DatosEjemplo from './datosEjemplo.ts'

/**
 * Registra usuarios y crea un proyecto de ejemplo en la base de datos.
 * @returns {Promise<string | null>} - ID del proyecto creado, o `null` si falla.
 */
async function registrarTodo(): Promise<string | null> {
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
 * Prueba la creación de anuncios en un proyecto.
 */
Deno.test('anuncio.creacion', async (tests) => {
  const idProyecto = await registrarTodo()

  await tests.step('exito', async () => {
    const idAnuncio = await Anuncios.crearAnuncio({ titulo: 'Anuncio 1', descripcion: 'ABC' }, idProyecto!)
    expect(idAnuncio).not.toBeNull()
  })

  await tests.step('error', async () => {
    const idAnuncio = await Anuncios.crearAnuncio({ titulo: 'Anuncio 1', descripcion: 'ABC' }, 'id_falsa')
    expect(idAnuncio).toBeNull()
  })
})

/**
 * Prueba la obtención de anuncios dentro de un proyecto.
 */
Deno.test("anuncios.obtener", async () => {
  const idProyecto = await registrarTodo()
    await Anuncios.crearAnuncio({ titulo: 'Anuncio 1', descripcion: 'ABC' }, idProyecto!)
    await Anuncios.crearAnuncio({ titulo: 'Anuncio 2', descripcion: 'ABC' }, idProyecto!)
  
  const anuncios = await Anuncios.obtenerAnunciosProyecto(idProyecto!)

  expect(anuncios.length).toBe(2)
})

/**
 * Prueba la eliminación de anuncios de un proyecto.
 */
Deno.test("anuncios.eliminar", async () => {
  const idProyecto = await registrarTodo()
    const idAnuncio1 = await Anuncios.crearAnuncio({ titulo: 'Anuncio 1', descripcion: 'ABC' }, idProyecto!)
    const idAnuncio2 = await Anuncios.crearAnuncio({ titulo: 'Anuncio 2', descripcion: 'ABC' }, idProyecto!)

  let anuncios = await Anuncios.obtenerAnunciosProyecto(idProyecto!)
  expect(anuncios.length).toBe(2)

  await Anuncios.eliminarAnuncio(idProyecto!, idAnuncio1!)
  anuncios = await Anuncios.obtenerAnunciosProyecto(idProyecto!)
  expect(anuncios.length).toBe(1)
  expect(anuncios[0].id).not.toContain(idAnuncio1)
  expect(anuncios[0].id).toContain(idAnuncio2)
})
