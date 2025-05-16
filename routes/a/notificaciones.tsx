/**
 * Página de notificaciones del usuario
 * @module Notificaciones
 * @description 
 * Módulo que maneja la visualización y gestión de notificaciones,
 * incluyendo el handler para eliminación masiva y la página de visualización.
 */
import { FreshContext, Handlers } from '$fresh/server.ts'
import CartaNotificacion from '../../components/Notificacion.tsx'
import NavBar from '../../islands/NavBar.tsx'
import Usuario from '../../models/Usuario.ts'
import { IconoEliminar, IconoNotificaciones } from '../../components/Iconos.tsx'
import { BotonEmergencia } from '../../components/Boton.tsx'

/**
 * Handler para operaciones POST (eliminación de notificaciones)
 * @type {Handlers}
 * @property {Function} POST - Maneja la eliminación masiva de notificaciones
 * @description
 * Flujo de operación:
 * 1. Obtiene el usuario actual
 * 2. Elimina todas sus notificaciones
 * 3. Redirige a la misma página
 * 
 * Manejo de errores:
 * - Redirige con mensaje de error si falla
 * - Estado HTTP 303 (See Other) para POST-Redirect-GET
 */
export const handler: Handlers = {
  async POST(_req, ctx) {
    try {
      const usuario = await Usuario.obtener(ctx.state.correo as string)
      await usuario.eliminarNotificaciones()

      return new Response(null, {
        status: 303,
        headers: { Location: '/a/notificaciones' },
      })
    } catch (_error) {
      const params = new URLSearchParams({
        error: 'No se pudieron eliminar las notificaciones',
      })
      return new Response(null, {
        status: 303,
        headers: { Location: `/a/notificaciones?${params}` },
      })
    }
  },
}


/**
 * Componente de página de notificaciones
 * @function PaginaNotificaciones
 * @async
 * @param {Request} _req - Objeto Request
 * @param {FreshContext<Usuario>} ctx - Contexto con estado de usuario
 * @returns Página completa de notificaciones con:
 * - Barra de navegación
 * - Listado de notificaciones
 * - Botón de eliminación masiva
 * - Estado vacío cuando no hay notificaciones
 * 
 * @description
 * Características principales:
 * - Muestra notificaciones ordenadas (más recientes primero)
 * - Diseño responsive (mobile/desktop)
 * - Integración con dark mode
 * - Contador automático de notificaciones
 * - Empty state diseñado
 * 
 * @example
 * // Ruta accesible:
 * /a/notificaciones
 *
 * 1. NavBar - Barra de navegación superior
 * 2. Header - Con icono, título y contador
 * 3. Botón de eliminación masiva (condicional)
 * 4. Listado de notificaciones (CartaNotificacion)
 * 5. Empty state cuando no hay notificaciones
 * 
 * Componentes utilizados:
 * @component CartaNotificacion - Tarjeta visual de notificación
 * @component NavBar - Barra de navegación
 * @component BotonEmergencia - Botón rojo para acciones destructivas
 * @component IconoNotificaciones - Icono SVG
 * @component IconoEliminar - Icono SVG
 * 
 * Flujo de datos:
 * - Obtiene usuario actual (ctx.state.correo)
 * - Recupera notificaciones del usuario
 * - Renderiza vista condicional según cantidad
 * 
 * Responsive Design:
 * - Layout flexible header (column → row)
 * - Grid para listado de notificaciones
 * - Padding adaptable
 * - Tipografía responsive
 */
export default async function PaginaNotificaciones(_req: Request, ctx: FreshContext<Usuario>) {
  const usuario = await Usuario.obtener(ctx.state.correo)
  const notificaciones = await usuario.obtenerNotificaciones()

  return (
    <div class={`min-h-screen ${ctx.state.tema} dark:bg-gray-900 transition-colors duration-200`}>
      <NavBar rol={ctx.state.rol} />

      <main class='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Header */}
        <div class='mt-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8'>
          <div class='flex items-center gap-4'>
            <div class='p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/50 dark:text-white'>
              <IconoNotificaciones />
            </div>
            <div>
              <h1 class='text-2xl md:text-3xl font-bold text-gray-900 dark:text-white'>
                Notificaciones
              </h1>
              <p class='text-gray-600 dark:text-gray-400'>
                {notificaciones.length} {notificaciones.length === 1 ? 'notificación' : 'notificaciones'}
              </p>
            </div>
          </div>

          {/* Botón para eliminar todas las notificaciones */}
          {notificaciones.length > 0 && (
            <form method='POST' action='/a/notificaciones/' class='flex-shrink-0'>
              <BotonEmergencia>
                <IconoEliminar />
                Eliminar todo
              </BotonEmergencia>
            </form>
          )}
        </div>

        {/* Contenido principal */}
        <div class='space-y-4'>
          {/* Sección de notificaciones */}
          {notificaciones.length > 0 && (
            <section>
              <h2 class='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
                Las notificaciones desaparecen automáticamente después de 24 horas.
              </h2>
              <div class='grid gap-3'>
                {notificaciones.map((notificacion) => (
                  <CartaNotificacion
                    key={notificacion.id}
                    notificacion={notificacion}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Estado vacío */}
          {notificaciones.length === 0 && (
            <div class='text-center py-12'>
              <h3 class='text-lg font-medium text-gray-900 dark:text-white'>
                No hay notificaciones
              </h3>
              <p class='mt-1 text-gray-500 dark:text-gray-400'>
                Cuando tengas notificaciones, aparecerán aquí
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
