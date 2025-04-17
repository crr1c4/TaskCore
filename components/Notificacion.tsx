import { IconoAdvertencia, IconoChat, IconoEliminar, IconoNotificaciones } from './Iconos.tsx'

interface Props {
  titulo: string
  descripcion: string
  tipo: 'comentario' | 'aviso' | 'advertencia'
}

export default function Notificacion(props: Props) {
  return (
    <div class='dark:bg-white/20 bg-white shadow-md dark:shadow-none w-full lg:w-2/3 rounded-md p-2 select-none'>
      <div class='flex justify-between px-2'>
        <div>
          <div class='flex gap-2 items-center mb-4'>
            {props.tipo === 'advertencia' && <IconoAdvertencia />}
            {props.tipo === 'comentario' && <IconoChat />}
            {props.tipo === 'aviso' && <IconoNotificaciones />}
            <h2 class='font-bold text-2xl'>{props.titulo}</h2>
          </div>
          <p>{props.descripcion}</p>
        </div>
        <button
          type='button'
          class='dark:hover:bg-white/30 hover:bg-gray-300 rounded-full cursor-pointer w-16 flex items-center justify-center h-16 transition-colors'
        >
          <IconoEliminar />
        </button>
      </div>
    </div>
  )
}
