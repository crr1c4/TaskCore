import { PageProps } from '$fresh/server.ts'
import { EstadoUsuario } from '../_middleware.ts'

export default function Home(props: PageProps<EstadoUsuario>) {
  return (
    <div>
      bienvenido miembro
      {props.state.correo}
      {props.state.nombre}

      <a class='underline text-blue-400' href='/salir'>Cerrar sesion</a>
    </div>
  )
}

