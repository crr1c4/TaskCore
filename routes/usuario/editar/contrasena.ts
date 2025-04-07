import { FreshContext } from '$fresh/server.ts'
import { Handlers } from '$fresh/server.ts'
import { editarUsuario, obtenerUsuario } from '../../../utils/db/modelos/usuario.ts'
import { esquemaContraseña } from '../../../utils/esquemas.ts'
import * as bcrypt from 'jsr:@felix/bcrypt'
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

      const verificacionEsquemaContraseña = esquemaContraseña.safeParse(nueva)

      if (!verificacionEsquemaContraseña.success) {
        throw new Error(
          'Las contraseñas deben ser mayor de 8 caracteres, debe contar con mayúsculas, minúsculas, números y carácteres especiales.',
        )
      }

      const usuario = await obtenerUsuario(correo)!

      if (!usuario) throw new Error('NO existe un usuario registrado con ese correo.')
      if (!await bcrypt.verify(actual, usuario.contraseña)) throw new Error('La contraseña actual no es correcta.')

      // Obtención del usuario desde la base de datos.
      if (!await editarUsuario(correo, { contraseña: nueva })) {
        throw new Error('No existe un usuario con ese nombre en la base de datos')
      }

      const params = new URLSearchParams({
        resultado: 'ok',
      })

      return new Response(null, {
        status: 303,
        headers: {
          'Location': `/usuario/${usuario.rol}/?${params.toString()}`,
        },
      })
    } catch (error) {
      // En caso de error, se redirige al formulario de inicio de sesión con el mensaje de error.
      const objetoErrores = error as Error
      const params = new URLSearchParams({
        error: objetoErrores.message,
      })

      return new Response(null, {
        status: 303,
        headers: {
          'Location': `/usuario/configuracion?${params.toString()}`,
        },
      })
    }
  },
}
