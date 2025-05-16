/**
 * Propiedades para el componente Fondo
 * @interface Props
 * @property {string} ruta - Ruta/URL de la imagen de fondo
 */
interface Props {
  ruta: string
}

/**
 * Componente de fondo con imagen en escala de grises y overlay oscuro
 * @component
 * @param {Props} props - Propiedades del componente
 * @param {string} props.ruta - Ruta de la imagen a utilizar como fondo
 * @returns Contenedor con imagen de fondo en grises y overlay oscuro
 * @description
 * Este componente crea un fondo que:
 * - Ocupa toda la pantalla (viewport)
 * - Muestra una imagen en escala de grises
 * - Aplica un overlay oscuro al 60% de opacidad
 * - Se posiciona de forma absoluta con z-index 10
 * @example
 * <Fondo ruta="/imagenes/fondo-hero.jpg" />
 */
export default function Fondo({ ruta }: Props) {
  return (
    <div class='absolute z-10 top-0 left-0 bg-black/75'>
      <div
        class='w-screen h-screen bg-cover bg-center filter grayscale'
        style={`background-image: url('${ruta}')`}
      >
      </div>

      <div class='absolute inset-0 bg-black opacity-60 z-10'></div>
    </div>
  )
}
