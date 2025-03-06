export const DB = await Deno.openKv()
export const USUARIOS = "usuarios"
export const TAREAS = "tareas";
export const PROYECTOS = "proyectos"

/**
 * @author Christian Venegas
 * @description WARNING: Esta función elimina todos los registros de la base de datos.
 */
export async function eliminarBaseDatos() {
  const entries = DB.list({ prefix: [] })
  for await (const registro of entries) {
    // console.log(registro);
    await DB.delete(registro.key)
  }
}
