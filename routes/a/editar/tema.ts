import { FreshContext } from '$fresh/server.ts'
import { Handlers } from '$fresh/server.ts'
import Usuario from '../../../models/Usuario.ts'
import { crearToken } from '../../../utils/autenticacion.ts'
import { setCookie } from 'jsr:@std/http/cookie'
import { deleteCookie } from 'jsr:@std/http/cookie'

/**
 * Manejador HTTP para cambiar el tema de visualización del usuario.
 * 
 * Procesa una solicitud POST que actualiza el tema preferido del usuario en la base de datos.
 * Luego genera un nuevo token JWT con la configuración actualizada y lo guarda en una cookie segura.
 * 
 * @type {Handlers}
 */

export const handler: Handlers = {
/**
 * Maneja la solicitud POST para actualizar el tema del usuario.
 * 
 * Extrae el correo del formulario, cambia el tema en la base de datos,
 * genera un nuevo token con la nueva preferencia y actualiza la cookie del cliente.
 * 
 * @param {Request} req - La solicitud HTTP entrante.
 * @param {FreshContext} _ctx - Contexto de ejecución del servidor (no se utiliza).
 * @returns Redirección HTTP con mensaje de éxito o error.
 */

  async POST(req: Request, _ctx: FreshContext) {
    try {
      const formulario = await req.formData()
      const correo = formulario.get('correo')?.toString().trim()

      if (!correo) {
        throw new Error('Error en el envío del formulario.')
      }

      const usuario = await Usuario.obtener(correo)
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
        secure: true, // Solo se envía en conexiones HTTPS.
      })

      const params = new URLSearchParams({
        mensaje: 'El tema se ha cambiado correctamente.',
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
