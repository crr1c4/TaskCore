import Anuncio from '../../models/Anuncio.ts'
import { Rol } from '../../models/Usuario.ts'
import { formatearFecha } from '../../utils/formato.ts'
import { IconoEliminar } from '../Iconos.tsx'

/**
 * Interfaz que define las propiedades del componente PanelAnuncio
 * @interface Props
 * @property {Anuncio} anuncio - El objeto anuncio a mostrar
 * @property {string} idProyecto - ID del proyecto al que pertenece el anuncio
 * @property {Rol} rol - Rol del usuario actual (para controlar permisos)
 */
interface Props {
  anuncio: Anuncio
  idProyecto: string
  rol: Rol
}

/**
 * Componente que muestra un panel con la información de un anuncio
 * @component
 * @param {Props} props - Propiedades del componente
 * @param {Anuncio} props.anuncio - Objeto anuncio a mostrar
 * @param {string} props.idProyecto - ID del proyecto relacionado
 * @param {Rol} props.rol - Rol del usuario actual
 */
export default function PanelAnuncio({ anuncio, idProyecto, rol }: Props) {
  return (
    <div class='p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg transition-colors duration-200 relative group'>
      {/* Botón de eliminar */}
      {rol === 'admin'
        ? (
          <a
            href={`/a/proyectos/${idProyecto}/anuncio/${anuncio.id}/eliminar`}
            class='absolute flex gap-2 text-xs items-center justify-center top-2 right-2 rounded-full bg-rose-100 hover:bg-rose-200 dark:bg-rose-900/30 dark:hover:bg-rose-900/50 text-rose-500 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 transition-colors duration-200 py-2 px-4'
            title='Eliminar anuncio'
          >
            <IconoEliminar /> Eliminar
          </a>
        )
        : ''}
      {/* Contenido del anuncio */}
      <h3 class='text-lg font-medium text-blue-800 dark:text-blue-200 pr-6'>{anuncio.titulo}</h3>
      <p class='mt-1 text-blue-700 dark:text-blue-300 text-pretty'>{anuncio.descripcion}</p>
      <time class='mt-2 block text-sm text-blue-600 dark:text-blue-400'>
        {formatearFecha(anuncio.fechaPublicacion)}
      </time>
    </div>
  )
}
