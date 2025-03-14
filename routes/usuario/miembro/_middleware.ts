import { FreshContext } from '$fresh/server.ts'
import { EstadoUsuario } from '../_middleware.ts'

export function handler(_req: Request, ctx: FreshContext<EstadoUsuario>) {
  if (ctx.state.rol === 'miembro') return ctx.next()
  return new Response(null, {
    status: 301,
    headers: { Location: '/usuario/admin' },
  })
}
