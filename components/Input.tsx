// deno-lint-ignore-file

// Definición de la interfaz ColorProps que permite tres colores predefinidos.
interface ColorProps {
  color: 'sky-500' | 'green-400' | 'orange-400'
}
// Mapeo de colores para aplicar sombras dinámicas en los inputs.
const shadowColors = {
  'sky-500': 'hover:shadow-sky-500',
  'green-400': 'hover:shadow-green-400',
  'orange-400': 'hover:shadow-orange-400',
}
// Mapeo de colores para aplicar bordes dinámicos en los inputs.
const borderColors = {
  'sky-500': 'border-sky-500',
  'green-400': 'border-green-400',
  'orange-400': 'border-orange-400',
}
// Componente InputBusqueda: un input estilizado con animaciones y sombras dinámicas según el color recibido en las props.
export function InputBusqueda(props: ColorProps) {
  const { color } = props
  return (
    <input
      class={`w-96 h-12 pl-3 shadow-lg bg-gray-275 rounded-lg 
                  transition delay-150 duration-300 ease-in-out
                      hover:-translate-y-1 hover:scale-110
                      ${shadowColors[color]}
                        cursor-text`}
      placeholder='Busqueda'
    />
  )
}
// Componente InputIngresar: un input con bordes dinámicos según el color recibido en las props.
export function InputIngresar(props: ColorProps) {
  const { color } = props
  return (
    <input
      class={`w-72 h-10 pl-3 bg-gray-200 border-2 ${borderColors[color]} 
        rounded-lg cursor-text`}
      placeholder='Ingresa tu dato'
    />
  )
}
