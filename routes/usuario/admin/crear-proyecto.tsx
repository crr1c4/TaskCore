import { FreshContext } from '$fresh/server.ts'
import { BotonPrincipal } from '../../../components/Boton.tsx'
import { IconoEquipo } from '../../../components/Iconos.tsx'
import { CampoIngreso } from '../../../components/Input.tsx'
import NavBar from '../../../islands/NavBar.tsx'
import Usuario from '../../../models/Usuario.ts'

export default function PaginaCrearProyecto(ctx: FreshContext<Usuario>) {
  return (
    <div class={`h-screen ${ctx.state.tema} dark:bg-slate-800`}>
      {/* Panel principal */}
      <NavBar rol={ctx.state.rol} />
      <main class='px-6 md:px-20 pt-24 flex flex-col justify-center items-center gap-2 dark:text-white'>
        <h1 class='text-4xl'>Crear un nuevo proyecto</h1>

        <div class='p-4 w-full shadow-md lg:w-1/2 grid grid-cols-4 gap-2 items-center dark:shadow-none dark:bg-slate-900 rounded-md'>
          <h2 class='text-2xl col-span-1 hidden md:block'>Agregar miembro:</h2>
          <div class='w-full flex gap-2 col-span-4 md:col-span-3'>
            <CampoIngreso label='Correo de miembro' />
            <BotonPrincipal color='blue'>Agregar</BotonPrincipal>
          </div>
        </div>

        <div class='p-4 w-full shadow-md lg:w-1/2 flex flex-col gap-4 items-center dark:shadow-none dark:bg-slate-900 rounded-md'>
          <h2 class='text-2xl'>Resumen de creación del proyecto:</h2>
          <div class='w-full flex gap-2'>
            <IconoEquipo />
            <h2 class='text-xl'>Miembros agregados:</h2>
          </div>
          <div class="w-full flex flex-wrap gap-2 text-xs">
            <div class="rounded-full bg-sky-400 py-2 px-4 cursor-pointer hover:bg-sky-500 transition-colors">miembro@correo.com</div>
            <div class="rounded-full bg-sky-400 py-2 px-4 cursor-pointer hover:bg-sky-500 transition-colors">miembro_correo_largo@correo.com</div>
            <div class="rounded-full bg-sky-400 py-2 px-4 cursor-pointer hover:bg-sky-500 transition-colors">otro.miembro@correo.com</div>
            <div class="rounded-full bg-sky-400 py-2 px-4 cursor-pointer hover:bg-sky-500 transition-colors">miembro_correo_largo@correo.com</div>
            <div class="rounded-full bg-sky-400 py-2 px-4 cursor-pointer hover:bg-sky-500 transition-colors">miembro_correo_largo@correo.com</div>
            <div class="rounded-full bg-sky-400 py-2 px-4 cursor-pointer hover:bg-sky-500 transition-colors">miembro@correo.com</div>
            <div class="rounded-full bg-sky-400 py-2 px-4 cursor-pointer hover:bg-sky-500 transition-colors">otro.miembro@correo.com</div>
          </div>        
        </div>
        <BotonPrincipal color='green'>Crear un nuevo proyecto</BotonPrincipal>
      </main>
    </div>
  )
}
