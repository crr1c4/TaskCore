import { FreshContext } from '$fresh/src/server/mod.ts'
import ComponenteProyecto from '../../components/proyectos/TarjetaProyecto.tsx'
import { ModalError, ModalLink } from '../../islands/Modal.tsx'
import NavBar from '../../islands/NavBar.tsx'
import Usuario from '../../models/Usuario.ts'
import Proyecto from '../../models/Proyecto.ts'

/**
 * Página principal de la aplicación (Home)
 * @function Home
 * @async
 * @param {Request} _req - Objeto Request no utilizado
 * @param {FreshContext<Usuario>} ctx - Contexto de Fresh con estado de usuario
 * @returns Página principal con:
 * - Barra de navegación
 * - Modales para mensajes/errores
 * - Listado de proyectos del usuario
 * - Conteo de tareas por proyecto
 * 
 * @description
 * Página de inicio que muestra:
 * - Proyectos del usuario (como admin o miembro)
 * - Estado de tareas por proyecto
 * - Mensajes de feedback (éxito/error)
 * - Acciones rápidas según rol
 * 
 * Características:
 * - Diseño responsive (grid adaptable)
 * - Soporte para dark mode
 * - Manejo de estados asíncronos
 * - Integración con modelos Usuario y Proyecto
 * - Componentes modales reutilizables
 * 
 * @example
 * // Ruta principal:
 * /a/
 * 
 * // Con mensaje:
 * /a/?mensaje="Proyecto creado"
 * 
 * // Con error:
 * /a/?error="No se pudo cargar"
 *
 * Estructura principal:
 * 
 * 1. NavBar - Barra de navegación superior
 * 2. ModalError - Para mostrar errores (si existen)
 * 3. ModalLink - Para mensajes positivos con acción
 * 4. Contenido principal:
 *    - Título con conteo de proyectos
 *    - Grid de proyectos (ComponenteProyecto)
 *    - Estado vacío con CTA para admins
 * 
 * Flujo de datos:
 * - Obtiene usuario actual (ctx.state.correo)
 * - Recupera proyectos asociados
 * - Obtiene tareas para cada proyecto
 * - Renderiza vista condicional
 * 
 * Componentes destacados:
 * @component ComponenteProyecto - Tarjeta visual de proyecto
 * @component ModalError - Muestra errores en modal
 * @component ModalLink - Modal con mensaje + acción
 * 
 * Responsive:
 * - Grid de 1 col (mobile) → 2/3 cols (desktop)
 * - Padding adaptable
 * - Tipografía responsive
 */
export default async function Home(_req: Request, ctx: FreshContext<Usuario>) {
  const url = ctx.url
  const mensaje = url.searchParams.get('mensaje')?.replaceAll('"', '') || ''
  const error = url.searchParams.get('error')?.replaceAll('"', '') || ''

  const usuario = await Usuario.obtener(ctx.state.correo)
  const proyectos = await usuario.obtenerProyectos()
  const tareas = await Promise.all(proyectos.map(async (proyecto) => await proyecto.obtenerTareasAdministrador()))

  return (
    <div class={`h-screen ${ctx.state.tema} dark:bg-gray-900`}>

      {error && <ModalError mensaje={error} />}
      {mensaje
        ? (
          <ModalLink
            mensaje={mensaje}
            enlace='/a/'
            textoEnlace='Aceptar'
          />
        )
        : ''}

      <NavBar rol={ctx.state.rol} />

      <main class='px-6 md:px-20 pt-20'>
        <div class='mb-8'>
          <h2 class='text-2xl font-bold mb-6 text-gray-900 dark:text-white select-none'>
            Proyectos {proyectos.length > 0 && `(${proyectos.length})`}
          </h2>
          {proyectos.length === 0
            ? (
              <div class='bg-white dark:bg-gray-700 p-6 rounded-lg shadow'>
                <p class='text-gray-600 dark:text-gray-300'>
                  No hay proyectos disponibles.
                  {ctx.state.rol === 'admin'
                    ? (
                      <a href='/a/admin/crear-proyecto' class='text-blue-600 dark:text-blue-400 hover:underline ml-1'>
                        Crear nuevo proyecto
                      </a>
                    )
                    : ''}
                </p>
              </div>
            )
            : (
              <div class='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {proyectos.map((proyecto: Proyecto, index) => (
                  <ComponenteProyecto
                    key={proyecto.id}
                    rol={usuario.rol}
                    proyecto={proyecto}
                    numeroTareas={tareas[index].length}
                  />
                ))}
              </div>
            )}
        </div>
      </main>
    </div>
  )
}
