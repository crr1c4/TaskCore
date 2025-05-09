import { FreshContext } from "$fresh/server.ts";
import Usuario from '../../../../models/Usuario.ts'

/**
 * Middleware para verificar si el usuario tiene el rol de "admin".
 * Si es administrador, permite continuar con la petición; de lo contrario, redirige a la ruta de miembro.
 *
 * @param {Request} _req - La solicitud HTTP entrante (no se usa en este middleware).
 * @param {FreshContext<EstadoUsuario>} ctx - Contexto de Fresh, que incluye el estado del usuario.
 */
export function handler(_req: Request, ctx: FreshContext<Usuario>) {
  // Si el usuario es administrador, se permite continuar con la petición.
  if (ctx.state.rol === "admin") return ctx.next();

  // Si el usuario no es admin, se redirige a la ruta de "miembro".
  return new Response(null, {
    status: 301, // Redirección permanente
    headers: { Location: "/usuario/miembro" },
  });
}
