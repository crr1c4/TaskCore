import { FreshContext } from '$fresh/src/server/mod.ts'
import { ComponenteProyecto } from '../../../components/proyectos/TarjetaProyecto.tsx'
import { ModalLink } from '../../../islands/Modal.tsx'
import NavBar from '../../../islands/NavBar.tsx'
// import { ComponenteProyecto } from '../../../islands/Proyecto.tsx'
import Usuario from '../../../models/Usuario.ts'
// import { Proyecto } from '../../../utils/db/modelos/proyecto.ts'

export default async function Home(req: Request, ctx: FreshContext<Usuario>) {
  // Obtiene la URL actual y extrae los parámetros 'error', 'nombre' y 'correo' (si existen).
  const url = ctx.url
  const resultado = url.searchParams.get('resultado')?.replaceAll('"', '') || ''
  const usuario = await Usuario.obtenerPorCorreo(ctx.state.correo)
  const proyectos = await usuario.obtenerProyectos()

  console.log(proyectos)

  return (
    <div class={`h-screen ${ctx.state.tema}`}>
      {resultado === 'ok'
        ? (
          <ModalLink
            mensaje='Configuración guardada.'
            enlace='/usuario/miembro'
            textoEnlace='Ok'
          />
        )
        : ''}

      <NavBar rol='miembro' />

      <main class='px-6 md:px-20 pt-24 dark:bg-slate-800 h-screen'>
        {/* Sección de proyectos (componente separado) */}
        <div class='mb-8'>
          <h2 class='text-2xl font-bold mb-6 text-gray-900 select-none dark:text-white'>Proyectos</h2>

          <div class='grid grid-cols-1 grid-flow-row sm:grid-cols-2 lg:grid-rows-3 lg:grid-cols-3 gap-6'>
            {proyectos.map((proyecto) => <ComponenteProyecto key={proyecto.id} rol='miembro' proyecto={proyecto} />)}
          </div>
        </div>
      </main>
    </div>
  )
}
