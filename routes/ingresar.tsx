import { FreshContext } from '$fresh/server.ts'
import { Handlers } from '$fresh/server.ts'
import { obtenerUsuario } from '../utils/db/modelos/usuario.ts'
import { crearToken } from '../utils/autenticacion.ts'
import * as bcrypt from 'jsr:@felix/bcrypt'
import { setCookie } from 'jsr:@std/http/cookie'

// Esquema específico para validar la complejidad de la contraseña
export const handler: Handlers = {
  async POST(req: Request, _ctx: FreshContext) {
    try {
      // Obtención de los datos del formulario de envio.
      const formulario = await req.formData()
      const correo = formulario.get('correo')?.toString().trim()
      const contraseña = formulario.get('contraseña')?.toString().trim()

      // Verificación de que los datos no sean indefinidos.
      if (!correo || !contraseña) {
        throw 'Error en el envio del formulario.'
      }

      const usuario = await obtenerUsuario(correo)

      if (!usuario) {
        throw 'No hay un usuario registrado con el correo ingresado.'
      }

      if (!await bcrypt.verify(contraseña, usuario.contraseña)) {
        throw 'La contraseña es incorrecta.'
      }

      // Generacion del token
      const token = await crearToken({ correo: usuario.correo, nombre: usuario.nombre, rol: usuario.rol })
      const headers = new Headers()

      // Inserción del token en la cookie
      setCookie(headers, {
        name: 'token',
        value: token, 
        maxAge: 60 * 60 * 2, // 2h
        sameSite: 'Strict', 
        domain: new URL(req.url).hostname,
        path: '/',
        httpOnly: true,
        secure: true,
      })

      headers.set('location', `/usuario/${usuario.rol}/`)
      return new Response(null, {
        status: 303,
        headers,
      })
    } catch (error) {
      console.error(error)
      const params = new URLSearchParams({ error: JSON.stringify(error) })
      return new Response(null, {
        status: 303,
        headers: {
          'Content-Type': 'application/json',
          'Location': `/ingresar?${params.toString()}`,
        },
      })
    }
  },
}

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
