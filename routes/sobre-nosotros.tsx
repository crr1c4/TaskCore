import { Head } from '$fresh/runtime.ts'
import Fondo from '../components/Fondo.tsx'
import { EncabezadoPrincipal } from '../components/Headers.tsx'
import Footer from '../components/Footer.tsx'

export default function Empresa() {
  return (
    <>
      <Head>
        <title>TaskCore - Nuestra Empresa</title>
        <meta name='description' content='Conoce más sobre TaskCore y nuestra misión' />
      </Head>

      <div class='min-h-screen flex flex-col'>
        {/* Header Hero */}
        <header class='relative pt-20 pb-16 bg-gradient-to-b from-blue-900/80 to-transparent'>
          <div class='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
            <h1 class='text-4xl'>Conoce Navetix</h1>
            <p class='mt-4 text-xl text-black max-w-3xl mx-auto'>
              Innovando en gestión de proyectos desde 2025
            </p>
          </div>
        </header>

        {/* Contenido Principal */}
        <main class='flex-grow'>
          <section class='py-12 bg-white dark:bg-gray-800'>
            <div class='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
              <div class='lg:flex gap-12'>
                {/* Columna izquierda - Logo */}
                <div class='lg:w-1/3 flex justify-center mb-8 lg:mb-0'>
                  <img
                    src='/Navetix.png'
                    alt='Logo TaskCore'
                    class='w-64 h-64 object-contain rounded-lg'
                  />
                </div>

                {/* Columna derecha - Texto */}
                <div class='lg:w-2/3'>
                  <div class='space-y-4 text-gray-700 dark:text-gray-300'>
                    <h3 class='text-xl font-semibold text-gray-900 dark:text-white mt-6'>Misión</h3>
                    <p>
                      En Navetix nos dedicamos a diseñar y desarrollar aplicaciones web innovadoras, intuitivas y
                      eficientes que aumenten la presencia digital de nuestros clientes. Nuestra pasión por la
                      tecnología y la experiencia de usuario nos impulsa a crear soluciones adaptadas a las necesidades
                      de cada negocio, garantizando calidad, escalabilidad y un impacto positivo en el entorno digital.
                    </p>

                    <h3 class='text-xl font-semibold text-gray-900 dark:text-white mt-6'>Visión</h3>
                    <p>
                      Transformarnos en la solución líder en el desarrollo de aplicaciones web, reconocida por la
                      creatividad, excelencia y capacidad de transformar ideas en plataformas digitales. Aspiramos a
                      evolucionar constantemente con las tendencias tecnológicas y contribuir al crecimiento digital de
                      empresas y emprendedores.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  )
}
