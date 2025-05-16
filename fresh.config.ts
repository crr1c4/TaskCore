import { defineConfig } from '$fresh/server.ts'
import tailwind from '$fresh/plugins/tailwind.ts'
import { verificarTareasProximas, verificarTareasVencidas } from './models/mod.ts'

if (!Deno.args.includes('build')) {
  /**
   * Configuración de tareas programadas (cron jobs) para:
   * - Verificación periódica de tareas próximas a vencer
   * - Verificación de tareas vencidas
   *
   * Las tareas se ejecutan cada hora para mantener actualizados los estados
   * de las tareas en el sistema.
   */

  /**
   * Tarea programada para verificar tareas próximas a su fecha límite.
   * Se ejecuta cada hora y marca las tareas que están por vencer.
   *
   * @example
   * // Ejecución programada cada hora:
   * // 12:00, 13:00, 14:00, etc.
   */
  Deno.cron('Ejecutando verificacion de tareas proximas', { hour: { every: 1 } }, async () => {
    await verificarTareasProximas()
  })

  /**
   * Tarea programada para verificar tareas vencidas.
   * Se ejecuta cada hora y actualiza el estado de tareas no completadas
   * que han superado su fecha límite.
   *
   * @example
   * // Ejecución programada cada hora:
   * // 12:00, 13:00, 14:00, etc.
   */
  Deno.cron('Ejecutando verificacion de tareas vencidas', { hour: { every: 1 } }, async () => {
    await verificarTareasVencidas()
  })
}

export default defineConfig({
  plugins: [tailwind()],
})
