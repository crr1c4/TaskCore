export const DB = await Deno.openKv()

/**
 * @author Christian Venegas
 *  WARNING: Esta función elimina todos los registros de la base de datos.
 */
export async function eliminarBaseDatos() {
  const entries = DB.list({ prefix: [] })
  for await (const registro of entries) {
    // console.log(registro);
    await DB.delete(registro.key)
  }
}

