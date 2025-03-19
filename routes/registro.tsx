import { Handlers } from '$fresh/server.ts'
import * as esquemas from '../utils/esquemas.ts'
import { insertarUsuario, Usuario } from '../utils/db/modelos/usuario.ts'

/**
 * Manejador de la ruta de registro de usuarios.
 * @type {Handlers} Define un manejador para la solicitud HTTP POST.
 */
export const handler: Handlers = {
  /**
   * Maneja la solicitud POST para registrar un nuevo usuario.
   * @param {Request} req - La solicitud HTTP entrante.
   */
  async POST(req: Request) {
    try {
      // Obtención de los datos del formulario de envio.
      const formulario = await req.formData()
      const correo = formulario.get('correo')?.toString().trim()
      const nombre = formulario.get('nombre')?.toString().trim()
      const rol = formulario.get('rol')?.toString().trim()
      const contraseña = formulario.get('contraseña')?.toString().trim()
      const verificacionContraseña = formulario.get('verificacionContraseña')?.toString().trim()

      // Verificación de la semantica de los datos.
      const verificacionEsquemaCorreo = esquemas.esquemaEmail.safeParse(correo)
      const verificacionEsquemaNombre = esquemas.esquemaNombre.safeParse(nombre)
      const verificacionEsquemaContraseña = esquemas.esquemaContraseña.safeParse(contraseña)

      // Verificación de que los datos no sean undefined.
      if (!nombre || !correo || !contraseña || !verificacionContraseña) {
        throw 'Error en el envio del formulario.'
      }

      // Verificar que las contraseñas sean iguales.
      if (contraseña !== verificacionContraseña) {
        throw 'Las contraseñas no coinciden.'
      }

      // Verificación del rol.
      if (rol !== 'miembro' && rol !== 'admin') {
        throw 'No se ingreso un rol valido.'
      }

      // Verificar que los esquemas esten correctos.
      // Verificación del esquema del nombre.
      if (!verificacionEsquemaNombre.success) {
        throw 'El nombre de usuario no es valido.'
      }

      // Verificación del esquema del correo.
      if (!verificacionEsquemaCorreo.success) {
        throw 'El correo electronico no es valido.'
      }

      // Verificación del esquema de la contraseña.
      if (!verificacionEsquemaContraseña.success) {
        throw 'Las contraseñas deben ser de 8 caracteres, debe contar con mayúsculas, minúsculas, números y carácteres especiales.'
      }

      // Creación e inserción del usuario.
      const usuario: Usuario = {
        nombre,
        correo,
        contraseña,
        rol,
      }

      if (!await insertarUsuario(usuario)) {
        throw 'El correo electronico ya esta registrado.'
      }

      // Respuesta la petición
      return new Response(null, {
        status: 303,
        headers: {
          'Location': '/agradecimientos',
        },
      })
    } catch (error) {
      // En caso de error, se redirige al formulario de registro con un mensaje de error.
      const params = new URLSearchParams({ error: JSON.stringify(error) })
      return new Response(null, {
        status: 303,
        headers: {
          'Content-Type': 'application/json',
          'Location': `/registro?${params.toString()}`,
        },
      })
    }
  },
}

export default function PaginaInicioSesion(req: Request) {
  const url = new URL(req.url)
  const error = url.searchParams.get('error') ?? ''

  return (
    <div>
      <h1 class='font-bold text-2xl'>Creacion de cuenta</h1>
      <div>
        {error}
      </div>

      <form action='/registro' method='post' class='p-20 border border-emerald-500 flex flex-col w-1/2'>
        <input
          type='text'
          name='nombre'
          placeholder='Nombre'
          required
          value={'Chris'}
          autoComplete='off'
        />
        <input
          type='email'
          name='correo'
          placeholder='Correo'
          required
          value={'chris@gmail.com'}
          autoComplete='off'
        />

        <label for='rol'>Elige un rol:</label>
        <select name='rol'>
          <option value='admin'>Administrador</option>
          <option value='miembro' default>Miembro</option>
        </select>

        <input
          type='password'
          name='contraseña'
          placeholder='Contraseña'
          required
          value={'1234abcD@'}
          autoComplete='off'
        />
        <input
          type='password'
          name='verificacionContraseña'
          placeholder='Verificar contraseña'
          required
          value={'1234abcD@'}
          autoComplete='off'
        />

        <input type='submit' class='bg-emerald-500' />
      </form>
    </div>
  )
}
