import { JSX } from 'preact'

interface Props extends JSX.HTMLAttributes<HTMLInputElement> {
  label: string
}

export const CampoIngreso = (props: Props) => (
  <label htmlFor={props.name}>
    <span className='text-sm font-medium text-gray-700'>{props.label}</span>

    <input
      {...props}
      className='mt-0.5 py-2 px-4 w-full rounded border border-gray-500 focus:border-none shadow-sm sm:text-sm'
    />
  </label>
)
