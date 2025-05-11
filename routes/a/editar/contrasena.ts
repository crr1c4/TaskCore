import { FreshContext } from '$fresh/server.ts'
import { Handlers } from '$fresh/server.ts'
import Usuario from '../../../models/Usuario.ts'

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
      const correo = formulario.get('correo')?.toString().trim()
      const actual = formulario.get('contrasenaActual')?.toString().trim()
      const nueva = formulario.get('nuevaContrasena')?.toString().trim()
      const confirmacion = formulario.get('confirmacionNuevaContrasena')?.toString().trim()

      // Verificación de que los datos no sean indefinidos o vacíos.
      if (!actual || !nueva || !confirmacion || !correo) {
        throw new Error('Error en el envío del formulario.')
      }

      if (nueva !== confirmacion) {
        throw new Error('Las contraseñas nuevas no coinciden.')
      }

      const usuario = await Usuario.obtener(correo)
      if (!await usuario.verificarContraseña(actual)) throw new Error('La contraseña actual no es correcta.')
      await usuario.cambiarContraseña(nueva)

      const params = new URLSearchParams({
        mensaje: 'La contraseña se ha cambiado correctamente.',
      })

      return new Response(null, {
        status: 303,
        headers: {
          'Location': `/a?${params.toString()}`,
        },
      })
    } catch (error) {
      const objetoErrores = error as Error
      const params = new URLSearchParams({
        error: objetoErrores.message,
      })

      return new Response(null, {
        status: 303,
        headers: {
          'Location': `/a/configuracion?${params.toString()}`,
        },
      })
    }
  },
}
