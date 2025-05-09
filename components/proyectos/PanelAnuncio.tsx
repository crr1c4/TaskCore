import Anuncio from '../../models/Anuncio.ts'
import { formatearFecha } from '../../utils/formato.ts'

interface Props { 
  anuncio: Anuncio
}


export default function PanelAnuncio({ anuncio }: Props) {
  return (
    <div class='p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg transition-colors duration-200'>
      <h3 class='text-lg font-medium text-blue-800 dark:text-blue-200'>{anuncio.titulo}</h3>
      <p class='mt-1 text-blue-700 dark:text-blue-300'>{anuncio.descripcion}</p>
      <time class='mt-2 block text-sm text-blue-600 dark:text-blue-400'>
        {formatearFecha(anuncio.fechaPublicacion)}
      </time>
    </div>
  )
}
