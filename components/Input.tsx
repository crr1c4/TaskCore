import { JSX } from 'preact'

interface Props extends JSX.HTMLAttributes<HTMLInputElement> {
  label: string
}

export const Input = (props: Props) => (
  <label htmlFor={props.name}>
    <span className='text-sm font-medium text-gray-700 dark:text-white'>{props.label}</span>

    <input
      {...props}
      className='mt-0.5 py-2 px-4 w-full rounded border border-gray-500 focus:border-none focus:outline-none shadow-sm sm:text-sm dark:bg-slate-700 focus:ring-2 dark:ring-blue-700 dark:text-white invalid:text-rose-500 invalid:ring-rose-600'
    />
  </label>
)
