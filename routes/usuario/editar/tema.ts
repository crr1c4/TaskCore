import { FreshContext } from '$fresh/server.ts'
import { Handlers } from '$fresh/server.ts'
import Usuario from '../../../models/Usuario.ts'
// import { Usuario } from '../../../components/Iconos.tsx'
import { crearToken } from '../../../utils/autenticacion.ts'

// import { editarUsuario, obtenerUsuario } from '../../../utils/db/modelos/usuario.ts'
import { setCookie } from 'jsr:@std/http/cookie'
import { deleteCookie } from 'jsr:@std/http/cookie'
/**
 * Manejador de la autenticación de usuarios mediante formulario.
 * @type {Handlers} Manejador de solicitudes HTTP.
 */
export const handler: Handlers = {
  /**
   * Maneja la solicitud POST para autenticar un usuario y generar un token JWT.
   * @param {Request} req - La solicitud HTTP entrante.
   * @param {FreshContext} _ctx - El contexto de Fresh (no se usa en este caso).
   */
  async POST(req: Request, _ctx: FreshContext) {
    try {
      const formulario = await req.formData()
      const correo = formulario.get('correo')?.toString().trim()

      if (!correo) {
        throw new Error('Error en el envío del formulario.')
      }

      const usuario = await Usuario.obtenerPorCorreo(correo)
      await usuario.cambiarTema()

      const token = await crearToken({
        correo: usuario.correo,
        nombre: usuario.nombre,
        rol: usuario.rol,
        tema: usuario.tema,
      })

      const headers = new Headers()
      deleteCookie(headers, 'token')

      setCookie(headers, {
        name: 'token',
        value: token,
        maxAge: 60 * 60 * 2, // 2 horas de duración.
        sameSite: 'Strict', // La cookie solo se envía en solicitudes del mismo origen.
        domain: new URL(req.url).hostname, // Se usa el dominio actual.
        path: '/', // La cookie es accesible en toda la aplicación.
        httpOnly: true, // No accesible desde JavaScript en el navegador.
        // WARNING: Cambiar esto a true cuando se llame a producción.
        secure: false, // Solo se envía en conexiones HTTPS.
        // secure: true, // Solo se envía en conexiones HTTPS.
      })

      const params = new URLSearchParams({
        resultado: 'ok',
        mensaje: "El tema se ha cambiado correctamente."
      })

      headers.set('Location', `/usuario/${usuario.rol}/?${params.toString()}`)

      return new Response(null, {
        status: 303,
        headers,
      })

    } catch (_error) {

      console.log(_error)

      return new Response(null, {
        status: 303,
        headers: {
          'Location': `/ingresar`,
        },
      })
    }
  },
}
