import { IconoAgregarProyecto, IconoCerrarSesion, IconoConfiguracion, IconoUsuario } from '../components/Iconos.tsx'

import { useSignal } from '@preact/signals'

interface Props {
  rol: 'admin' | 'miembro'
}

export default function EncabezadoPrincipal({ rol }: Props) {
  const mostrarMenu = useSignal(false)

  // Determinar la imagen de usuario según el rol
  return (
    <header class='fixed w-full h-20 bg-white dark:bg-slate-950 text-gray-900 dark:text-white shadow-md z-40 flex items-center justify-between px-4'>
      {/* Parte izquierda - Logo y botón de menú */}
      <div class='flex items-center h-full'>
        <div class='ml-4 h-full p-2 flex items-center gap-2 select-none'>
          <img
            src='/iconoTransparente.png'
            alt='Logo de la aplicación'
            class='h-full object-contain'
          />
          <h1 class='text-2xl font-bold'>
            TaskCore{' '}
            {rol === 'admin' && (
              <span class='text-black/50 dark:text-white text-sm capitalize hidden md:block'>adminstrador</span>
            )}
          </h1>
        </div>
      </div>

      <div class='flex gap-2'>
        {rol === 'admin' && (
          <div class='p-2 rounded-full hover:bg-gray-300 dark:hover:bg-slate-700 transition-colors hover:cursor-pointer'>
            <a href='/usuario/admin/crear-proyecto/'>
              <IconoAgregarProyecto />
            </a>
          </div>
        )}

        <div
          class='p-2 rounded-full hover:bg-gray-300 dark:hover:bg-slate-700 transition-colors hover:cursor-pointer'
          onClick={() => mostrarMenu.value = !mostrarMenu.value}
        >
          <IconoUsuario />
        </div>

        {mostrarMenu.value && (
          <div class='absolute right-0 top-14 w-48 bg-white dark:bg-slate-900 rounded-md shadow-lg z-50 select-none'>
            <a
              href='/usuario/configuracion'
              class='w-full px-4 text-left py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center gap-2 rounded-t-md'
            >
              <IconoConfiguracion />
              Configuración
            </a>

            <a
              href='/salir'
              class='w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center gap-2 rounded-b-md'
            >
              <IconoCerrarSesion />
              Salir
            </a>
          </div>
        )}
      </div>
    </header>
  )
}
