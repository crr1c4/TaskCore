import { PageProps } from '$fresh/server.ts'
import Encabezado from '../../../islands/EncabezadoPrincipal.tsx'

// Tareas específicas para una persona
const tareasPersonales = [
  { id: 2, nombre: 'Implementar autenticación', estado: 'en progreso', fecha: '05 abr. 2024' },
  { id: 6, nombre: 'Optimizar rendimiento', estado: 'en progreso', fecha: '07 abr. 2024' },
  { id: 8, nombre: 'Implementar CI/CD', estado: 'en progreso', fecha: '08 abr. 2024' },
  { id: 12, nombre: 'Pruebas de seguridad', estado: 'en progreso', fecha: '09 abr. 2024' },
]

// Anuncios relevantes
const anuncios = [
  {
    titulo: 'Reunión de revisión',
    contenido: 'Recordatorio: reunión de progreso mañana a las 10:00 AM para revisar las tareas en progreso',
    fecha: '08 abr. 2024',
  },
]

const proyecto = {
  nombre: 'Plataforma TaskCore',
  descripcion: 'Desarrollo de sistema de gestión de proyectos colaborativo',
  fechaCreacion: '15 mar. 2024',
}

export default function PaginaPersonal({ params }: PageProps) {

  return (
    <div class='min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200  pt-20 '>

      <Encabezado rol='miembro' />
      {/* Header */}
      <header class="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
        <div class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div class="mb-4 md:mb-0">
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{proyecto.nombre}</h1>
              <p class="mt-2 text-gray-600 dark:text-gray-300">{proyecto.descripcion}</p>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Creado el {proyecto.fechaCreacion}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main class='max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8'>
        <div class='space-y-8'>
          {/* Anuncios */}
          <section class='bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200'>
            <h2 class='text-xl font-semibold text-gray-900 dark:text-white mb-4'>Anuncios</h2>
            <div class='space-y-4'>
              {anuncios.map((anuncio, index) => (
                <div key={index} class='p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg transition-colors duration-200'>
                  <h3 class='text-lg font-medium text-blue-800 dark:text-blue-200'>{anuncio.titulo}</h3>
                  <p class='mt-1 text-blue-700 dark:text-blue-300'>{anuncio.contenido}</p>
                  <time class='mt-2 block text-sm text-blue-600 dark:text-blue-400'>{anuncio.fecha}</time>
                </div>
              ))}
            </div>
          </section>

          {/* Tareas Personales */}
          <section class='bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-colors duration-200'>
            <div class='p-6 border-b border-gray-200 dark:border-gray-700'>
              <h2 class='text-xl font-semibold text-gray-900 dark:text-white'>Tareas Asignadas</h2>
            </div>
            <div class='overflow-x-auto'>
              <table class='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
                <thead class='bg-gray-50 dark:bg-gray-700'>
                  <tr>
                    <th class='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                      Tarea
                    </th>
                    <th class='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                      Estado
                    </th>
                    <th class='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                      Fecha límite
                    </th>
                  </tr>
                </thead>
                <tbody class='bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700'>
                  {tareasPersonales.map((tarea) => (
                    <tr key={tarea.id} class='hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200'>
                      <td class='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100'>
                        {tarea.nombre}
                      </td>
                      <td class='px-6 py-4 whitespace-nowrap'>
                        <span
                          class={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            tarea.estado === 'completado'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                              : tarea.estado === 'en progreso'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                          }`}
                        >
                          {tarea.estado}
                        </span>
                      </td>
                      <td class='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400'>
                        {tarea.fecha}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
