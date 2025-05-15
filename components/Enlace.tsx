/**
 * Propiedades para el componente Enlace
 * @interface Props
 * @property {string} direccion - URL a la que enlaza el componente
 * @property {string} texto - Texto visible del enlace
 */
interface Props { 
  direccion: string 
  texto: string
}

/**
 * Componente de enlace (anchor) estilizado
 * @component
 * @param {Props} props - Propiedades del componente
 * @param {string} props.direccion - URL de destino del enlace
 * @param {string} props.texto - Texto que se muestra como enlace
 * @returns Elemento <a> estilizado con color indigo y subrayado
 * @example
 * <Enlace 
 *   direccion="/contacto" 
 *   texto="Ir a página de contacto" 
 * />
 */
export default function Enlace({ direccion, texto }: Props) { 
  return <a href={direccion} class='mx-auto text-center text-indigo-600 underline text-sm hover:text-indigo-700'>{ texto }</a>
}
