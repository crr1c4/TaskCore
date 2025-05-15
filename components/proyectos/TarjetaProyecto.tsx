import { IconoEquipo, IconoTarea } from '../Iconos.tsx'
import Proyecto from '../../models/Proyecto.ts'
import { Rol } from '../../models/Usuario.ts'

/**
 * Interfaz que define las propiedades del componente ComponenteProyecto
 * @interface Props
 * @property {Proyecto} proyecto - Objeto proyecto que contiene los datos a mostrar
 * @property {Rol} rol - Rol del usuario actual (determina el estilo y la información mostrada)
 * @property {number} numeroTareas - Cantidad de tareas asociadas al proyecto
 */
interface Props {
  proyecto: Proyecto
  rol: Rol
  numeroTareas: number
}

/**
 * Componente que muestra una tarjeta resumen de un proyecto con información básica
 * @component
 * @param {Props} props - Propiedades del componente
 * @param {Proyecto} props.proyecto - Datos del proyecto a mostrar
 * @param {Rol} props.rol - Rol del usuario actual (admin o miembro)
 * @param {number} props.numeroTareas - Número total de tareas del proyecto
 * @returns Tarjeta interactiva con información del proyecto, incluyendo:
 *                       - Nombre del proyecto (header con color según rol)
 *                       - Descripción (recortada si es muy larga)
 *                       - Estadísticas de miembros y tareas (solo visible para admins)
 */
export default function ComponenteProyecto({ rol, proyecto, numeroTareas }: Props) {
  return (
    <a
      href={`/a/proyectos/${proyecto.id}`}
      class='rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer select-none'
    >
      <div class='w-full h-full flex flex-col'>
        {/* Header */}
        <div
          class={`${
            rol === 'admin'
              ? 'bg-gradient-to-r from-blue-600 to-blue-500'
              : 'bg-gradient-to-r from-emerald-600 to-emerald-500'
          } p-4 flex justify-between items-center`}
        >
          <h3 class='text-white font-medium text-lg truncate pr-2'>
            {proyecto.nombre}
          </h3>
        </div>

        {/* Contenido */}
        <div class='p-4 flex flex-col flex-grow'>
          <p class='text-gray-600 dark:text-gray-300 mb-4 line-clamp-3'>
            {proyecto.descripcion || 'Sin descripción'}
          </p>

          {/* Stats */}
          {rol === 'admin'
            ? (
              <div class='flex justify-end items-center gap-4 mt-auto pt-2 border-t border-gray-100 dark:border-gray-700'>
                <div class='flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400'>
                  <IconoEquipo />
                  <span>{proyecto.integrantes.length} miembro{proyecto.integrantes.length !== 1 ? 's' : ''}</span>
                </div>

                <div class='flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400'>
                  <IconoTarea />
                  <span>{numeroTareas} tarea{numeroTareas !== 1 ? 's' : ''}</span>
                </div>
              </div>
            )
            : ''}
        </div>
      </div>
    </a>
  )
}
