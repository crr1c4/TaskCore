import { FreshContext } from '$fresh/src/server/mod.ts'
import { ModalLink } from '../../../islands/Modal.tsx'
import NavBar from '../../../islands/NavBar.tsx'
import { ComponenteProyecto } from '../../../islands/Proyecto.tsx'
import Usuario from '../../../models/Usuario.ts'
// import { Proyecto } from '../../../utils/db/modelos/proyecto.ts'

// TODO: Acomodar el fondo
export default function Home(ctx: FreshContext<Usuario>) {
  // Obtiene la URL actual y extrae los parámetros 'error', 'nombre' y 'correo' (si existen).
  const url = ctx.url
  const resultado = url.searchParams.get('resultado')?.replaceAll('"', '') || ''
  // Datos de ejemplo
  const proyectosEjemplo = []

  return (
    <div class={`h-screen ${ctx.state.tema} dark:bg-slate-800`}>
      <NavBar rol='admin' />
      {resultado === 'ok'
        ? (
          <ModalLink
            mensaje='Configuración guardada.'
            enlace='/usuario/admin'
            textoEnlace='Ok'
          />
        )
        : ''}
      <main class='px-6 md:px-20 pt-24'>
        {/* Sección de proyectos (componente separado) */}
        <div class='mb-8'>
          <h2 class='text-2xl font-bold mb-6 text-gray-900 dark:text-white select-none'>Proyectos</h2>
          <div class='grid grid-cols-1 grid-flow-row sm:grid-cols-2 lg:grid-rows-3 lg:grid-cols-3 gap-6'>
            {
              /*proyectosEjemplo.map((proyecto) => (
              <ComponenteProyecto
                key={proyecto.id}
                rol='admin'
                proyecto={proyecto}
              />
            ))*/
            }
          </div>
        </div>
      </main>
    </div>
  )
}
