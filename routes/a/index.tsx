import { FreshContext } from '$fresh/src/server/mod.ts'
import { ComponenteProyecto } from '../../components/proyectos/TarjetaProyecto.tsx'
import { ModalLink } from '../../islands/Modal.tsx'
import NavBar from '../../islands/NavBar.tsx'
import Usuario from '../../models/Usuario.ts'
import Proyecto from '../../models/Proyecto.ts'

export default async function Home(_req: Request, ctx: FreshContext<Usuario>) {
  const url = ctx.url
  const mensaje = url.searchParams.get('mensaje')?.replaceAll('"', '') || ''

  const usuario = await Usuario.obtener(ctx.state.correo)
  const proyectos = await usuario.obtenerProyectos()

  return (
    <div class={`h-screen ${ctx.state.tema}`}>
      {mensaje
        ? (
          <ModalLink
            mensaje={mensaje}
            enlace='/a/'
            textoEnlace='Ok'
          />
        )
        : ''}

      <NavBar rol={ctx.state.rol} />

      <main class='px-6 md:px-20 pt-24'>
        <div class='mb-8'>
          <h2 class='text-2xl font-bold mb-6 text-gray-900 dark:text-white select-none'>
            Proyectos {proyectos.length > 0 && `(${proyectos.length})`}
          </h2>
          {proyectos.length === 0
            ? (
              <div class='bg-white dark:bg-gray-700 p-6 rounded-lg shadow'>
                <p class='text-gray-600 dark:text-gray-300'>
                  No hay proyectos disponibles.
                  <a href='/a/admin/crear-proyecto' class='text-blue-600 dark:text-blue-400 hover:underline ml-1'>
                    Crear nuevo proyecto
                  </a>
                </p>
              </div>
            )
            : (
              <div class='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {proyectos.map((proyecto: Proyecto) => (
                  <ComponenteProyecto
                    key={proyecto.id}
                    rol={usuario.rol}
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
