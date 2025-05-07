import { FreshContext } from '$fresh/server.ts'
import { Handlers } from '$fresh/server.ts'
import { crearToken } from '../../../utils/autenticacion.ts'
import Usuario from '../../../models/Usuario.ts'
import { setCookie } from 'jsr:@std/http/cookie'
import { deleteCookie } from 'jsr:@std/http/cookie'
// import { crearToken } from '../../../utils/autenticacion.ts'

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
      // Obtención de los datos del formulario enviado por el usuario.
      const formulario = await req.formData()
      const nombre = formulario.get('nombre')?.toString().trim()
      const correo = formulario.get('correo')?.toString().trim()

      // Verificación de que los datos no sean indefinidos o vacíos.
      if (!nombre || !correo) {
        throw new Error('Error en el envío del formulario.')
      }

      // Obtención del usuario desde la base de datos.
      const usuario = await Usuario.obtenerPorCorreo(correo)
      await usuario.cambiarNombre(nombre)

      // if (!await editarUsuario(correo, { nombre })) {
        // throw new Error('No existe un usuario con ese nombre en la base de datos')
      // }

     // const usuario = await obtenerUsuario(correo)
      // if (!usuario) throw new Error('NO existe un usuario registrado con ese correo.')

      // Generación del token JWT con la información del usuario.
      const token = await crearToken({
        correo: usuario.correo,
        nombre: usuario.nombre,
        rol: usuario.rol,
        tema: usuario.tema,
      })

      const headers = new Headers()
      deleteCookie(headers, 'token')

      // Inserción del token en una cookie segura.
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
        mensaje: 'El nombre se ha cambiado correctamente.',
      })

      headers.set('Location', `/usuario/${usuario.rol}/?${params.toString()}`)

      return new Response(null, {
        status: 303,
        headers,
      })
    } catch (_error) {
      // En caso de error, se redirige al formulario de inicio de sesión con el mensaje de error.

      return new Response(null, {
        status: 303,
        headers: {
          'Location': `/ingresar?`,
        },
      })
    }
  },
}
