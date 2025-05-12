import { Boton } from '../components/Boton.tsx'
import Fondo from '../components/Fondo.tsx'
import Footer from '../components/Footer.tsx'

/* Componente principal Home: Renderiza la estructura de la página principal con distintos componentes.
 Muestra encabezados, botones, inputs, listas de tareas y detalles de proyectos.*/
export default function Bienvenida() {
  // const count = useSignal(3)
  return (
    <main className='text-white select-none grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1'>
      <Fondo ruta='/fondo3.gif' />

      {/* Sección Principal */}
      <section className='h-screen w-full z-10 flex flex-col items-center justify-center text-center px-6 bg-slate-900 lg:row-start-1'>
        <h1 className='text-6xl font-bold mb-4 text-sky-400'>Bienvenido a TaskCore</h1>
        <img
          src='/iconoTransparente.png'
          alt='Vista previa de TaskCore'
          className='mt-10 w-3/4 sm:w-1/6 max-w-4xl rounded-lg'
        />

        <p className='text-lg max-w-2xl text-gray-300'>
          La mejor plataforma para gestionar tus proyectos y tareas de manera sencilla, eficiente y colaborativa.
        </p>
        <div className='mt-6 flex gap-4'>
          <a href='/ingresar'>
            <Boton>
              Iniciar sesión
            </Boton>
          </a>

          <a href='/registro'>
            <Boton>
              Crear cuenta
            </Boton>
          </a>
        </div>
      </section>

      {/* Sección de Ventajas */}
      <section className='h-screen w-full z-10 flex flex-col items-center justify-center text-center px-6 bg-slate-800 lg:row-start-1 lg:col-start-2 lg:bg-transparent'>
        <h2 className='text-5xl font-bold text-sky-400 mb-6'>¿Por qué elegirnos?</h2>
        <p className='text-lg max-w-3xl text-gray-300 mb-6'>
          TaskCore está diseñado para potenciar la productividad y la colaboración. Estas son algunas de sus ventajas:
        </p>
        <ul className='text-lg max-w-2xl text-black space-y-4'>
          <li class='bg-white/50 py-2 px-4 rounded-md shadow-md hover:bg-white/90 transition-colors duration-100'>
            ✅ <span className='font-semibold'>Interfaz intuitiva:</span> Diseño limpio y fácil de usar.
          </li>
          <li class='bg-white/50 py-2 px-4 rounded-md shadow-md hover:bg-white/90 transition-colors duration-100'>
            ✅ <span className='font-semibold'>Gestión de tareas eficiente:</span>{' '}
            Asigna y sigue el progreso de las tareas de tus proyectos.
          </li>
        </ul>
      </section>

      <Footer />
    </main>
  )
}
