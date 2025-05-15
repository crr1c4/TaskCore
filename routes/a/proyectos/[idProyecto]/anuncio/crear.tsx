/**
 * Módulo para creación de anuncios en proyectos
 * @module CrearAnuncio
 * @description
 * Maneja la interfaz y lógica para crear nuevos anuncios en proyectos,
 * incluyendo validación, formulario y manejo de errores.
 */
import { FreshContext, Handlers } from '$fresh/server.ts'
import { Input } from '../../../../../components/Input.tsx'
import NavBar from '../../../../../islands/NavBar.tsx'
import Usuario from '../../../../../models/Usuario.ts'
import { IconoAnuncio } from '../../../../../components/Iconos.tsx'
import { Boton } from '../../../../../components/Boton.tsx'
import Anuncio from '../../../../../models/Anuncio.ts'
import Proyecto from '../../../../../models/Proyecto.ts'
import { ModalError } from '../../../../../islands/Modal.tsx'

interface State {
  tema: string
  rol: string
}

/**
 * Handler para creación de anuncios
 * @type {Handlers}
 * @property {Function} POST - Maneja el envío del formulario
 * @description
 * Flujo de operación:
 * 1. Recibe y parsea los datos del formulario
 * 2. Valida campos obligatorios
 * 3. Crea instancia de Anuncio
 * 4. Asocia el anuncio al proyecto
 * 5. Redirige con feedback
 *
 * Manejo de errores:
 * - Validación básica de campos
 * - Captura de errores en operaciones async
 * - Redirección con mensajes de error
 */
export const handler: Handlers<unknown, State> = {
  async POST(req, ctx) {
    try {
      const formData = await req.formData()
      const { idProyecto } = ctx.params

      const datosAnuncio = {
        titulo: formData.get('titulo')?.toString() || '',
        descripcion: formData.get('descripcion')?.toString() || '',
      }

      if (!datosAnuncio.titulo || !datosAnuncio.descripcion) {
        throw new Error('Faltan campos obligatorios.')
      }

      const anuncio = new Anuncio(datosAnuncio.titulo, datosAnuncio.descripcion, new Date())
      const proyecto = await Proyecto.obtener(idProyecto)
      await proyecto.agregarAnuncio(anuncio)

      const params = new URLSearchParams({
        mensaje: 'Anuncio creado correctamente',
      })
      return new Response(null, {
        status: 303,
        headers: { 'Location': `/a/proyectos/${idProyecto}?${params.toString()}` },
      })
    } catch (error) {
      const objetoErrores = error as Error
      const params = new URLSearchParams({
        error: objetoErrores.message,
      })

      return new Response(null, {
        status: 303,
        headers: {
          'Location': `/a/proyectos/${ctx.params.idProyecto}/crearo?${params.toString()}`,
        },
      })
    }
  },
}

/**
 * Componente de formulario para creación de anuncios
 * @function CrearAnuncio
 * @param {FreshContext<Usuario>} ctx - Contexto con estado y parámetros
 * @returns Página completa con:
 * - Barra de navegación
 * - Formulario de creación
 * - Manejo de errores visual
 * - Diseño responsive
 *
 * @description
 * Características principales:
 * - Formulario accesible y validado
 * - Integración con dark mode
 * - Feedback visual de errores
 * - Diseño consistente con el sistema
 *
 * Estructura del componente:
 *
 * 1. NavBar - Barra de navegación superior
 * 2. ModalError - Para mostrar errores (si existen)
 * 3. Contenedor principal:
 *    - Header con icono y título
 *    - Formulario con:
 *      * Campo de título (Input component)
 *      * Área de descripción (textarea)
 *      * Botones de acción
 *
 * Elementos del formulario:
 * @field titulo - Input de texto (requerido)
 * @field descripcion - Textarea (requerido, max 250 chars)
 * @hidden proyectoId - ID del proyecto actual
 *
 * Validaciones:
 * - Frontend: required, minLength, maxLength
 * - Backend: validación de campos vacíos
 *
 * Diseño responsive:
 * - Padding adaptable
 * - Ancho máximo controlado (max-w-4xl)
 * - Grid flexible
 * - Tipografía responsive
 */
export default function CrearAnuncio(ctx: FreshContext<Usuario>) {
  const error = ctx.url.searchParams.get('error')
  const { idProyecto } = ctx.params

  return (
    <div class={`min-h-screen ${ctx.state.tema} dark:bg-gray-900 bg-gray-50`}>
      {error && <ModalError mensaje={error} />}
      <NavBar rol={ctx.state.rol} />

      <main class='pt-20 max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8'>
        <div class='bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700'>
          {/* Encabezado */}
          <div class='mb-8 text-center'>
            <div class='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 mb-4 p-2 dark:text-gray-300'>
              <IconoAnuncio />
            </div>
            <h2 class='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
              Crear nuevo anuncio
            </h2>
            <p class='text-gray-600 dark:text-gray-300'>
              Completa los detalles del anuncio para el proyecto
            </p>
          </div>

          {/* Formulario */}
          <form method='POST' class='space-y-6'>
            <input type='hidden' name='proyectoId' value={idProyecto} />

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
                href={`/a/proyectos/${idProyecto}`}
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
