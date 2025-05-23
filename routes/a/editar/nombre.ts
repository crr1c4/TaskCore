import { FreshContext } from '$fresh/server.ts'
import { Handlers } from '$fresh/server.ts'
import { crearToken } from '../../../utils/autenticacion.ts'
import Usuario from '../../../models/Usuario.ts'
import { setCookie } from 'jsr:@std/http/cookie'
import { deleteCookie } from 'jsr:@std/http/cookie'

/**
 * Manejador HTTP para actualizar el nombre del usuario autenticado.
 *
 * Procesa una solicitud POST que contiene un nuevo nombre y actualiza el perfil del usuario en la base de datos.
 * Luego genera un nuevo token JWT y lo almacena en una cookie segura.
 *
 * @type {Handlers}
 */

export const handler: Handlers = {
  /**
   * Maneja la solicitud POST para cambiar el nombre del usuario.
   *
   * Valida los datos del formulario, actualiza el nombre del usuario en la base de datos,
   * genera un nuevo token JWT y lo guarda en una cookie.
   *
   * @param {Request} req - La solicitud HTTP entrante.
   * @param {FreshContext} _ctx - Contexto del servidor (no se usa directamente en esta función).
   * @returns Respuesta HTTP con redirección a la página correspondiente.
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
      const usuario = await Usuario.obtener(correo)

      await usuario.cambiarNombre(nombre)

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
        secure: true, // Solo se envía en conexiones HTTPS.
      })

      const params = new URLSearchParams({
        mensaje: 'El nombre se ha cambiado correctamente.',
      })

      headers.set('Location', `/a?${params.toString()}`)

      return new Response(null, {
        status: 303,
        headers,
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
