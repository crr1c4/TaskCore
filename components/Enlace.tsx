interface Props { 
  direccion: string 
  texto: string
}

export default function Enlace({ direccion, texto }: Props) { 
  return <a href={direccion} class='mx-auto text-center text-indigo-600 underline text-sm hover:text-indigo-700'>{ texto }</a>
}
