import { IconoAgregarProyecto, IconoCerrarSesion, IconoConfiguracion, IconoUsuario } from '../components/Iconos.tsx'

import { useSignal } from '@preact/signals'

interface Props {
  rol: 'admin' | 'miembro'
}

export default function Menu({ rol }: Props) {
  const mostrarMenu = useSignal(false)

  // Determinar la imagen de usuario según el rol
  return (
    <header class='fixed top-0 left-0 right-0 h-20 bg-white shadow-md z-40 flex items-center justify-between px-4'>
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
            {rol === 'admin' && <span class='text-black/50 text-sm capitalize hidden md:block'>adminstrador</span>}
          </h1>
        </div>
      </div>

      <div class='flex gap-2'>
        {rol === 'admin' && (
          <div class='p-2 rounded-full bg-white text-black hover:bg-sky-500 transition-colors'>
            <a href='/usurio/admin/crear-proyecto/'>
              <IconoAgregarProyecto />
            </a>
          </div>
        )}

        <div
          class='p-2 rounded-full bg-white text-black hover:bg-sky-500 transition-colors'
          onClick={() => mostrarMenu.value = !mostrarMenu.value}
        >
          <IconoUsuario />
        </div>

        {mostrarMenu.value && (
          <div class='absolute right-0 top-14 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200 select-none'>
            <a
              href='/usuario/configuracion'
              class='w-full px-4 text-left py-2 text-sm text-gray-900 hover:bg-gray-100 flex items-center gap-2'
            >
              <IconoConfiguracion />
              Configuración
            </a>

            <a
              href='/salir'
              class='w-full text-left px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 flex items-center gap-2'
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
