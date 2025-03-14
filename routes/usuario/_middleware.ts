import { FreshContext } from '$fresh/server.ts'
import { getCookies } from 'jsr:@std/http/cookie'
import { verificarToken } from '../../utils/autenticacion.ts'

export interface EstadoUsuario {
  nombre: string
  correo: string
  rol: string
}

export async function handler(
  req: Request,
  ctx: FreshContext<EstadoUsuario>,
) {
  const cookies = getCookies(req.headers)
  const datos = await verificarToken(cookies.token)

  if (!datos) {
    const params = new URLSearchParams({ error: 'Error de autenticación, vuelva a iniciar sesion.' })
    return Response.redirect(`/ingresar?${params.toString()}`, 201)
  }

  ctx.state = datos as unknown as EstadoUsuario
  return await ctx.next()
}
