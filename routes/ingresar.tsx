import { FreshContext } from '$fresh/server.ts'
import { Handlers } from '$fresh/server.ts'
import { obtenerUsuario } from '../utils/db/modelos/usuario.ts'
import { crearToken } from '../utils/autenticacion.ts'
import * as bcrypt from 'jsr:@felix/bcrypt'
import { setCookie } from 'jsr:@std/http/cookie'


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
      const formulario = await req.formData();
      const correo = formulario.get("correo")?.toString().trim();
      const contraseña = formulario.get("contraseña")?.toString().trim();

      // Verificación de que los datos no sean indefinidos o vacíos.
      if (!correo || !contraseña) {
        throw "Error en el envío del formulario.";
      }

      // Obtención del usuario desde la base de datos.
      const usuario = await obtenerUsuario(correo);

      // Verificación de la existencia del usuario.
      if (!usuario) {
        throw "No hay un usuario registrado con el correo ingresado.";
      }

      // Verificación de la contraseña con la almacenada en la base de datos.
      if (!(await bcrypt.verify(contraseña, usuario.contraseña))) {
        throw "La contraseña es incorrecta.";
      }

      // Generación del token JWT con la información del usuario.
      const token = await crearToken({
        correo: usuario.correo,
        nombre: usuario.nombre,
        rol: usuario.rol,
      });

      const headers = new Headers();

      // Inserción del token en una cookie segura.
      setCookie(headers, {
        name: "token",
        value: token,
        maxAge: 60 * 60 * 2, // 2 horas de duración.
        sameSite: "Strict", // La cookie solo se envía en solicitudes del mismo origen.
        domain: new URL(req.url).hostname, // Se usa el dominio actual.
        path: "/", // La cookie es accesible en toda la aplicación.
        httpOnly: true, // No accesible desde JavaScript en el navegador.
        secure: true, // Solo se envía en conexiones HTTPS.
      });

      // Redirección al área de usuario según su rol.
      headers.set("Location", `/usuario/${usuario.rol}/`);
      return new Response(null, {
        status: 303,
        headers,
      });
    } catch (error) {
      // En caso de error, se redirige al formulario de inicio de sesión con el mensaje de error.
      const params = new URLSearchParams({ error: JSON.stringify(error) });
      return new Response(null, {
        status: 303,
        headers: {
          "Content-Type": "application/json",
          "Location": `/ingresar?${params.toString()}`,
        },
      });
    }
  },
};

export default function PaginaIngreso(req: Request) {
  const url = new URL(req.url)
  const error = url.searchParams.get('error') ?? ''
  return (
    <div>
      <div>
        {error}
      </div>
      <h1 class='font-bold text-2xl'>Inicio de sesion</h1>
      <form action='/ingresar' method='post' class='p-20 border border-emerald-500 flex flex-col w-1/2'>
        <input
          type='email'
          name='correo'
          placeholder='Correo'
          required
          value={'chris@gmail.com'}
          autoComplete='off'
        />
        <input
          type='password'
          name='contraseña'
          placeholder='Contraseña'
          required
          value={'1234abcD@'}
          autoComplete='off'
        />

        <input type='submit' class='bg-emerald-500' />
      </form>
    </div>
  )
}
