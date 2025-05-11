import Usuario from '../../models/Usuario.ts'

interface Props {
  miembro: Usuario
}

export default function PanelUsuario({ miembro }: Props) {
  return (
    <div class='flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200'>
      <div class='flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center'>
        <span class='text-blue-600 dark:text-blue-300 font-medium'>
          {miembro.nombre.charAt(0).toUpperCase()}
        </span>
      </div>
      <div class='min-w-0'>
        <p class='text-sm font-medium text-gray-900 dark:text-gray-100 truncate'>{miembro.nombre}</p>
        <p class='text-sm text-gray-500 dark:text-gray-400'>{miembro.correo}</p>
      </div>
    </div>
  )
}
