import Anuncio from '../../models/Anuncio.ts'
import { Rol } from '../../models/Usuario.ts'
import { formatearFecha } from '../../utils/formato.ts'
import { IconoEliminar } from '../Iconos.tsx'

interface Props {
  anuncio: Anuncio
  idProyecto: string
  rol: Rol
}

export default function PanelAnuncio({ anuncio, idProyecto, rol }: Props) {
  return (
    <div class='p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg transition-colors duration-200 relative group'>
      {/* Botón de eliminar */}
      {rol === 'admin'
        ? (
          <a
            href={`/proyecto/${idProyecto}/anuncio/${anuncio.id}/eliminar`}
            class='absolute top-2 right-2 p-1 rounded-full bg-rose-100 hover:bg-rose-200 dark:bg-rose-900/30 dark:hover:bg-rose-900/50 text-rose-500 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 transition-colors duration-200 p-2'
            title='Eliminar anuncio'
          >
            <IconoEliminar />
          </a>
        )
        : ''}
      {/* Contenido del anuncio */}
      <h3 class='text-lg font-medium text-blue-800 dark:text-blue-200 pr-6'>{anuncio.titulo}</h3>
      <p class='mt-1 text-blue-700 dark:text-blue-300'>{anuncio.descripcion}</p>
      <time class='mt-2 block text-sm text-blue-600 dark:text-blue-400'>
        {formatearFecha(anuncio.fechaPublicacion)}
      </time>
    </div>
  )
}
