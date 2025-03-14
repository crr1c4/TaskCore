import { FreshContext } from "$fresh/server.ts"
import { Handlers } from "$fresh/server.ts"

// Esquema específico para validar la complejidad de la contraseña

export const handler: Handlers = {
  async POST(req: Request, _ctx: FreshContext) {
    const form = await req.formData()

    const email = form.get("email")?.toString()
    const name = form.get("name")?.toString()
    const password = form.get("password")?.toString()
    const verifyPassowrd = form.get("verifyPassword")?.toString()

    const formData = {
      email,
      name,
      password,
      verifyPassowrd,
    }

    console.log({ formData })

    const result = await signupSchema.safeParseAsync(formData)

    if (!result.success) {
      return new Response(JSON.stringify({ errors: result.error.errors }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Extraemos los datos validados, eliminando el campo de verificación
    const { verifyPassword: _, ...userData } = result.data

    // Creamos el usuario con un ID único
    const user = {
      id: crypto.randomUUID(),
      ...userData,
    }

    console.log(user)

    return new Response("Register", { status: 201 })
  },
}

export default function SignUp() {
  return (
    <div>
      <form action="/signup/" method="post">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          required
          value={"Chris"}
          autoComplete="off"
        />
        <input
          type="email"
          name="email"
          placeholder="Correo"
          required
          value={"chris@gmail.com"}
          autoComplete="off"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          required
          value={"1234"}
          autoComplete="off"
        />
        <input
          type="password"
          name="verifyPassword"
          placeholder="Verificar contraseña"
          required
          value={"1234"}
          autoComplete="off"
        />
        <input type="submit" />
      </form>
    </div>
  )
}
