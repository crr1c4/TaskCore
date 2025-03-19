// Definición de la interfaz ColorProps que permite seleccionar entre tres colores predefinidos.
interface ColorProps {
  color: 'sky-500' | 'green-400' | 'orange-400'
}

/*Función TextArea la cual modifica las propiedades de color,
tamaño, estilo del contorno, bordes y cursor al posicionarse por encima*/
export function TextArea(props: ColorProps) {
  const { color } = props

  return (
    <textarea
      class={` mr-3 w-80 h-64
                    border-2 border-${color} rounded-lg
                    cursor-text`}
      placeholder='Ingresa un comentario al proyecto'
    />
  )
}
