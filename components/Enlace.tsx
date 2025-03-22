interface Props { 
  direccion: string 
  texto: string
}

export default function Enlace({ direccion, texto }: Props) { 
  return <a href={direccion} class='mx-auto text-center text-sky-500 underline text-sm hover:text-blue-600'>{ texto }</a>
}
