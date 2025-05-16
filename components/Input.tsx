import { JSX } from 'preact'

/**
 * Extiende los atributos HTML estándar para inputs incluyendo propiedades personalizadas
 * @interface Props
 * @extends {JSX.HTMLAttributes<HTMLInputElement>}
 * @property {string} label - Texto de la etiqueta a mostrar sobre el input
 */
interface Props extends JSX.HTMLAttributes<HTMLInputElement> {
  label: string
}

/**
 * Componente reutilizable de input con etiqueta y estilos personalizados
 * @component
 * @param {Props} props - Propiedades del componente
 * @param {string} props.label - Texto de la etiqueta descriptiva
 * @param {JSX.HTMLAttributes<HTMLInputElement>} props - Todos los atributos HTML estándar para inputs
 * @returns Input estilizado con:
 * - Etiqueta descriptiva superior
 * - Estilos para modo claro/oscuro
 * - Validación visual integrada
 * - Efectos de focus personalizados
 * - Diseño responsive
 * @description
 * Componente de input que incluye:
 * - Soporte completo para accesibilidad (label asociado)
 * - Estilos coherentes con el sistema de diseño
 * - Validación visual automática (estilos para :invalid)
 * - Integración con dark mode
 * @example
 * <Input
 *   label="Correo electrónico"
 *   name="email"
 *   type="email"
 *   required
 *   placeholder="ejemplo@dominio.com"
 * />
 */
export const Input = (props: Props) => (
  <label htmlFor={props.name}>
    <span className='text-sm font-medium text-gray-700 dark:text-white'>{props.label}</span>

    <input
      {...props}
      className='mt-0.5 py-2 px-4 w-full rounded border border-gray-500 focus:border-none focus:outline-none shadow-sm sm:text-sm dark:bg-slate-700 focus:ring-2 dark:ring-blue-700 dark:text-white invalid:text-rose-500 invalid:ring-rose-600'
    />
  </label>
)
