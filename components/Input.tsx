import { JSX } from 'preact'

// Definición de la interfaz ColorProps que permite tres colores predefinidos.
interface Props extends JSX.HTMLAttributes<HTMLInputElement> {
  color: 'sky-500' | 'green-400' | 'orange-400'
}

// Componente InputBusqueda: un input estilizado con animaciones y sombras dinámicas según el color recibido en las props.
export function InputBusqueda(props: Props) {
  const { color } = props
  return (
    <input
      class={`w-96 h-12 pl-3 shadow-lg bg-gray-275 rounded-lg 
                  transition delay-150 duration-300 ease-in-out
                      hover:-translate-y-1 hover:scale-110
                      hover:shadow-${color}
                        cursor-text`}
      placeholder='Busqueda'
    />
  )
}
// Componente InputIngresar: un input con bordes dinámicos según el color recibido en las props.
export const CampoIngreso = (props: Props) => (
  <input
    class={`w-full h-10 pl-3 bg-gray-200 border-2 border-${props.color} 
        rounded-lg cursor-text`}
    {...props}
  />
)
