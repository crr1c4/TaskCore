// routes/proyectos/[idProyecto]/equipo.tsx
import { FreshContext, Handlers, PageProps } from '$fresh/server.ts'
import { Boton } from '../../../components/Boton.tsx'
import { Input } from '../../../components/Input.tsx'
import { ModalError, ModalLink } from '../../../islands/Modal.tsx'
import NavBar from '../../../islands/NavBar.tsx'
import Proyecto from '../../../models/Proyecto.ts'
import Usuario from '../../../models/Usuario.ts'

// interface Data {
//   proyecto: Proyecto
//   idProyecto: string
// }
//
// export const handler: Handlers<Data> = {
//   async GET(req, ctx) {
//     const { idProyecto } = ctx.params
//     try {
//       const proyecto = await Proyecto.obtener(idProyecto)
//       return ctx.render({ proyecto, idProyecto })
//     } catch (error) {
//       return new Response(null, {
//         status: 303,
//         headers: { Location: `/proyectos?error=${encodeURIComponent(error.message)}` }
//       })
//     }
//   },
//   async POST(req, ctx) {
//     const { idProyecto } = ctx.params
//     const formData = await req.formData()
//     const action = formData.get('action')
//     const correo = formData.get('correo')?.toString()
//
//     try {
//       const proyecto = await Proyecto.obtener(idProyecto)
//
//       if (action === 'agregar' && correo) {
//         // Lógica para agregar miembro
//         proyecto.miembros.push({ correo, rol: 'miembro' })
//       } else if (action === 'eliminar' && correo) {
//         // Lógica para eliminar miembro
//         proyecto.miembros = proyecto.miembros.filter(m => m.correo !== correo)
//       }
//
//       await proyecto.guardar()
//       return new Response(null, {
//         status: 303,
//         headers: { Location: `/proyectos/${idProyecto}/equipo?mensaje=Operación+exitosa` }
//       })
//
//     } catch (error) {
//       return new Response(null, {
//         status: 303,
//         headers: { 
//           Location: `/proyectos/${idProyecto}/equipo?error=${encodeURIComponent(error.message)}`
//         }
//       })
//     }
//   }
// }
//
export default async function GestionEquipo(req: Request, ctx: FreshContext<Usuario>) {
  const { idProyecto } = ctx.params
  const proyecto = await Proyecto.obtener(idProyecto)

  const url = new URL(ctx.url)
  const error = url.searchParams.get('error')
  const mensaje = url.searchParams.get('mensaje')



  return (
    <div class={`${ctx.state.tema} min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200`}>
      {/* Mensajes de estado */}
      {error && <ModalError mensaje={error} />}
      {mensaje && (
        <ModalLink
          mensaje={mensaje}
          enlace={`/proyectos/${idProyecto}/equipo`}
          textoEnlace='Aceptar'
        />
      )}

      <NavBar rol='admin' />

      {/* Header */}
      <header class='pt-20 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200'>
        <div class='max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8'>
          <div class='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
            <div>
              <h1 class='text-3xl font-bold text-gray-900 dark:text-white'>
                Gestión de Equipo
              </h1>
            </div>
            <a 
              href={`/proyecto/${idProyecto}`}
            > 
              <Boton>Volver al proyecto</Boton>
            </a>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main class='max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8'>
        {/* Formulario para agregar miembros */}
        <div class='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8 transition-colors duration-200'>
          <h2 class='text-xl font-semibold text-gray-900 dark:text-white mb-4'>Agregar nuevo miembro</h2>
          <form method='POST' class='w-full flex gap-4'>
            <Input
              label='Correo electrónico'
              type='email'
              name='correo'
              required
              placeholder='correo@ejemplo.com'
            />
            <Boton>Agregar</Boton>
          </form>
        </div>

        {/* Lista de miembros */}
        <div class='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors duration-200'>
          <h2 class='text-xl font-semibold text-gray-900 dark:text-white mb-4'>Miembros actuales</h2>
          
          {proyecto.miembros.length === 0 ? (
            <p class='text-gray-500 dark:text-gray-400 py-4'>No hay miembros en este proyecto</p>
          ) : (
            <ul class='divide-y divide-gray-200 dark:divide-gray-700'>
              {proyecto.miembros.map((miembro) => (
                <li class='py-4 flex items-center justify-between'>
                  <div class='flex items-center gap-4'>
                    <div class='w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center'>
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
                    <div>
                      <p class='font-medium text-gray-900 dark:text-white'>{miembro}</p>
                    </div>
                  </div>
                  <form method='POST'>
                    <input type='hidden' name='action' value='eliminar' />
                    <input type='hidden' name='correo' value={miembro} />
                    <button
                      type='submit'
                      class='p-2 text-rose-600 hover:text-rose-800 dark:hover:text-rose-400 rounded-full hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors'
                      title='Eliminar miembro'
                    >
                      <svg 
                        class='w-5 h-5' 
                        fill='none' 
                        stroke='currentColor' 
                        viewBox='0 0 24 24'
                      >
                        <path 
                          stroke-linecap='round' 
                          stroke-linejoin='round' 
                          stroke-width='2' 
                          d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                        />
                      </svg>
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}
