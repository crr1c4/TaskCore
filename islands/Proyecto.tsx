import { IconoAbrirMenu, IconoEditar, IconoEliminar, IconoEquipo, IconoTarea } from '../components/Iconos.tsx'
import { useSignal } from '@preact/signals'
// import { Proyecto } from '../utils/db/modelos/proyecto.ts'

import Proyecto from '../models/Proyecto.ts'


interface Props {
  proyecto: Proyecto
  rol: 'admin' | 'miembro'
}

// export interface Proyecto {
//   id: string
//   nombre: string
//   descripcion: string
//   fechaCreacion: Date
//   correoAdmin: string
//   correosIntegrantesEquipo: string[]

export function ComponenteProyecto({ rol, proyecto }: Props) {
  const mostrarMenu = useSignal(false)

  return (
    <div class='rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer select-none'>
      <div class='w-full h-full flex flex-col'>
        {/* Header */}
        <div class={`${rol === 'admin' ? 'bg-gradient-to-r from-blue-600 to-blue-500' : 'bg-gradient-to-r from-emerald-600 to-emerald-500'} p-4 flex justify-between items-center`}>
          <h3 class='text-white font-medium text-lg truncate pr-2'>
            {proyecto.nombre}
          </h3>

          {/* Menú de opciones */}
          <div class='relative'>
            <button
              onClick={() => mostrarMenu.value = !mostrarMenu.value}
              class='text-white/90 hover:text-white p-1 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/50'
              aria-label='Menú de opciones'
            >
              <IconoAbrirMenu  />
            </button>

            {mostrarMenu.value && (
              <div class='absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-10 overflow-hidden'>
                {rol === 'admin' ? (
                  <>
                    <a href={`/proyectos/editar/${proyecto.id}`} class='block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2'>
                      <IconoEditar />
                      Editar proyecto
                    </a>
                    <button class='w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2'>
                      <IconoEliminar />
                      Eliminar
                    </button>
                  </>
                ) : (
                  <button class='w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2'>
                    <IconoEliminar />
                    Darse de baja
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Contenido */}
        <a href={`/proyectos/${proyecto.id}`} class='p-4 flex flex-col flex-grow'>
          <p class='text-gray-600 dark:text-gray-300 mb-4 line-clamp-3'>
            {proyecto.descripcion || 'Sin descripción'}
          </p>
          
          {/* Stats */}
          <div class='flex justify-end items-center gap-4 mt-auto pt-2 border-t border-gray-100 dark:border-gray-700'>
            <div class='flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400'>
              <IconoEquipo  />
              <span>{proyecto.miembros.length} miembro{proyecto.miembros.length !== 1 ? 's' : ''}</span>
            </div>
            
            <div class='flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400'>
              <IconoTarea  />
              <span>{proyecto.tareas.length} tarea{proyecto.tareas.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}// }
