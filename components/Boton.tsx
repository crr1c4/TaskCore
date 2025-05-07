// deno-lint-ignore-file
import { ComponentChildren } from 'preact'

interface Props {
  children: ComponentChildren
  color: 'blue' | 'yellow' | 'green'
}

export function BotonPrincipal(props: Props) {
  const colors = {
    'blue': 'bg-sky-500',
    'yellow': 'bg-yellow-300',
    'green': 'bg-emerald-400',

  }
  return (
    <button
  className="inline-block rounded-sm border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-3 focus:outline-hidden"
  
  
    >
      {props.children}
    </button>
  )
}
