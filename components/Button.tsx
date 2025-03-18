// deno-lint-ignore-file

// Definición de la interfaz ColorProps que permite seleccionar entre tres colores predefinidos.
interface ColorProps {
  color: 'sky-500' | 'green-400' | 'orange-400'
}

// Mapeo de colores de fondo para aplicar estilos dinámicos en los botones.
const backgroundColors = {
  'sky-500': 'bg-sky-500',
  'green-400': 'bg-green-400',
  'orange-400': 'bg-orange-400',
}
// Componente ButtonIngresar: Botón estilizado con colores dinámicos y efecto hover cambiando su color de fondo.
export function ButtonIngresar(props: ColorProps) {
  const { color } = props
  return (
    <button
      class={`px-2 py-1 ${backgroundColors[color]} border-2  hover:bg-gray-200 transition-colors
        font-sans font-semibold rounded-lg shadow-md cursor-pointer`}
    >
      Ingresar
    </button>
  )
}
// Componente ButtonAcciones: Botón con estilos dinámicos para agregar o eliminar tareas.
export function ButtonAcciones(props: ColorProps) {
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
export function ButtonTareaCompletada(props: ColorProps) {
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
