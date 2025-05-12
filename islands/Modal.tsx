import { useSignal } from '@preact/signals'

interface Props {
  mensaje: string
}

interface LinkProps extends Props {
  enlace: string
  textoEnlace: string
}

export function ModalError({ mensaje }: Props) {
  const mostrar = useSignal(true)

  if (!mostrar.value) return null

  return (
    <div class="fixed inset-0 flex items-center justify-center bg-black/30 dark:bg-black/50 z-50">
      <div 
        role="alert" 
        class="rounded-md border border-red-200 dark:border-red-800 bg-white dark:bg-gray-900 p-4 shadow-sm dark:shadow-md dark:shadow-gray-800/50 max-w-md mx-4"
      >
        <div class="flex items-start gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 text-red-600 dark:text-red-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>

          <div class="flex-1">
            <strong class="font-medium text-gray-900 dark:text-gray-100">Error</strong>
            <p class="mt-1 text-sm text-gray-700 dark:text-gray-300">{mensaje}</p>
          </div>

          <button
            onClick={() => (mostrar.value = false)}
            class="-m-2 rounded-full p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            type="button"
            aria-label="Cerrar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export function ModalLink({ mensaje, enlace, textoEnlace }: LinkProps) {
  const mostrar = useSignal(true)

  if (!mostrar.value) return null

  return (
    <div class="fixed inset-0 flex items-center justify-center bg-black/30 dark:bg-black/50 z-50">
      <div class="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 shadow-sm dark:shadow-md dark:shadow-gray-800/50 max-w-md mx-4">
        <div class="flex items-start gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 text-green-600 dark:text-green-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>

          <div class="flex-1">
            <strong class="font-medium text-gray-900 dark:text-gray-100">Aviso</strong>
            <p class="mt-1 text-sm text-gray-700 dark:text-gray-300">{mensaje}</p>
            
            <div class="mt-3 flex gap-2">
              <a
                href={enlace}
                class="rounded bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-colors"
              >
                {textoEnlace}
              </a>
            </div>
          </div>

          <button
            onClick={() => (mostrar.value = false)}
            class="-m-2 rounded-full p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            type="button"
            aria-label="Cerrar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

