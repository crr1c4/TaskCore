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
      class={`px-4 py-2 ${colors[props.color]} hover:bg-gray-300 text-white hover:text-black transition-colors duration-100 uppercase
        font-sans font-semibold rounded-lg shadow-md cursor-pointer`}
    >
      {props.children}
    </button>
  )
}
