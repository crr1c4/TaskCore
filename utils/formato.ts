/**
 * Formatea una fecha en formato legible para México.
 * Ejemplo: "15 de octubre de 2023"
 * 
 * @param {string|Date} fecha - Fecha a formatear (puede ser string o objeto Date)
 * @returns {string} Fecha formateada en formato largo
 */
export function formatearFecha(fecha: string | Date): string {
  return new Date(fecha).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Formatea fecha y hora en formato legible para México.
 * Ejemplo: "15 de octubre de 2023, 08:30 PM"
 * 
 * @param {string|Date} fecha - Fecha a formatear (puede ser string o objeto Date)
 * @returns {string} Fecha y hora formateadas en formato largo
 */
export function formatearFechaYHora(fecha: string | Date): string {
  return new Date(fecha).toLocaleString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

/**
 * Calcula y formatea el tiempo restante hasta una fecha futura con detalle.
 * Devuelve el tiempo en días, horas y minutos cuando corresponde.
 * 
 * @param {string|Date} fechaFutura - Fecha objetivo para calcular el tiempo restante
 * @returns {string} Tiempo restante formateado o "Vencido" si ya pasó la fecha
 * @example 
 * // Devuelve "2 días, 5 horas, 30 minutos"
 * formatearTiempoRestanteDetallado(nuevaFechaFutura)
 */
export function formatearTiempoRestanteDetallado(fechaFutura: string | Date): string {
  const ahora = new Date()
  const fecha = new Date(fechaFutura)
  const diffMs = fecha.getTime() - ahora.getTime()

  if (diffMs <= 0) return 'Vencido'

  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffHoras = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const diffMinutos = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

  const partes = []
  if (diffDias > 0) partes.push(`${diffDias} ${diffDias === 1 ? 'día' : 'días'}`)
  if (diffHoras > 0) partes.push(`${diffHoras} ${diffHoras === 1 ? 'hora' : 'horas'}`)
  if (diffMinutos > 0) partes.push(`${diffMinutos} ${diffMinutos === 1 ? 'minuto' : 'minutos'}`)

  return partes.join(', ') || 'Menos de 1 minuto'
}

/**
 * Formatea el tiempo restante de manera concisa (horas o días).
 * Versión simplificada para interfaces donde el espacio es limitado.
 * 
 * @param {Date} fecha - Fecha objetivo para calcular el tiempo restante
 * @returns {string} Tiempo restante en formato compacto o "Expirado"
 * @example
 * // Devuelve "Expira en 5 h" (para menos de 24 horas)
 * // Devuelve "Expira en 3 días" (para más de 24 horas)
 */
export function formatearTiempoRestante(fecha: Date): string {
  const ahora = new Date()
  const diff = fecha.getTime() - ahora.getTime()

  if (diff <= 0) return 'Expirado'

  const horas = Math.floor(diff / (1000 * 60 * 60))
  if (horas < 24) return `Expira en ${horas} h`

  const dias = Math.floor(horas / 24)
  return `Expira en ${dias} día${dias !== 1 ? 's' : ''}`
}
