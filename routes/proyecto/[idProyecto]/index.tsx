import { FreshContext } from '$fresh/server.ts'
import { Boton, BotonEmergencia } from '../../../components/Boton.tsx'
import PanelAnuncio from '../../../components/proyectos/PanelAnuncio.tsx'
import NavBar from '../../../islands/NavBar.tsx'
import Anuncio from '../../../models/Anuncio.ts'
import Proyecto from '../../../models/Proyecto.ts'
import Tarea from '../../../models/Tarea.ts'
import Usuario from '../../../models/Usuario.ts'
import { formatearFecha } from '../../../utils/formato.ts'

export default async function PaginaProyecto(_request: Request, ctx: FreshContext<Usuario>) {
  const { idProyecto } = ctx.params
  const error = ctx.url.searchParams.get('error')
  const mensaje = ctx.url.searchParams.get('mensaje')

  const proyecto = await Proyecto.obtener(idProyecto)
  const tareas = await Promise.all(proyecto.tareas.map(async (idTarea) => await Tarea.obtener(idTarea)))
  const miembros = await Promise.all(proyecto.miembros.map(async (correo) => await Usuario.obtenerPorCorreo(correo)))
  const anuncios = await Promise.all(proyecto.anuncios.map(async (idAnuncio) => await Anuncio.obtener(idAnuncio)))

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

      {/* Mensajes de estado */}
      {error && (
        <div class='mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-md'>
          {decodeURIComponent(error)}
        </div>
      )}

      {mensaje && (
        <div class='mb-6 p-4 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-md flex items-center gap-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            class='h-5 w-5'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fill-rule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
              clip-rule='evenodd'
            />
          </svg>
          {decodeURIComponent(mensaje)}
        </div>
      )}

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

            {/* Botón de editar */}
            <div class='flex items-center gap-2'>
              <a
                href={`/proyectos/editar/${proyecto.id}`}
              >
                <Boton>
                  <svg class='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                    />
                  </svg>
                  Editar
                </Boton>
              </a>

              <a
                href={`/proyectos/eliminar/${proyecto.id}`}
              >
                <BotonEmergencia>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    class='w-5 h-5'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                    />
                  </svg>
                  Borrar
                </BotonEmergencia>
              </a>
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
                  <span class='text-sm font-medium dark:text-gray-300'>{porcentajes.completado || '0.0'}%</span>
                </div>
                <div class='flex items-center justify-between'>
                  <div class='flex items-center'>
                    <div class='w-3 h-3 bg-blue-500 rounded-full mr-2'></div>
                    <span class='text-sm dark:text-gray-300'>En Progreso</span>
                  </div>
                  <span class='text-sm font-medium dark:text-gray-300'>{porcentajes.enProgreso || '0.0'}%</span>
                </div>
                <div class='flex items-center justify-between'>
                  <div class='flex items-center'>
                    <div class='w-3 h-3 bg-red-500 rounded-full mr-2'></div>
                    <span class='text-sm dark:text-gray-300'>Expirado</span>
                  </div>
                  <span class='text-sm font-medium dark:text-gray-300'>{porcentajes.expirado || '0.0'}%</span>
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
                {ctx.state.rol
                  ? (
                    <a
                      href={`/proyecto/${idProyecto}/anuncio/crear`}
                      class='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200'
                    >
                      <svg class='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                        />
                      </svg>
                    </a>
                  )
                  : ''}
              </div>
              <div class='space-y-4'>
                {anuncios.map((anuncio) => (
                  <PanelAnuncio key={anuncio.id} anuncio={anuncio} idProyecto={idProyecto} rol={ctx.state.rol} />
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
