import { Head } from '$fresh/runtime.ts'
import { Boton } from '../components/Boton.tsx'

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - TaskCore | Página no encontrada</title>
      </Head>
      <div class='min-h-screen bg-gradient-to-br from-green-100 to-indigo-100 flex flex-col items-center justify-center px-4 py-8'>
        <div class='max-w-md mx-auto text-center'>
          {/* Logo o ícono personalizado */}
          <img
            class='mx-auto mb-6 w-32 h-32'
            src='/iconoTransparente.png' // Ajusta la ruta de tu logo
            alt='TaskCore Logo'
          />

          {/* Ilustración opcional */}
          <svg
            class='mx-auto mb-8 w-40 h-40 text-green-500'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            >
            </path>
          </svg>

          {/* Título y mensaje */}
          <h1 class='text-5xl font-bold text-green-600 mb-4'>404</h1>
          <h2 class='text-2xl font-semibold text-gray-800 mb-4'>
            ¡Ups! Página no encontrada
          </h2>
          <p class='text-gray-600 mb-8'>
            La página que buscas parece haber sido archivada o no existe. Revisa la URL o vuelve al tablero principal.
          </p>

          {/* Botón de acción */}
          <a href='/'>
            <Boton>
              Volver al Inicio
            </Boton>
          </a>
        </div>
      </div>
    </>
  )
}
