import { FreshContext, Handlers } from '$fresh/server.ts'
import { deleteCookie } from 'jsr:@std/http/cookie'

// Esquema específico para validar la complejidad de la contraseña
export const handler: Handlers = {
  GET(_req: Request, _ctx: FreshContext) {
    const headers = new Headers()

    deleteCookie(headers, 'token')
    headers.set("location", "/ingresar")
    
    return new Response(null, {
      status: 302,
      headers
    })
  },

}
