// deno-lint-ignore-file
import { ComponentChildren } from 'preact'

interface Props {
  children: ComponentChildren
}

export function Boton(props: Props) {
  return (
    <button className='w-full rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-3 focus:outline-hidden flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95'>
      {props.children}
    </button>
  )
}

export function BotonEmergencia(props: Props) {
  return (
    <button className='w-full rounded border border-rose-600 bg-rose-600 px-12 py-3 text-sm font-medium text-white hover:bg-rose-700 focus:ring-3 focus:outline-hidden flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95'>
      {props.children}
    </button>
  )
}

interface LinkProps {
  link: string
}

export function BotonIconoLink(props: LinkProps) {
  return (
    <a
      href={props.link}
      class='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200'
    >
      <svg class='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path
          stroke-linecap='round'
          stroke-linejoin='round'
          stroke-width='2'
          d='M12 6v6m0 0v6m0-6h6m-6 0H6'
        />
      </svg>
    </a>
  )
}
