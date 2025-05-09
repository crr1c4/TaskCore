// routes/proyectos/[id]/crear-anuncio.tsx
import { FreshContext, Handlers } from '$fresh/server.ts'
import { Input } from '../../../../components/Input.tsx'
import NavBar from '../../../../islands/NavBar.tsx'
import Usuario from '../../../../models/Usuario.ts'
import { IconoAnuncio } from '../../../../components/Iconos.tsx'
import { Boton } from '../../../../components/Boton.tsx'
import Anuncio from '../../../../models/Anuncio.ts'
import Proyecto from '../../../../models/Proyecto.ts'

interface State {
  tema: string
  rol: string
}

export const handler: Handlers<unknown, State> = {
  async POST(req, ctx) {
    const formData = await req.formData()
    const { idProyecto } = ctx.params

    const datosAnuncio = {
      titulo: formData.get('titulo')?.toString() || '',
      descripcion: formData.get('descripcion')?.toString() || '',
    }

    // Validación básica
    if (!datosAnuncio.titulo || !datosAnuncio.descripcion) {
      return new Response(null, {
        status: 303,
        headers: { 'Location': `/proyecto/${idProyecto}/crear-anuncio?error=Faltan+campos+obligatorios` },
      })
    }

    const anuncio = new Anuncio(datosAnuncio.titulo, datosAnuncio.descripcion, new Date())
    const proyecto = await Proyecto.obtener(idProyecto)
    await proyecto.agregarAnuncio(anuncio)

    return new Response(null, {
      status: 303,
      headers: { 'Location': `/proyecto/${idProyecto}?mensaje=Anuncio+creado+correctamente` },
    })
  },
}

export default function CrearAnuncio(ctx: FreshContext<Usuario>) {
  const error = ctx.url.searchParams.get('error')
  const { idProyecto } = ctx.params

  return (
    <div class={`min-h-screen ${ctx.state.tema} dark:bg-gray-900 bg-gray-50`}>
      <NavBar rol={ctx.state.rol} />

      <main class='pt-20 max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8'>
        <div class='bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700'>
          {/* Encabezado */}
          <div class='mb-8 text-center'>
            <div class='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 mb-4'>
              <IconoAnuncio class='h-6 w-6 text-blue-600 dark:text-blue-400' />
            </div>
            <h2 class='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
              Crear nuevo anuncio
            </h2>
            <p class='text-gray-600 dark:text-gray-300'>
              Completa los detalles del anuncio para el proyecto
            </p>
          </div>

          {/* Mensaje de error */}
          {error && (
            <div class='mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-md'>
              {decodeURIComponent(error)}
            </div>
          )}

          {/* Formulario */}
          <form method='POST' class='space-y-6'>

            <Input
              type='text'
              label='Título del anuncio'
              name='titulo'
              id='titulo'
              required
              class='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white'
            />

            <div>
              <label for='descripcion' class='block text-sm font-medium text-white dark:text-gray-300 mb-1'>
                Descripción
              </label>
              <textarea
                name='descripcion'
                id='descripcion'
                rows={6}
                required
                maxLength={250}
                minLength={1}
                autoComplete='off'
                class='resize-none w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white'
              >
              </textarea>
            </div>

            <div class='flex justify-end gap-3 pt-4'>
              <a
                href={`/proyecto/${idProyecto}`}
                class='px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center'
              >
                Cancelar
              </a>
              <Boton>Publicar Anuncio</Boton>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
