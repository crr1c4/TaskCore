import SideMenu from '../../../islands/SideMenu.tsx'
import Footer from '../../../components/FooterWelcome.tsx'
import ProjectsSection from '../../../islands/ProjectSection.tsx'

export default function Home() {
  return (
    <div class='relative min-h-screen pt-16'>
      {/* Añade padding-top para la top bar */}
      <SideMenu rol='miembro' />

      <main class='md:ml-64 p-6'>
        <div class='bg-white p-6 rounded-lg shadow'>
          <h2 class='text-2xl font-bold mb-4'>Contenido Principal</h2>
          <p class='text-gray-700'>
            Hola amigos, bienvenidos a TaskCore. Esta es una plantilla de aplicación web con diseño minimalista y
            funcionalidades básicas.
          </p>
        </div>
        <ProjectsSection rol='miembro' />
      </main>
      <Footer />
    </div>
  )
}
