/**
 * Módulo para creación de nuevas tareas
 * @module NuevaTarea
 * @description
 * Maneja la interfaz y lógica para crear nuevas tareas en proyectos,
 * incluyendo validación de datos, formulario y manejo de errores.
 */
import { FreshContext, Handlers } from '$fresh/server.ts'
import Tarea from '../../../../../models/Tarea.ts'
import NavBar from '../../../../../islands/NavBar.tsx'
import Usuario from '../../../../../models/Usuario.ts'
import { Boton } from '../../../../../components/Boton.tsx'
import { Input } from '../../../../../components/Input.tsx'
import { IconoCrear, IconoVolver } from '../../../../../components/Iconos.tsx'
import { AreaTexto } from '../../../../../components/AreaTexto.tsx'
import Proyecto from '../../../../../models/Proyecto.ts'
import { ModalError } from '../../../../../islands/Modal.tsx'

/**
 * Handler para operaciones CRUD de creación de tareas
 * @type {Handlers}
 * @property {Function} POST - Maneja el envío del formulario de creación
 * @property {Function} GET - Controla el acceso a la página de creación
 *
 * @description
 * Flujo de operación POST:
 * 1. Recibe y parsea los datos del formulario
 * 2. Valida campos obligatorios y formato de fecha/hora
 * 3. Crea instancia de Tarea
 * 4. Asocia la tarea al proyecto
 * 5. Redirige con feedback de éxito/error
 *
 * Flujo de operación GET:
 * 1. Verifica permisos (solo admin)
 * 2. Renderiza formulario con valores por defecto
 */
export const handler: Handlers = {
  async POST(req, ctx) {
    const formulario = await req.formData()
    const { idProyecto } = ctx.params

    try {
      const nombre = formulario.get('nombre')?.toString()
      const descripcion = formulario.get('descripcion')?.toString()
      const fecha = formulario.get('fecha')?.toString()
      const hora = formulario.get('hora')?.toString()
      const responsable = formulario.get('responsable')?.toString()

      if (!nombre || !descripcion || !fecha || !hora || !responsable) {
        throw new Error('Todos los campos son requeridos')
      }

      const fechaExpiracion = new Date(`${fecha}T${hora}`)

      if (isNaN(fechaExpiracion.getTime())) {
        throw new Error('Fecha y hora inválidas')
      }

      const tarea = Tarea.crear(
        nombre,
        descripcion,
        fechaExpiracion,
        responsable,
      )

      const proyecto = await Proyecto.obtener(idProyecto)
      await proyecto.agregarTarea(tarea)

      const params = new URLSearchParams({
        mensaje: 'La tarea se ha creado correctamente.',
      })

      return new Response(null, {
        status: 303,
        headers: {
          Location: `/a/proyectos/${idProyecto}?${params.toString()}`,
        },
      })
    } catch (error) {
      const objetoErrores = error as Error
      const params = new URLSearchParams({
        error: objetoErrores.message,
        nombre: formulario.get('nombre')?.toString() || '',
        descripcion: formulario.get('descripcion')?.toString() || '',
      })

      return new Response(null, {
        status: 303,
        headers: {
          Location: `/a/proyectos/${idProyecto}/tareas/crear?${params.toString()}`,
        },
      })
    }
  },
  async GET(_req, ctx) {
    // Si el usuario es administrador, se permite continuar con la petición.
    if (ctx.state.rol !== 'admin') {
      return new Response(null, {
        status: 301, // Redirección permanente
        headers: { Location: '/a/' },
      })
    }

    const respuesta = await ctx.render()
    return respuesta
  },
}

/**
 * Componente de formulario para creación de tareas
 * @function NuevaTarea
 * @param {Request} _req - Objeto Request
 * @param {FreshContext<Usuario>} ctx - Contexto con estado y parámetros
 * @returns Página completa con:
 * - Barra de navegación
 * - Formulario de creación con:
 *   * Campos para nombre, descripción
 *   * Selector de fecha/hora límite
 *   * Asignación de responsable
 * - Manejo de errores visual
 * - Diseño responsive y dark mode
 *
 * @description
 * Características principales:
 * - Formulario validado en frontend y backend
 * - Selector de responsables actualizado
 * - Fecha mínima establecida a hoy
 * - Persistencia de datos en errores
 * - Feedback visual claro
 */
export default async function NuevaTarea(_req: Request, ctx: FreshContext<Usuario>) {
  // Obtener fecha actual en formato YYYY-MM-DD
  const hoy = new Date()
  const fechaActual = hoy.toISOString().split('T')[0]
  const { idProyecto } = ctx.params
  const proyecto = await Proyecto.obtener(idProyecto)
  const error = ctx.url.searchParams.get('error') || ''
  const nombre = ctx.url.searchParams.get('nombre') || ''
  const descripcion = ctx.url.searchParams.get('descripcion') || ''

  return (
    <div class={`${ctx.state.tema} min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300`}>
      <NavBar rol='admin' />

      {error ? <ModalError mensaje={error} /> : ''}

      {/* Header */}
      <header class='pt-20 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300'>
        <div class='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div class='flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>
            <div>
              <h1 class='text-3xl font-bold text-gray-900 dark:text-white tracking-tight'>
                Crear Nueva Tarea
              </h1>
              <p class='mt-2 text-gray-600 dark:text-gray-300'>
                Completa los detalles para la tarea en:{' '}
                <span class='font-medium text-indigo-600 dark:text-indigo-400'>Proyecto {proyecto.nombre}</span>
              </p>
            </div>
            <a
              href={`/a/proyectos/${idProyecto}`}
            >
              <Boton>
                <IconoVolver />
                Volver
              </Boton>
            </a>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main class='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
        {/* Formulario para crear tarea */}
        <section class='bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-colors duration-300'>
          <div class='p-6 border-b border-gray-200 dark:border-gray-700'>
            <h2 class='text-xl font-semibold text-gray-900 dark:text-white'>Detalles de la tarea</h2>
            <p class='mt-1 text-sm text-gray-500 dark:text-gray-400'>Completa todos los campos requeridos</p>
          </div>
          <div class='p-6'>
            <form method='POST' class='space-y-6 flex flex-col gap-2'>
              <Input
                label='Nombre de la tarea:'
                type='text'
                name='nombre'
                required
                value={nombre}
                placeholder='Ej: Implementar funcionalidad X'
              />

              <AreaTexto
                label='Descripción:'
                name='descripcion'
                rows={4}
                required
                value={descripcion}
                placeholder='Describe los detalles de la tarea...'
              />

              <div class='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <Input
                  type='date'
                  name='fecha'
                  required
                  min={fechaActual}
                  value={fechaActual}
                  label='Fecha límite:'
                />

                <Input
                  type='time'
                  name='hora'
                  required
                  value='23:59'
                  label='Hora límite:'
                />
              </div>

              <div>
                <label for='responsable' class='block text-sm font-medium text-gray-700 dark:text-white mb-2'>
                  Asignar a:
                </label>
                <select
                  name='responsable'
                  className='mt-0.5 py-2 px-4 w-full rounded border border-gray-500 focus:border-none focus:outline-none shadow-sm sm:text-sm dark:bg-slate-700 focus:ring-2 dark:ring-blue-700 dark:text-white invalid:text-rose-500 invalid:ring-rose-600'
                >
                  <option value=''>Sin asignar</option>
                  {proyecto.integrantes.map((miembro) => <option key={miembro} value={miembro}>{miembro}</option>)}
                </select>
              </div>

              <div class='flex justify-end pt-4'>
                <Boton>
                  <IconoCrear />
                  Crear Tarea
                </Boton>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}
