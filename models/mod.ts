import Proyecto from '../models/Proyecto.ts'
import Notificacion from '../models/Notificacion.ts'

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

/**
 * Verifica tareas con menos de 1 hora para expirar
 */
export async function verificarTareasProximas() {
  try {
    const proyectos = await obtenerTodosLosProyectos()

    for (const proyecto of proyectos) {
      const tareas = await proyecto.obtenerTareasAdministrador()
      for (const tarea of tareas) {
        if (tarea.completada) continue

        const tiempoRestante = tarea.fechaExpiracion.getTime() - Date.now()
        const unaHoraEnMs = 60 * 60 * 1000

        if (tiempoRestante > 0 && tiempoRestante <= unaHoraEnMs) {
          await proyecto.enviarNotificacion(
            tarea.correoResponsable,
            new Notificacion(
              '⏰ Tarea por expirar',
              `La tarea "${tarea.nombre}" en el proyecto "${proyecto.nombre}" vence en menos de 12 horas.`,
            ),
          )
        }
      }
    }
  } catch (error) {
    console.error('Error en verificarTareasProximas:', error)
  }
}

/**
 * Verifica tareas ya vencidas
 */
export async function verificarTareasVencidas() {
  try {
    const proyectos = await obtenerTodosLosProyectos()

    for (const proyecto of proyectos) {
      const tareas = await proyecto.obtenerTareasAdministrador()
      for (const tarea of tareas) {
        if (tarea.completada) continue

        if (tarea.haExpirado() && !tarea.completada) {
          await proyecto.enviarNotificacion(
            tarea.correoResponsable,
            new Notificacion(
              '⚠️ Tarea vencida',
              `La tarea "${tarea.nombre}" en el proyecto "${proyecto.nombre}" ha vencido.`,
              "advertencia"
            ),
          )

          await proyecto.enviarNotificacion(
            proyecto.administrador,
            new Notificacion(
              '⚠️T area vencida',
              `La tarea "${tarea.nombre}" en el proyecto "${proyecto.nombre}" ha vencido.`,
              'advertencia'
            ),
          )
        }
      }
    }
  } catch (error) {
    console.error('Error en verificarTareasProximas:', error)
  }
}

// Helper functions
async function obtenerTodosLosProyectos(): Promise<Proyecto[]> {
  const proyectos: Proyecto[] = []
  const consulta = DB.list<Proyecto>({ prefix: ['proyectos'] })

  for await (const proyecto of consulta) {
    proyectos.push(Proyecto.deserializar(proyecto))
  }

  return proyectos
}
