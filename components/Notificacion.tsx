import Notificacion from '../models/Notificacion.ts'
import { formatearFechaYHora } from '../utils/formato.ts'
import { IconoAdvertencia, IconoChat, IconoNotificaciones, } from './Iconos.tsx'


/**
 * Propiedades para el componente CartaNotificacion
 * @interface Props
 * @property {Notificacion} notificacion - Objeto con los datos de la notificación a mostrar
 */
interface Props {
  notificacion: Notificacion
}

/**
 * Componente que muestra una notificación estilizada según su tipo
 * @component
 * @param {Props} props - Propiedades del componente
 * @param {Notificacion} props.notificacion - Datos de la notificación
 * @returns Tarjeta de notificación con:
 * - Borde lateral colorido según tipo
 * - Icono correspondiente al tipo
 * - Estilos para modo claro/oscuro
 * - Indicador visual si está próxima a expirar
 * - Fecha de recepción formateada
 * @description
 * Componente que renderiza una notificación con:
 * - Diferentes estilos según tipo (advertencia, comentario, etc.)
 * - Indicador visual cuando faltan menos de 24 horas para expirar
 * - Integración con el sistema de iconos
 * - Soporte completo para dark mode
 * - Efectos hover y transiciones
 * @example
 * <CartaNotificacion notificacion={notificacion} />
 */
export default function CartaNotificacion({ notificacion }: Props) {
  // Calcular si la notificación está próxima a expirar
  const horasRestantes = Math.floor(
    (notificacion.fechaExpiracion.getTime() - Date.now()) / (1000 * 60 * 60),
  )
  const estaPorExpiar = horasRestantes < 24
  const tipo = notificacion.tipo

  return (
    <div
      class={`
      relative overflow-hidden
      border-l-4 ${
        tipo === 'advertencia'
          ? 'border-red-500'
          : tipo === 'comentario'
          ? 'border-blue-500'
          : tipo === 'recordatorio'
          ? 'border-yellow-500'
          : 'border-green-500'
      }
      rounded-lg shadow-sm
      bg-white dark:bg-gray-800
      hover:shadow-md transition-all duration-200
      ${estaPorExpiar ? 'ring-1 ring-yellow-500/50' : ''}
    `}
    >
      {/* Indicador de tiempo */}
      <div class='p-4'>
        <div class='flex justify-between items-start gap-3'>
          <div class='flex-1 dark:text-white'>
            <div class='flex items-center gap-3 mb-2'>
              {tipo === 'advertencia' && <IconoAdvertencia />}
              {tipo === 'comentario' && <IconoChat />}
              {tipo === 'recordatorio' && <IconoNotificaciones />}
              {tipo === 'aviso' && <IconoNotificaciones />}

              <h3 class='text-lg font-semibold text-gray-900 dark:text-white'>
                {notificacion.titulo}
              </h3>
            </div>

            <p class='text-gray-600 dark:text-gray-300 mb-3'>
              {notificacion.contenido}
            </p>

            <div class='text-xs text-gray-500 dark:text-gray-400'>
              Recibido: {formatearFechaYHora(notificacion.fechaCreacion)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
