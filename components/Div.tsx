// Definición de la interfaz ColorProps la cual permite tres colores predefinidos.
interface ColorProps {
  color: 'sky-500' | 'green-400' | 'orange-400'
}
// Mapeo de colores para aplicar efectos hover dinámicos en los elementos div.
const hoverColors = {
  'sky-500': 'hover:bg-sky-500',
  'green-400': 'hover:bg-green-400',
  'orange-400': 'hover:bg-orange-400',
}

/* Componente DivTareas: Contenedor que muestra una lista de tareas
 con estilos dinámicos en al posicionar el cursor en cada una,
 mostrando una animación de enfoque y cambio de color en el fondo.*/
export function DivTareas(props: ColorProps) {
  const { color } = props
  return (
    <div
      {...props}
      class='rounded-lg flex flex-col gap-y-2'
    >
      <div
        class={`w-64 bg-gray-200  ${hoverColors[color]} transition-colors
                     cursor-pointer rounded-r-lg pb-3 pt-3 text-center`}
      >
        Tarea 1
      </div>
      <div
        class={`w-64 bg-gray-200  ${hoverColors[color]} transition-colors
                     cursor-pointer rounded-r-lg pb-3 pt-3 text-center`}
      >
        Tarea 2
      </div>
      <div
        class={`w-64 bg-gray-200  ${hoverColors[color]} transition-colors
                     cursor-pointer rounded-r-lg pb-3 pt-3 text-center`}
      >
        Tarea 3
      </div>
      <div
        class={`w-64 bg-gray-200  ${hoverColors[color]} transition-colors
                     cursor-pointer rounded-r-lg pb-3 pt-3 text-center`}
      >
        Tarea 4
      </div>
      <div
        class={`w-64 bg-gray-200  ${hoverColors[color]} transition-colors
                     cursor-pointer rounded-r-lg pb-3 pt-3 text-center`}
      >
        Tarea 5
      </div>
    </div>
  )
}
