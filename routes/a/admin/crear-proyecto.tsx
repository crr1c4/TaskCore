import { FreshContext, Handlers } from '$fresh/server.ts'
import { Boton } from '../../../components/Boton.tsx'
import { Input } from '../../../components/Input.tsx'
import { ModalError } from '../../../islands/Modal.tsx'
import NavBar from '../../../islands/NavBar.tsx'
import Proyecto from '../../../models/Proyecto.ts'
import Usuario from '../../../models/Usuario.ts'

/**
 * Handler HTTP para la creación de un nuevo proyecto.
 *
 * Procesa solicitudes POST, valida los datos del formulario y guarda un nuevo proyecto.
 * Redirige a una página de éxito o error según el resultado.
 *
 * @param {Request} req - La solicitud entrante con datos del formulario.
 * @param {FreshContext} _ctx - Contexto de Fresh (no utilizado).
 * @returns {Promise<Response>} Redirección HTTP con estado 303.
 */
export const handler: Handlers = {
  async POST(req, _ctx) {
    const formulario = await req.formData()
    try {
      const nombre = formulario.get('nombre')?.toString()
      const descripcion = formulario.get('descripcion')?.toString()
      const correoAdministrador = formulario.get('administrador')?.toString()

      if (!nombre || !descripcion || !correoAdministrador) {
        throw new Error('Datos invalidos.')
      }

      const proyecto = Proyecto.crear(nombre, descripcion, correoAdministrador)
      await proyecto.guardar()

      const params = new URLSearchParams({
        mensaje: 'El proyecto se ha creado correctamente.',
      })

      return new Response(null, {
        status: 303,
        headers: {
          'Location': `/a?${params.toString()}`,
        },
      })
    } catch (error) {
      const objetoErrores = error as Error
      const params = new URLSearchParams({
        error: objetoErrores.message,
      })

      return new Response(null, {
        status: 303,
        headers: {
          'Location': `/a/admin/crear-proyecto?${params.toString()}`,
        },
      })
    }
  },
}

/**
 * Componente de la interfaz para crear un nuevo proyecto.
 *
 * Muestra un formulario con campos básicos y permite al usuario administrador enviar la información.
 * En caso de error, despliega un modal con el mensaje correspondiente.
 *
 * @param {FreshContext<Usuario>} ctx - Contexto que incluye estado y parámetros de URL.
 * @returns Estructura visual del formulario de creación de proyectos.
 */
export default function PaginaCrearProyecto(ctx: FreshContext<Usuario>) {
  const error = ctx.url.searchParams.get('error')

  return (
    <div class={`min-h-screen ${ctx.state.tema} dark:bg-gray-900 bg-gray-50`}>
      <NavBar rol={ctx.state.rol} />

      <main class='px-4 sm:px-6 lg:px-8 py-24 max-w-7xl mx-auto'>
        <form method='POST' action='/a/admin/crear-proyecto' class='space-y-8 max-w-4xl mx-auto'>
          {/* Encabezado */}
          <div class='text-center mb-12'>
            <h1 class='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2'>
              Crear nuevo proyecto
            </h1>

            {error && <ModalError mensaje={error} />}
          </div>

          {/* Información básica del proyecto */}
          <div class='bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700'>
            <h2 class='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4'>
              Información del proyecto
            </h2>

            <div class='space-y-4'>
              <Input
                name='nombre'
                label='Nombre del proyecto'
                required
                placeholder='Ej: Sistema de gestión de tareas'
              />

              <Input
                name='descripcion'
                label='Descripción'
                rows={3}
                placeholder='Describe el propósito del proyecto...'
              />
            </div>
          </div>

          <input type='hidden' name='administrador' value={ctx.state.correo} />

          {/* Botón de creación */}
          <div class='flex justify-center pt-4'>
            <Boton>
              Crear proyecto
            </Boton>
          </div>
        </form>
      </main>
    </div>
  )
}
