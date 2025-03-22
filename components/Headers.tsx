import { ComponentChildren } from 'preact'

interface Props {
  children: ComponentChildren
}

// Componente Header1: Encabezado H1 con un efecto de degradado en el texto.
export function EncabezadoPrincipal({ children }: Props) {
  return (
    <h1 class='text-4xl font-semibold drop-shadow-md
        bg-gradient-to-r from-sky-500/75 to-yellow-400 bg-clip-text
         text-transparent text-center pb-2'>
      {children}
    </h1>
  )
}
/* Componente Header2: Encabezado H1 con tamaño más pequeño y subrayado al posicionar.
el cursor encima*/
export function Header2() {
  return (
    <h1 class='text text-2xl font-semibold drop-shadow-md
                    no-underline hover:underline
                    cursor-pointer'>
      Segundo tipo de encabezado
    </h1>
  )
}
/* Componente Header3: Encabezado H1 con un enlace subrayado que cambia de estilo
al posicionar el cursor por encima en la palabra tipo, agregando un color azul cielo.*/

export function Header3() {
  return (
    <h1 class=' text-xl font-semibold drop-shadow-md
                    cursor-pointer'>
      Tercer{' '}
      <a
        href='...'
        class='underline hover:decoration-sky-500/75 
      ...'
      >
        tipo
      </a>{' '}
      de encabezado
    </h1>
  )
}
