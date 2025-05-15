import { ComponentChildren } from 'preact'

/**
 * Propiedades para el componente EncabezadoPrincipal
 * @interface Props
 * @property {ComponentChildren} children - Contenido del encabezado
 */
interface Props {
  children: ComponentChildren
}

/**
 * Componente de encabezado principal con efecto de gradiente
 * @component
 * @param {Props} props - Propiedades del componente
 * @param {ComponentChildren} props.children - Texto del encabezado
 * @returns Encabezado h1 con:
 * - Efecto de gradiente (de azul cielo a amarillo)
 * - Texto transparente con clip de fondo
 * - Sombra suave
 * - Tipografía semibold
 * - Centrado horizontal
 * @description
 * Componente reutilizable para títulos principales con:
 * - Efecto visual moderno usando gradientes CSS
 * - Estilo consistente en toda la aplicación
 * - Soporte para contenido dinámico
 * @example
 * <EncabezadoPrincipal>
 *   Bienvenido a la plataforma
 * </EncabezadoPrincipal>
 */
export function EncabezadoPrincipal({ children }: Props) {
  return (
    <h1 class='text-4xl font-semibold drop-shadow-md
        bg-gradient-to-r from-sky-500/75 to-yellow-400 bg-clip-text
         text-transparent text-center pb-2'>
      {children}
    </h1>
  )
}
