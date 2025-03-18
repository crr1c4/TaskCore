import { PageProps } from '$fresh/server.ts'
import { EstadoUsuario } from '../_middleware.ts'

export default function Home(props: PageProps<EstadoUsuario>) {
  return (
    <div>
      bienvenido admin
      {props.state.correo}
      {props.state.nombre}

      <h1>Proyectos</h1>

      <a class='underline text-blue-400' href='/salir'>Cerrar sesion</a>
    </div>
  )
}
