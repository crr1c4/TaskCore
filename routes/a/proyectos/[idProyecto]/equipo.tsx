// routes/proyectos/[idProyecto]/equipo.tsx
import { FreshContext, Handlers } from '$fresh/server.ts'
import { Boton } from '../../../../components/Boton.tsx'
import { IconoVolver } from '../../../../components/Iconos.tsx'
import { Input } from '../../../../components/Input.tsx'
import { ModalError, ModalLink } from '../../../../islands/Modal.tsx'
import NavBar from '../../../../islands/NavBar.tsx'
import Proyecto from '../../../../models/Proyecto.ts'
import Usuario from '../../../../models/Usuario.ts'

export const handler: Handlers = {
  async POST(req, ctx) {
    const { idProyecto } = ctx.params
    const formData = await req.formData()
    const accion = formData.get('accion')
    const correo = formData.get('correo')?.toString()

    try {
      const proyecto = await Proyecto.obtener(idProyecto)
      if (accion === 'agregar' && correo) {
        await proyecto.agregarIntegrante(correo)
      } else if (accion === 'eliminar' && correo) {
        await proyecto.eliminarIntegrante(correo)
      }

      const params = new URLSearchParams({
        mensaje: 'Integrante agregado correctamente.',
      })

      return new Response(null, {
        status: 303,
        headers: { Location: `/a/proyectos/${idProyecto}/equipo?${params.toString()}` },
      })
    } catch (error) {
      const e = error as Error
      return new Response(null, {
        status: 303,
        headers: {
          Location: `/a/proyectos/${idProyecto}/equipo?error=${encodeURIComponent(e.message)}`,
        },
      })
    }
  },
  GET(_req, ctx) {
    // Si el usuario es administrador, se permite continuar con la petición.
    if (ctx.state.rol === 'admin') return ctx.next()

    // Si el usuario no es admin, se redirige a la ruta de "miembro".
    return new Response(null, {
      status: 301, // Redirección permanente
      headers: { Location: '/a/' },
    })
  },
}

export default async function GestionEquipo(_req: Request, ctx: FreshContext<Usuario>) {
  const { idProyecto } = ctx.params
  const proyecto = await Proyecto.obtener(idProyecto)

  const url = new URL(ctx.url)
  const error = url.searchParams.get('error')
  const mensaje = url.searchParams.get('mensaje')

  return (
    <div class={`${ctx.state.tema} min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300`}>
      {/* Mensajes de estado */}
      {error && <ModalError mensaje={error} />}
      {mensaje && (
        <ModalLink
          mensaje={mensaje}
          enlace={`/a/proyectos/${idProyecto}/equipo`}
          textoEnlace='Aceptar'
        />
      )}

      <NavBar rol='admin' />

      {/* Header */}
      <header class='pt-20 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300'>
        <div class='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div class='flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>
            <div>
              <h1 class='text-3xl font-bold text-gray-900 dark:text-white tracking-tight'>
                Gestión de Equipo
              </h1>
              <p class='mt-2 text-gray-600 dark:text-gray-300'>
                Administra los miembros del proyecto:{' '}
                <span class='font-medium text-indigo-600 dark:text-indigo-400'>{proyecto.nombre}</span>
              </p>
            </div>
            <a
              href={`/a/proyectos/${idProyecto}`}
            >
              <Boton>
                <IconoVolver />
                Volver
              </Boton>
            </a>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main class='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
        {/* Formulario para agregar miembros */}
        <section class='bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-colors duration-300'>
          <div class='p-6 border-b border-gray-200 dark:border-gray-700'>
            <h2 class='text-xl font-semibold text-gray-900 dark:text-white'>Agregar nuevo miembro</h2>
            <p class='mt-1 text-sm text-gray-500 dark:text-gray-400'>Agrega a nuevos colaboradores al proyecto</p>
          </div>
          <div class='p-6'>
            <form method='POST' class='flex flex-col sm:flex-row gap-4'>
              <div class='flex-grow'>
                <input type='hidden' name='accion' value='agregar' />
                <Input
                  label='Correo electrónico'
                  type='email'
                  name='correo'
                  required
                  placeholder='correo@ejemplo.com'
                />
              </div>
              <Boton>
                <svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 mr-2' viewBox='0 0 20 20' fill='currentColor'>
                  <path d='M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z' />
                </svg>
                Agregar miembro
              </Boton>
            </form>
          </div>
        </section>

        {/* Lista de miembros */}
        <section class='bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-colors duration-300'>
          <div class='p-6 border-b border-gray-200 dark:border-gray-700'>
            <h2 class='text-xl font-semibold text-gray-900 dark:text-white'>Miembros del equipo</h2>
            <p class='mt-1 text-sm text-gray-500 dark:text-gray-400'>
              {proyecto.integrantes.length} {proyecto.integrantes.length === 1 ? 'miembro' : 'miembros'}
            </p>
          </div>

          {proyecto.integrantes.length === 0
            ? (
              <div class='p-8 text-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  class='mx-auto h-12 w-12 text-gray-400'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='1.5'
                    d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                  />
                </svg>
                <h3 class='mt-2 text-lg font-medium text-gray-900 dark:text-white'>No hay miembros</h3>
                <p class='mt-1 text-gray-500 dark:text-gray-400'>Agrega miembros para comenzar a colaborar</p>
              </div>
            )
            : (
              <ul class='divide-y divide-gray-200 dark:divide-gray-700'>
                {proyecto.integrantes.map((miembro) => (
                  <li class='p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200'>
                    <div class='flex items-center justify-between'>
                      <div class='flex items-center space-x-4'>
                        <div class='flex-shrink-0'>
                          <div class='w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/50 flex items-center justify-center'>
                            <svg
                              class='w-5 h-5 text-blue-600 dark:text-blue-400'
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'
                            >
                              <path
                                stroke-linecap='round'
                                stroke-linejoin='round'
                                stroke-width='2'
                                d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                              />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p class='font-medium text-gray-900 dark:text-white'>{miembro}</p>
                          <p class='text-sm text-gray-500 dark:text-gray-400'>Miembro</p>
                        </div>
                      </div>
                      <form method='POST'>
                        <input type='hidden' name='accion' value='eliminar' />
                        <input type='hidden' name='correo' value={miembro} />
                        <button
                          type='submit'
                          class='p-2 text-rose-500 hover:text-rose-700 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-colors duration-200'
                          title='Eliminar miembro'
                        >
                          <svg class='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='2'
                              d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                            />
                          </svg>
                        </button>
                      </form>
                    </div>
                  </li>
                ))}
              </ul>
            )}
        </section>
      </main>
    </div>
  )
}
