import { FreshContext } from '$fresh/server.ts'
import { BotonPrincipal } from '../../../components/Boton.tsx'
import { IconoEquipo } from '../../../components/Iconos.tsx'
import { CampoIngreso } from '../../../components/Input.tsx'
import NavBar from '../../../islands/NavBar.tsx'
import Usuario from '../../../models/Usuario.ts'

export default function PaginaCrearProyecto(ctx: FreshContext<Usuario>) {
  return (
    <div class={`min-h-screen ${ctx.state.tema} dark:bg-gray-900 bg-gray-50`}>
      {/* Panel principal */}
      <NavBar rol={ctx.state.rol} />
      <main class='px-4 sm:px-6 lg:px-8 py-24 max-w-7xl mx-auto'>
        <div class='text-center mb-12'>
          <h1 class='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2'>
            Crear nuevo proyecto
          </h1>
          <p class='text-lg text-gray-600 dark:text-gray-300'>
            Configura los detalles de tu nuevo proyecto y agrega miembros
          </p>
        </div>

        <div class='space-y-8 max-w-3xl mx-auto'>
          {/* Sección de agregar miembros */}
          <div class='bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700'>
            <div class='flex flex-col sm:flex-row items-start sm:items-center gap-4'>
              <div class='w-full sm:w-auto'>
                <h2 class='text-xl font-semibold text-gray-800 dark:text-gray-200'>
                  Agregar miembro
                </h2>
                <p class='text-sm text-gray-500 dark:text-gray-400 mt-1'>
                  Ingresa el correo del usuario
                </p>
              </div>
              <div class='flex-1 w-full flex gap-3'>
                <CampoIngreso 
                  label='Correo electrónico' 
                  class='flex-1'
                  placeholder='usuario@ejemplo.com'
                />
                <BotonPrincipal >
                  Agregar
                </BotonPrincipal>
              </div>
            </div>
          </div>

          {/* Sección de resumen */}
          <div class='bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700'>
            <div class='flex items-center gap-3 mb-6'>
              <IconoEquipo />
              <h2 class='text-xl font-semibold text-gray-800 dark:text-gray-200'>
                Miembros del proyecto
              </h2>
            </div>
            
            <div class='flex flex-wrap gap-2'>
              {[
                'miembro@correo.com',
                'miembro_correo_largo@correo.com',
                'otro.miembro@correo.com',
                'miembro_correo_largo@correo.com',
                'miembro_correo_largo@correo.com',
                'miembro@correo.com',
                'otro.miembro@correo.com'
              ].map((email) => (
                <div class='rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 py-1.5 px-4 text-sm flex items-center gap-2'>
                  {email}
                  <button class='text-blue-500 hover:text-blue-700 dark:hover:text-blue-400'>
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Botón de creación */}
          <div class='flex justify-center pt-4'>
            <BotonPrincipal>
              Crear proyecto
            </BotonPrincipal>
          </div>
        </div>
      </main>
    </div>
  )
}
