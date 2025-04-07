// deno-lint-ignore-file
import { ComponentChildren } from 'preact'

interface Props {
  children: ComponentChildren
  color: 'sky-500' | 'green-400' | 'orange-400'
}

// Mapeo de colores de fondo para aplicar estilos dinámicos en los botones.
const backgroundColors = {
  'sky-500': 'bg-sky-500',
  'green-400': 'bg-green-400',
  'orange-400': 'bg-orange-400',
}

// Componente ButtonIngresar: Botón estilizado con colores dinámicos y efecto hover cambiando su color de fondo.
export function BotonIngresar(props: Props) {
  return (
    <button
      class={`px-4 py-2 bg-${props.color} hover:bg-gray-300 text-white hover:text-black transition-colors duration-100 uppercase
        font-sans font-semibold rounded-lg shadow-md cursor-pointer`}
    >
      {props.children}
    </button>
  )
}


// Componente ButtonAcciones: Botón con estilos dinámicos para agregar o eliminar tareas.
export function ButtonAcciones(props: Props) {
  const { color } = props
  return (
    <button
      class={`w-1/4 px-2 py-1 ${backgroundColors[color]} border-2  hover:bg-gray-200 transition-colors
        font-sans font-semibold rounded-lg shadow-md cursor-pointer`}
    >
      + Agregar Tarea / - Eliminar Tarea
    </button>
  )
}
// Componente ButtonTareaCompletada: Botón con estilos dinámicos para marcar una tarea como completada.
export function ButtonTareaCompletada(props: Props) {
  const { color } = props
  return (
    <button
      class={`w-1/4 px-2 py-1 ${backgroundColors[color]} border-2  hover:bg-gray-200 transition-colors
        font-sans font-semibold rounded-lg shadow-md cursor-pointer`}
    >
      Tarea Completada
    </button>
  )
}
