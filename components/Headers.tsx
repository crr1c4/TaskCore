import { ComponentChildren } from 'preact'

interface Props {
  children: ComponentChildren
}

export function EncabezadoPrincipal({ children }: Props) {
  return (
    <h1 class='text-4xl font-semibold drop-shadow-md
        bg-gradient-to-r from-sky-500/75 to-yellow-400 bg-clip-text
         text-transparent text-center pb-2'>
      {children}
    </h1>
  )
}
