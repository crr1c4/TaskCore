export function formatearFecha(fecha: string | Date): string {
  return new Date(fecha).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatearFechaYHora(fecha: string | Date): string {
  return new Date(fecha).toLocaleString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

// Función existente mejorada
export function tiempoRestanteDetallado(fechaFutura: string | Date): string {
  const ahora = new Date();
  const fecha = new Date(fechaFutura);
  const diffMs = fecha.getTime() - ahora.getTime();
  
  if (diffMs <= 0) return "Vencido";

  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHoras = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const diffMinutos = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  const partes = [];
  if (diffDias > 0) partes.push(`${diffDias} ${diffDias === 1 ? 'día' : 'días'}`);
  if (diffHoras > 0) partes.push(`${diffHoras} ${diffHoras === 1 ? 'hora' : 'horas'}`);
  if (diffMinutos > 0) partes.push(`${diffMinutos} ${diffMinutos === 1 ? 'minuto' : 'minutos'}`);

  return partes.join(', ') || "Menos de 1 minuto";
}
