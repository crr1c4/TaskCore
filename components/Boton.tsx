// deno-lint-ignore-file
import { ComponentChildren } from 'preact'

interface Props {
  children: ComponentChildren
}

export function Boton(props: Props) {
  return (
    <button className='rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-3 focus:outline-hidden flex items-center justify-around transition-transform hover:scale-105 active:scale-95'>
      {props.children}
    </button>
  )
}


export function BotonEmergencia(props: Props) {
  return (
    <button className='rounded border gap-2 border-rose-600 bg-rose-600 px-12 py-3 text-sm font-medium text-white hover:bg-rose-700 focus:ring-3 focus:outline-hidden flex items-center justify-around transition-transform hover:scale-105 active:scale-95'>
      {props.children}
    </button>
  )
}
