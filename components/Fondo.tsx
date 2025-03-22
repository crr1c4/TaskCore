interface Props {
  ruta: string
}

export default function Fondo({ ruta }: Props) {
  return (
    <div>
      <div
        class='w-screen h-screen bg-cover bg-center filter grayscale absolute z-0 top-0 left-0'
        style={`background-image: url('${ruta}')`}
      >
      </div>

      <div class='absolute inset-0 bg-black opacity-60 z-10'></div>
    </div>
  )
}
