import { FreshContext } from '$fresh/server.ts'
import NavBar from '../../../islands/NavBar.tsx'
import Anuncio from '../../../models/Anuncio.ts'
import Proyecto from '../../../models/Proyecto.ts'
import Tarea from '../../../models/Tarea.ts'
import Usuario from '../../../models/Usuario.ts'
import { formatearFecha } from '../../../utils/formato.ts'

export default async function PaginaProyecto(_request: Request, ctx: FreshContext<Usuario>) {
  const { id } = ctx.params

  const proyecto = await Proyecto.obtener(id)
  const tareas = await Promise.all(proyecto.tareas.map(async (idTarea) => await Tarea.obtener(idTarea)))
  const miembros = await Promise.all(proyecto.miembros.map(async (correo) => await Usuario.obtenerPorCorreo(correo)))
  const anuncios = await Promise.all(proyecto.anuncios.map(async (idAnuncio) => await Anuncio.obtener(idAnuncio)))

  console.log({ tareas, miembros, anuncios })

  const totalTareas = proyecto.tareas.length
  const estados = {
    completado: tareas.filter((tarea) => tarea.estado && !tarea.haExpirado()).length,
    enProgreso: tareas.filter((tarea) => !tarea.estado && !tarea.haExpirado()).length,
    expirado: tareas.filter((tarea) => !tarea.estado && tarea.haExpirado()).length,
  }

  const porcentajes = {
    completado: Math.round((estados.completado / totalTareas) * 100),
    enProgreso: Math.round((estados.enProgreso / totalTareas) * 100),
    expirado: Math.round((estados.expirado / totalTareas) * 100),
  }

  return (
    <div class={`${ctx.state.tema} min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200`}>
      <NavBar rol='admin' />

      {/* Header */}
      <header class='bg-white pt-20 dark:bg-gray-800 shadow-sm transition-colors duration-200'>
        <div class='max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8'>
          <div class='flex flex-col md:flex-row justify-between items-start md:items-center'>
            <div class='mb-4 md:mb-0'>
              <h1 class='text-3xl font-bold text-gray-900 dark:text-white'>{proyecto.nombre}</h1>
              <p class='mt-2 text-gray-600 dark:text-gray-300'>{proyecto.descripcion}</p>
              <p class='mt-1 text-sm text-gray-500 dark:text-gray-400'>
                Creado el {formatearFecha(proyecto.fechaCreacion)}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main class='max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8'>
        <div class='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Columna izquierda - Equipo y Resumen */}
          <div class='lg:col-span-1 space-y-6'>
            {/* Sección Equipo */}
            <section class='bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200'>
              <div class='flex justify-between items-center mb-4'>
                <h2 class='text-xl font-semibold text-gray-900 dark:text-white'>Equipo</h2>
                <button class='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200'>
                  <svg class='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                    />
                  </svg>
                </button>
              </div>
              <ul class='space-y-3'>
                {miembros.map((miembro) => (
                  <li
                    key={miembro.correo}
                    class='flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200'
                  >
                    <div class='flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center'>
                      <span class='text-blue-600 dark:text-blue-300 font-medium'>
                        {miembro.correo.toUpperCase()}
                      </span>
                    </div>
                    <div class='min-w-0'>
                      <p class='text-sm font-medium text-gray-900 dark:text-gray-100 truncate'>{miembro.correo}</p>
                      <p class='text-sm text-gray-500 dark:text-gray-400'>{miembro.rol}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Sección Resumen con Gráfica */}
            <section class='bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200'>
              <h2 class='text-xl font-semibold text-gray-900 dark:text-white mb-4'>Resumen de Progreso</h2>

              {/* Gráfica circular */}
              <div class='flex items-center justify-center mb-6'>
                <div class='relative w-40 h-40'>
                  <div class='absolute inset-0'>
                    <div
                      class='absolute w-full h-full rounded-full border-8 border-white dark:border-gray-800'
                      style={{
                        background: `conic-gradient(
                          #10B981 0 ${porcentajes.completado}%,
                          #3B82F6 ${porcentajes.completado}% ${porcentajes.completado + porcentajes.enProgreso}%,
                          #EF4444 ${porcentajes.completado + porcentajes.enProgreso}% 100%
                        )`,
                      }}
                    >
                    </div>
                  </div>
                  <div class='absolute inset-0 flex items-center justify-center'>
                    <span class='text-xl font-bold text-gray-700 dark:text-gray-200'>
                      {totalTareas}
                    </span>
                  </div>
                </div>
              </div>

              {/* Leyenda con porcentajes */}
              <div class='space-y-3'>
                <div class='flex items-center justify-between'>
                  <div class='flex items-center'>
                    <div class='w-3 h-3 bg-green-500 rounded-full mr-2'></div>
                    <span class='text-sm dark:text-gray-300'>Completado</span>
                  </div>
                  <span class='text-sm font-medium dark:text-gray-300'>{porcentajes.completado}%</span>
                </div>
                <div class='flex items-center justify-between'>
                  <div class='flex items-center'>
                    <div class='w-3 h-3 bg-blue-500 rounded-full mr-2'></div>
                    <span class='text-sm dark:text-gray-300'>En Progreso</span>
                  </div>
                  <span class='text-sm font-medium dark:text-gray-300'>{porcentajes.enProgreso}%</span>
                </div>
                <div class='flex items-center justify-between'>
                  <div class='flex items-center'>
                    <div class='w-3 h-3 bg-red-500 rounded-full mr-2'></div>
                    <span class='text-sm dark:text-gray-300'>Expirado</span>
                  </div>
                  <span class='text-sm font-medium dark:text-gray-300'>{porcentajes.expirado}%</span>
                </div>
              </div>
            </section>
          </div>

          {/* Columna derecha - Contenido */}
          <div class='lg:col-span-2 space-y-6'>
            {/* Anuncios */}
            <section class='bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200'>
              <div class='flex justify-between items-center mb-4'>
                <h2 class='text-xl font-semibold text-gray-900 dark:text-white'>Últimos anuncios</h2>
                <button class='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200'>
                  <svg class='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                    />
                  </svg>
                </button>
              </div>
              <div class='space-y-4'>
                {anuncios.map((anuncio) => (
                  <div class='p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg transition-colors duration-200'>
                    <h3 class='text-lg font-medium text-blue-800 dark:text-blue-200'>{anuncio.titulo}</h3>
                    <p class='mt-1 text-blue-700 dark:text-blue-300'>{anuncio.descripcion}</p>
                    <time class='mt-2 block text-sm text-blue-600 dark:text-blue-400'>{formatearFecha(anuncio.fechaPublicacion)}</time>
                  </div>
                ))}
              </div>
            </section>

            {/* Tareas */}
            <section class='bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-colors duration-200'>
              <div class='p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center'>
                <h2 class='text-xl font-semibold text-gray-900 dark:text-white'>Tareas del proyecto</h2>
                <button class='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200'>
                  <svg class='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                    />
                  </svg>
                </button>
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
                    {tareas.map((tarea) => (
                      <tr class='hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200'>
                        <td class='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100'>
                          {tarea.nombre}
                        </td>
                        <td class='px-6 py-4 whitespace-nowrap'>
                          <span
                            class={`px-2.5 py-1 rounded-full text-xs font-medium ${
                              tarea.estado && !tarea.haExpirado()
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                : tarea.estado && !tarea.haExpirado()
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                                : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                            }`}
                          >
                            {tarea.estado ? 'Completado' : tarea.haExpirado() ? 'Caducado' : 'En progreso'}
                          </span>
                        </td>
                        <td class='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400'>
                          {formatearFecha(tarea.fechaExpiracion)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
