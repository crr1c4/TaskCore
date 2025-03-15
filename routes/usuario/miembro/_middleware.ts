import { FreshContext } from "$fresh/server.ts";
import { EstadoUsuario } from "../_middleware.ts";

/**
 * Middleware para verificar si el usuario tiene el rol de "miembro".
 * Si es miembro, permite continuar con la petición; de lo contrario, redirige a la ruta de administrador.
 *
 * @param {Request} _req - La solicitud HTTP entrante (no se usa en este middleware).
 * @param {FreshContext<EstadoUsuario>} ctx - Contexto de Fresh, que incluye el estado del usuario.
 */
export function handler(_req: Request, ctx: FreshContext<EstadoUsuario>) {
  // Si el usuario es miembro, se permite continuar con la petición.
  if (ctx.state.rol === "miembro") return ctx.next();

  // Si el usuario no es miembro, se redirige a la ruta de "admin".
  return new Response(null, {
    status: 301, // Redirección permanente
    headers: { Location: "/usuario/admin" },
  });
}
