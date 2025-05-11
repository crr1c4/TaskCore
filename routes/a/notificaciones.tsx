import { FreshContext } from '$fresh/server.ts'
import Notificacion from '../../components/Notificacion.tsx'
import NavBar from '../../islands/NavBar.tsx'
import Usuario from '../../models/Usuario.ts'

export default function PaginaNotificaciones(ctx: FreshContext<Usuario>) {
  return (
    <div class={`h-screen ${ctx.state.tema} dark:bg-slate-800`}>
      {/* Panel principal */}
      <NavBar rol={ctx.state.rol} />
      <main class='px-6 md:px-20 pt-24 flex flex-col justify-center items-center gap-2 dark:text-white'>
        <h1 class='text-4xl'>Notificaciones</h1>
        <Notificacion descripcion='Ejemplo de una descripcion' titulo='Notificacion 1' tipo='comentario' />
        <Notificacion descripcion='Ejemplo de una descripcion' titulo='Notificacion 2' tipo='aviso' />
        <Notificacion descripcion='Ejemplo de una descripcion' titulo='Notificacion 3' tipo='advertencia' />
      </main>
    </div>
  )
}
