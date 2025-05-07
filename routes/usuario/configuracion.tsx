import { CampoIngreso } from '../../components/Input.tsx'
import { Boton } from '../../components/Boton.tsx'
import { FreshContext } from '$fresh/server.ts'
import { ModalError } from '../../islands/Modal.tsx'
import BarraNavegacion from '../../islands/NavBar.tsx'
import Usuario from '../../models/Usuario.ts'

export default function Configuracion(ctx: FreshContext<Usuario>) {
  const url = ctx.url
  const error = url.searchParams.get('error')?.replaceAll('"', '')

  return (
    <div class={`${ctx.state.tema} min-h-screen w-full dark:bg-gray-900 bg-gray-50`}>
      <BarraNavegacion rol={ctx.state.rol} />

      {error && <ModalError mensaje={error} />}

      <div class='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div class='flex flex-col md:flex-row gap-8 mt-20'>
          {/* Sidebar de navegación */}
          <aside class='w-full md:w-64 flex-shrink-0'>
            <nav class='space-y-1'>
              <a
                href='#personal'
                class='group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              >
                Información personal
              </a>
              <a
                href='#security'
                class='group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              >
                Seguridad
              </a>
              <a
                href='#preferences'
                class='group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              >
                Preferencias
              </a>
            </nav>
          </aside>

          {/* Contenido principal */}
          <main class='flex-1'>
            <div class='space-y-8'>
              <div>
                <h1 class='text-2xl font-bold text-gray-900 dark:text-white'>Configuración de la cuenta</h1>
                <p class='mt-1 text-sm text-gray-500 dark:text-gray-400'>
                  Administra tu información personal, seguridad y preferencias
                </p>
              </div>

              {/* Sección de información personal */}
              <section id='personal' class='space-y-6'>
                <div class='bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden'>
                  <div class='px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700'>
                    <h2 class='text-lg font-medium text-gray-900 dark:text-white'>
                      Información personal
                    </h2>
                    <p class='mt-1 text-sm text-gray-500 dark:text-gray-400'>
                      Actualiza tu nombre de usuario.
                    </p>
                  </div>
                  <div class='px-4 py-5 sm:p-6'>
                    <form action='/usuario/editar/nombre' method='POST' class='space-y-6'>
                      <CampoIngreso
                        name='nombre'
                        label='Nombre de usuario'
                        autoComplete='off'
                        required
                        value={ctx.state.nombre}
                      />
                      <input type='hidden' value={ctx.state.correo} name='correo' />
                      <div class='flex justify-end'>
                        <Boton >Guardar cambios</Boton>
                      </div>
                    </form>
                  </div>
                </div>
              </section>

              {/* Sección de seguridad */}
              <section id='security' class='space-y-6'>
                <div class='bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden'>
                  <div class='px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700'>
                    <h2 class='text-lg font-medium text-gray-900 dark:text-white'>
                      Seguridad
                    </h2>
                    <p class='mt-1 text-sm text-gray-500 dark:text-gray-400'>
                      Cambia tu contraseña y configura la autenticación
                    </p>
                  </div>
                  <div class='px-4 py-5 sm:p-6'>
                    <form action='/usuario/editar/contrasena' method='POST' class='space-y-6'>
                      <input type='hidden' value={ctx.state.correo} name='correo' />
                      <CampoIngreso
                        type='password'
                        label='Contraseña actual'
                        autoComplete='current-password'
                        required
                        name='contrasenaActual'
                      />
                      <CampoIngreso
                        type='password'
                        label='Nueva contraseña'
                        autoComplete='new-password'
                        required
                        name='nuevaContrasena'
                        minLength={8}
                      />
                      <CampoIngreso
                        type='password'
                        label='Confirmar nueva contraseña'
                        autoComplete='new-password'
                        name='confirmacionNuevaContrasena'
                        required
                        minLength={8}
                      />
                      <div class='flex justify-end'>
                        <Boton >Actualizar contraseña</Boton>
                      </div>
                    </form>
                  </div>
                </div>
              </section>

              {/* Sección de preferencias */}
              <section id='preferences' class='space-y-6'>
                <div class='bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden'>
                  <div class='px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700'>
                    <h2 class='text-lg font-medium text-gray-900 dark:text-white'>
                      Preferencias
                    </h2>
                    <p class='mt-1 text-sm text-gray-500 dark:text-gray-400'>
                      Personaliza tu experiencia
                    </p>
                  </div>
                  <div class='px-4 py-5 sm:p-6'>
                    <form action='/usuario/editar/tema' method='POST' class='space-y-6'>
                      <input type='hidden' value={ctx.state.correo} name='correo' />
                      <div class='flex items-center justify-between'>
                        <div>
                          <h3 class='text-base font-medium text-gray-900 dark:text-white'>Tema</h3>
                          <p class='text-sm text-gray-500 dark:text-gray-400'>
                            Cambia entre modo claro y oscuro
                          </p>
                        </div>
                        <Boton >Cambiar tema</Boton>
                      </div>
                    </form>
                  </div>
                </div>
              </section>

              <div class='flex justify-end'>
                <a href='/usuario/miembro' class='inline-flex'>
                  <Boton>Volver al inicio</Boton>
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
