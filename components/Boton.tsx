// deno-lint-ignore-file
import { ComponentChildren } from 'preact'

/**
 * Propiedades comunes para componentes de botón
 * @interface Props
 * @property {ComponentChildren} children - Elementos hijos/contenido a renderizar dentro del botón
 */
interface Props {
  children: ComponentChildren
}

/**
 * Componente de botón primario con esquema de colores indigo
 * @component
 * @param {Props} props - Propiedades del componente
 * @param {ComponentChildren} props.children - Contenido del botón
 * @returns Botón primario estilizado con efectos hover y active
 * @example
 * <Boton>Haz clic</Boton>
 */
export function Boton(props: Props) {
  return (
    <button className='w-full rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-3 focus:outline-hidden flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95'>
      {props.children}
    </button>
  )
}

/**
 * Componente de botón de emergencia/peligro con esquema de colores rojo
 * @component
 * @param {Props} props - Propiedades del componente
 * @param {ComponentChildren} props.children - Contenido del botón
 * @returns Botón de emergencia estilizado con efectos hover y active
 * @example
 * <BotonEmergencia>Eliminar</BotonEmergencia>
 */
export function BotonEmergencia(props: Props) {
  return (
    <button className='w-full rounded border border-rose-600 bg-rose-600 px-12 py-3 text-sm font-medium text-white hover:bg-rose-700 focus:ring-3 focus:outline-hidden flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95'>
      {props.children}
    </button>
  )
}

/**
 * Propiedades para el botón de icono con enlace
 * @interface LinkProps
 * @property {string} link - URL para el enlace
 */
interface LinkProps {
  link: string
}

/**
 * Componente de botón de icono que enlaza a una URL externa
 * @component
 * @param {LinkProps} props - Propiedades del componente
 * @param {string} props.link - URL de destino
 * @returns Botón circular con icono de más (+) que enlaza a la URL especificada
 * @example
 * <BotonIconoLink link="/nuevo-item" />
 */
export function BotonIconoLink(props: LinkProps) {
  return (
    <a
      href={props.link}
      class='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200'
    >
      <svg class='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path
          stroke-linecap='round'
          stroke-linejoin='round'
          stroke-width='2'
          d='M12 6v6m0 0v6m0-6h6m-6 0H6'
        />
      </svg>
    </a>
  )
}
