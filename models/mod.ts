import Proyecto from '../models/Proyecto.ts'
import Notificacion from '../models/Notificacion.ts'

export const DB = await Deno.openKv()

/**
 * Elimina todos los registros de la base de datos actual.
 * Uso restringido: esta acción es irreversible.
 * 
 * @author Christian Venegas
 * @returns Promesa que se resuelve al finalizar la eliminación.
 */

export async function eliminarBaseDatos() {
  const entries = DB.list({ prefix: [] })
  for await (const registro of entries) {
    // console.log(registro);
    await DB.delete(registro.key)
  }
}

/**
 * Revisa todas las tareas de la base de datos y envía una notificación 
 * a los responsables si alguna está por vencer en menos de una hora.
 * 
 * @returns Promesa que se resuelve tras completar la verificación.
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
              `La tarea "${tarea.nombre}" en el proyecto "${proyecto.nombre}" vence en menos de una hora.`,
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
 * Revisa todas las tareas y detecta cuáles han vencido. 
 * Envía notificaciones tanto al responsable como al administrador del proyecto.
 * 
 * @returns Promesa que se resuelve tras completar la verificación.
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
              '⚠️  Tarea vencida',
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

/**
 * Recupera y deserializa todos los proyectos almacenados en la base de datos.
 * @returns Arreglo de instancias de Proyecto obtenidas de la base de datos.
 */
async function obtenerTodosLosProyectos(): Promise<Proyecto[]> {
  const proyectos: Proyecto[] = []
  const consulta = DB.list<Proyecto>({ prefix: ['proyectos'] })

  for await (const proyecto of consulta) {
    proyectos.push(Proyecto.deserializar(proyecto))
  }

  return proyectos
}
