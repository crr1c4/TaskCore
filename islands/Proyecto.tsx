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
// }

export function ComponenteProyecto({ rol, proyecto }: Props) {
  const mostrarMenu = useSignal(false)

  return (
    <div class='rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer select-none'>
      <div class='w-full h-full flex flex-col items-stretch'>
        <div class={`bg-${rol === 'admin' ? 'sky-500' : 'emerald-400'} p-4 flex justify-between items-center`}>
          <div class='text-white font-semibold text-lg flex items-center'>
            {proyecto.nombre}
          </div>

          <div class='relative'>
            <div
              onClick={() => mostrarMenu.value = !mostrarMenu.value}
              class='text-white hover:bg-white/20 p-1 rounded-full'
              aria-label='Menú de opciones'
            >
              <IconoAbrirMenu />
            </div>

            {mostrarMenu.value && (
              <div class='absolute right-0 w-48 rounded-md shadow-lg z-10 dark:bg-slate-900 dark:text-white bg-white'>
                {rol === 'admin'
                  ? (
                    <>
                      <div class='w-full rounded-md text-left px-4 py-2 text-sm dark:hover:bg-slate-800 hover:bg-gray-50 flex items-center gap-2'>
                        <IconoEditar />
                        Editar
                      </div>

                      <div class='w-full rounded-md text-left px-4 py-2 text-sm dark:hover:bg-slate-800 hover:bg-gray-50 flex items-center gap-2'>
                        <IconoEliminar />
                        Eliminar
                      </div>
                    </>
                  )
                  : (
                    <div class='w-full rounded-md text-left px-4 py-2 text-sm dark:hover:bg-slate-800 hover:bg-gray-50 flex items-center gap-2'>
                      <IconoEliminar />
                      Darse de baja
                    </div>
                  )}
              </div>
            )}
          </div>
        </div>

        <div class='p-4 flex flex-col items-stretch justify-between h-full dark:bg-slate-900 dark:text-white'>
          <p>{proyecto.descripcion}</p>
          <div class='flex w-full justify-end items-center gap-4'>
            <div class='text-sm flex items-center justify-center flex-col'>
              <IconoEquipo /> {/*proyecto.correosIntegrantesEquipo.length*/}
            </div>

            <div class='text-sm flex items-center justify-center flex-col'>
              <IconoTarea />
              {Math.round(Math.random() * 100 % 10)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
