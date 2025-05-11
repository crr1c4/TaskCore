import {
  IconoAgregarProyecto,
  IconoCerrarSesion,
  IconoConfiguracion,
  IconoInicio,
  IconoNotificaciones,
  IconoUsuario,
} from '../components/Iconos.tsx'

import { useSignal } from '@preact/signals'
import { Rol } from '../models/Usuario.ts'

interface Props {
  rol: Rol
}

export default function NavBar({ rol }: Props) {
  const mostrarMenu = useSignal(false)

  return (
    <header class='fixed w-full h-16 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 z-40 flex items-center justify-between px-4 sm:px-6'>
      {/* Parte izquierda - Logo y botón de menú */}
      <a href="/a/" class='flex items-center h-full'>
        <div class='flex items-center gap-3 select-none'>
          <img
            src='/iconoTransparente.png'
            alt='Logo de la aplicación'
            class='h-10 w-auto object-contain'
          />
          <h1 class='text-xl font-bold tracking-tight'>
            TaskCore
            {rol === 'admin' && (
              <span class='ml-2 text-xs font-medium text-gray-500 dark:text-gray-400 hidden sm:inline-block'>
                Administrador
              </span>
            )}
          </h1>
        </div>
      </a>

      <div class='flex items-center gap-1 sm:gap-2 relative'>
        {rol === 'admin' && (
          <a
            href='/a/admin/crear-proyecto/'
            class='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200'
            aria-label='Crear proyecto'
          >
            <IconoAgregarProyecto />
          </a>
        )}

        <a
          href='/a/'
          class='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200'
          aria-label='Inicio'
        >
          <IconoInicio />
        </a>

        <button
          type='button'
          onClick={() => mostrarMenu.value = !mostrarMenu.value}
          class='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200'
          aria-label='Menú usuario'
        >
          <IconoUsuario />
        </button>

        {mostrarMenu.value && (
          <div class='absolute right-0 top-12 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 z-50 overflow-hidden animate-fade-in'>
            <a
              href='/a/notificaciones'
              class='flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150'
            >
              <IconoNotificaciones />
              Notificaciones
            </a>
            <a
              href='/a/configuracion'
              class='flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150'
            >
              <IconoConfiguracion />
              Configuración
            </a>
            <a
              href='/salir'
              class='flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 text-red-600 dark:text-red-400'
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
