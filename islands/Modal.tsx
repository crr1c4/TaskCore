import { useSignal } from '@preact/signals'

interface Props {
  mensaje: string
}

export function ModalError({ mensaje }: Props) {
  const mostrar = useSignal(true)

  return (
    <div>
      {mostrar.value && (
        <div class='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div class='bg-red-100 p-6 rounded-lg shadow-xl max-w-sm w-full relative select-none'>
            <h2 class='text-xl font-bold text-red-600 mb-4'>Error</h2>
            <p class='mb-4 text-gray-700'>{mensaje}</p>
            <button
              type='button'
              class='absolute top-2 right-2 text-gray-500 hover:text-black'
              onClick={() => mostrar.value = false}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

interface LinkProps extends Props {
  enlace: string
  textoEnlace: string
}

export function ModalLink({ mensaje, enlace, textoEnlace }: LinkProps) {
  const mostrar = useSignal(true)

  return (
    <div>
      {mostrar.value && (
        <div class='fixed inset-0 flex items-center justify-center bg-black/50 z-50'>
          <div class='bg-green-100 p-6 rounded-lg shadow-xl max-w-sm w-full relative select-none'>
            <h2 class='text-xl font-bold text-green-800 mb-4'>Aviso</h2>
            <p class='mb-4 text-gray-700'>{mensaje}</p>
            <button type='button' class='bg-green-300 hover:bg-green-400 transition-colors duration-150 p-2 rounded-md'>
              <a href={enlace}>{textoEnlace}</a>
            </button>
            <button
              type='button'
              class='absolute top-2 right-2 text-gray-500 hover:text-black'
              onClick={() => mostrar.value = false}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
