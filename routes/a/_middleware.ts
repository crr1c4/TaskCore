import { FreshContext } from '$fresh/server.ts'
import { getCookies } from 'jsr:@std/http/cookie'
import { verificarToken } from '../../utils/autenticacion.ts'
import Usuario from '../../models/Usuario.ts'

/**
 * Middleware para autenticar usuarios mediante JWT almacenado en cookies.
 *
 * - Obtiene la cookie del token.
 * - Verifica la autenticidad del token.
 * - Si el token es válido, almacena la información del usuario en `ctx.state`.
 * - Si el token no es válido, redirige a la página de inicio de sesión.
 *
 * @param {Request} req - La solicitud entrante.
 * @param {FreshContext<EstadoUsuario>} ctx - El contexto de Fresh con el estado del usuario.
 * @returns {Promise<Response>} Respuesta HTTP de la autenticación o la siguiente función.
 */
export async function handler(
  req: Request,
  ctx: FreshContext<Usuario>,
): Promise<Response> {
  // Obtención las cookies del request
  const cookies = getCookies(req.headers)

  // Verificación el token de autenticación
  if (!cookies.token) {
    const url = new URL(req.url)
    url.pathname = '/ingresar'
    const params = new URLSearchParams({ error: 'Error de autenticación, vuelva a iniciar sesion.' })
    return Response.redirect(`${url.toString()}?${params.toString()}`, 303)
  }

  const datos = await verificarToken(cookies.token)

  // Si el token no es válido, redirigir a la página de inicio de sesión
  if (!datos) {
    const url = new URL(req.url)
    url.pathname = '/ingresar'
    const params = new URLSearchParams({ error: 'Error de autenticación, vuelva a iniciar sesion.' })
    return Response.redirect(`${url.toString()}?${params.toString()}`, 303)
  }

  // Almacenar los datos del usuario autenticado en el contexto
  ctx.state = datos as unknown as Usuario

  // Continuar con la siguiente función en la cadena de middleware
  return await ctx.next()
}
