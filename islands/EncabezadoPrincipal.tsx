import {
  IconoAgregarProyecto,
  IconoCerrarSesion,
  IconoConfiguracion,
  IconoInicio,
  IconoNotificaciones,
  IconoUsuario,
} from '../components/Iconos.tsx'
import { useSignal } from '@preact/signals'

interface Props {
  rol: 'admin' | 'miembro'
}

export default function EncabezadoPrincipal({ rol }: Props) {
  const mostrarMenu = useSignal(false)

  return (
    <header class='fixed top-0 left-0 w-full h-20 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm border-b border-gray-100 dark:border-slate-800 text-gray-900 dark:text-white shadow-sm z-40 flex items-center justify-between px-4 md:px-6'>
      {/* Parte izquierda - Logo y título */}
      <div class='flex items-center h-full'>
        <div class='ml-2 md:ml-4 h-full p-2 flex items-center gap-3 select-none'>
          <img
            src='/iconoTransparente.png'
            alt='Logo de la aplicación'
            class='h-12 w-auto object-contain transition-all duration-200 hover:scale-105'
          />
          <h1 class='text-xl md:text-2xl font-extrabold tracking-tight flex items-center gap-2'>
            TaskCore
            {rol === 'admin' && (
              <span class='px-2 py-1 bg-blue-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full uppercase hidden md:inline-block'>
                Administrador
              </span>
            )}
          </h1>
        </div>
      </div>

      {/* Parte derecha - Iconos */}
      <div class='flex items-center gap-1 md:gap-2 relative'>
        {rol === 'admin' && (
          <div class='p-2.5 rounded-lg hover:bg-gray-100/50 dark:hover:bg-slate-800/50 transition-all duration-200 hover:cursor-pointer active:scale-95'>
            <a href='/usuario/admin/crear-proyecto/' class='flex items-center'>
              <IconoAgregarProyecto />
            </a>
          </div>
        )}

        <div class='p-2.5 rounded-lg hover:bg-gray-100/50 dark:hover:bg-slate-800/50 transition-all duration-200 hover:cursor-pointer active:scale-95'>
          <a href={`/usuario/${rol}`} class='flex items-center'>
            <IconoInicio />
          </a>
        </div>

        <div
          class='p-2.5 rounded-lg hover:bg-gray-100/50 dark:hover:bg-slate-800/50 transition-all duration-200 hover:cursor-pointer active:scale-95'
          onClick={() => mostrarMenu.value = !mostrarMenu.value}
        >
          <IconoUsuario />
        </div>

        {mostrarMenu.value && (
          <div class='absolute right-0 top-14 w-48 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-gray-100 dark:border-slate-800 z-50 select-none overflow-hidden'>
            <a
              href='/usuario/configuracion'
              class='w-full px-3 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-2 transition-colors duration-200'
            >
              <IconoConfiguracion />
              Configuración
            </a>
            <a
              href='/usuario/notificaciones'
              class='w-full px-3 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-2 transition-colors duration-200 border-t border-gray-100 dark:border-slate-800'
            >
              <IconoNotificaciones />
              Notificaciones
            </a>
            <a
              href='/salir'
              class='w-full px-3 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-2 transition-colors duration-200 border-t border-gray-100 dark:border-slate-800'
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
