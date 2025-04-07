import Menu from '../../../islands/SideMenu.tsx'
import Footer from '../../../components/FooterWelcome.tsx'
import ProjectsSection from '../../../islands/ProjectSection.tsx'

export default function Home() {
  return (
    <div class='relative h-screen'>
      <Menu rol='admin' />

      <main class='md:ml-64 p-6'>
        {/* Sección de proyectos (componente separado) */}
        <ProjectsSection rol='admin' />
      </main>
    </div>
  )
}
