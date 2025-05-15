import { JSX } from 'preact'

/**
 * Extiende los atributos HTML estándar para textarea incluyendo propiedades personalizadas
 * @interface Props
 * @extends {JSX.HTMLAttributes<HTMLTextAreaElement>}
 * @property {string} label - Texto de la etiqueta a mostrar sobre el textarea
 */
interface Props extends JSX.HTMLAttributes<HTMLTextAreaElement> {
  label: string
}

/**
 * Componente reutilizable de área de texto con etiqueta y estilos personalizados
 * @component
 * @param {Props} props - Propiedades del componente
 * @param {string} props.label - Texto de la etiqueta que se muestra arriba del textarea
 * @param {JSX.HTMLAttributes<HTMLTextAreaElement>} props - Todos los atributos HTML estándar para textarea
 * @returns Un textarea estilizado con etiqueta y estilos de validación
 * @example
 * <AreaTexto
 *   label="Descripción"
 *   name="descripcion"
 *   required
 *   rows={4}
 *   placeholder="Ingresa tu descripción..."
 * />
 */
export const AreaTexto = (props: Props) => (
  <label htmlFor={props.name}>
    <span className='text-sm font-medium text-gray-700 dark:text-white'>{props.label}</span>

    <textarea
      {...props}
      className='resize-none mt-0.5 py-2 px-4 w-full rounded border border-gray-500 focus:border-none focus:outline-none shadow-sm sm:text-sm dark:bg-slate-700 focus:ring-2 dark:ring-blue-700 dark:text-white invalid:text-rose-500 invalid:ring-rose-600'
    />
  </label>
)
