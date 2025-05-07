import { FreshContext, Handlers } from '$fresh/server.ts'
import { ModalLink } from '../../../islands/Modal.tsx'
import NavBar from '../../../islands/NavBar.tsx'
import { ComponenteProyecto } from '../../../islands/Proyecto.tsx'
import Proyecto from '../../../models/Proyecto.ts'
import Usuario, { Tema } from '../../../models/Usuario.ts'


// export const handler: Handlers<PageProps, { usuario: Usuario }> = {
//   async GET(_req, ctx) {
//     const usuario = await Usuario.obtenerPorCorreo(ctx.state.usuario.correo)
//     const proyectos = await usuario.obtenerProyectos()  
//
//     return ctx.render({ 
//       proyectos,
//       tema: ctx.state.usuario.tema
//     })
//   },
// }

export default async function Home(_req: Request, ctx: FreshContext<Usuario>) {
  const url = ctx.url
  const resultado = url.searchParams.get('resultado')?.replaceAll('"', '')
  const mensaje = url.searchParams.get('mensaje')?.replaceAll('"', '') || ''
  
  const usuario = await Usuario.obtenerPorCorreo(ctx.state.correo)
  const proyectos = await usuario.obtenerProyectos()


  return (
    <div class={`h-screen ${usuario.tema} dark:bg-slate-800`}>
      <NavBar rol='admin' />
      {resultado === 'ok' && (
        <ModalLink
          mensaje={mensaje}
          enlace='/usuario/admin'
          textoEnlace='Ok'
        />
      )}
      <main class='px-6 md:px-20 pt-24'>
        <div class='mb-8'>
          <h2 class='text-2xl font-bold mb-6 text-gray-900 dark:text-white select-none'>
            Proyectos {proyectos.length > 0 && `(${proyectos.length})`}
          </h2>
          {proyectos.length === 0 ? (
            <div class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
              <p class="text-gray-600 dark:text-gray-300">
                No hay proyectos disponibles. 
                <a href="/usuario/admin/crear-proyecto" class="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                  Crear nuevo proyecto
                </a>
              </p>
            </div>
          ) : (
            <div class='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {proyectos.map((proyecto: Proyecto) => (
                <ComponenteProyecto
                  key={proyecto.id}
                  rol='admin'
                  proyecto={proyecto}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
