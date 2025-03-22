// import { useSignal } from '@preact/signals'
//
// interface Props {
//   mensaje: string
// }
//
// export function ModalError(props: Props) {
//   const mostrar = useSignal(true)
//
//   return (
//     <div class={`${mostrar ? 'hidden' : ''} bg-red-400`}>
//       <div>{props.mensaje}</div>
//       <button onClick={() => mostrar.value = false}>Cerrar</button>
//     </div>
//   )
// }

import { useSignal } from '@preact/signals'

interface ErrorProps {
  mensaje: string
}

export function ModalError({ mensaje }: ErrorProps) {
  const mostrar = useSignal(true)

  return (
    <div>
      {mostrar.value && (
        <div class='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div class='bg-red-100 p-6 rounded-lg shadow-xl max-w-sm w-full relative'>
            <h2 class='text-xl font-bold text-red-600 mb-4'>Error</h2>
            <p class='mb-4 text-gray-700'>{mensaje}</p>
            <button
              type="button"
              class='absolute top-2 right-2 text-gray-500 hover:text-black'
              onClick={() => mostrar.value = false}
            >✕</button>
          </div>
        </div>
      )}
    </div>
  )
}
