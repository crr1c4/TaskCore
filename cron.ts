import { verificarTareasProximas, verificarTareasVencidas } from "./models/mod.ts";

// Programar las verificaciones cada hora
Deno.cron("Ejecutando verificacion de tareas proximas", { hour: { every: 12 } }, async () => {
  await verificarTareasProximas();
});

Deno.cron("Ejecutando verificacion de tareas vencidas", { hour: { every: 12 } }, async () => {
  await verificarTareasVencidas();
});
