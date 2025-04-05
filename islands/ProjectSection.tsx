import { useState } from 'preact/hooks'

interface Props {
  rol: 'admin' | 'miembro'
}

export default function ProjectsSection({ rol }: Props) {
  // Datos de ejemplo
  const exampleProjects = [
    {
      id: 1,
      title: 'Proyecto A',
      description: 'Descripción de ejemplo del proyecto A',
      icon: 'fa-tasks',
      color: 'bg-blue-600',
      lastUpdated: '01/01/2025',
    },
    {
      id: 2,
      title: 'Proyecto B',
      description: 'Descripción de ejemplo del proyecto B',
      icon: 'fa-users',
      color: 'bg-green-600',
      lastUpdated: '02/01/2025',
    },
    {
      id: 3,
      title: 'Proyecto C',
      description: 'Descripción de ejemplo del proyecto C',
      icon: 'fa-chart-line',
      color: 'bg-purple-600',
      lastUpdated: '03/01/2025',
    },
  ]

  const [openMenuId, setOpenMenuId] = useState<number | null>(null)

  const toggleMenu = (id: number, e: MouseEvent) => {
    e.stopPropagation()
    setOpenMenuId(openMenuId === id ? null : id)
  }

  const handleEdit = (id: number, e: MouseEvent) => {
    e.stopPropagation()
    console.log('Editar proyecto', id)
    setOpenMenuId(null)
  }

  const handleDelete = (id: number, e: MouseEvent) => {
    e.stopPropagation()
    console.log('Eliminar proyecto', id)
    setOpenMenuId(null)
  }

  const handleUnsubscribe = (id: number, e: MouseEvent) => {
    e.stopPropagation()
    console.log('Darse de baja del proyecto', id)
    setOpenMenuId(null)
  }

  const handleCardClick = (id: number) => {
    console.log('Acceder al proyecto', id)
  }

  return (
    <div class='mb-8'>
      <h2 class='text-2xl font-bold mb-6 text-gray-800'>Proyectos</h2>

      <div class='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {exampleProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => handleCardClick(project.id)}
            class='bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg relative cursor-pointer'
          >
            <div class={`${project.color} px-4 py-3 flex justify-between items-center`}>
              <h3 class='text-white font-semibold text-lg flex items-center'>
                <i class={`fas ${project.icon} mr-2`}></i> {project.title}
              </h3>

              <div class='relative'>
                <button
                  onClick={(e) => toggleMenu(project.id, e)}
                  class='text-white hover:bg-white/20 p-1 rounded-full focus:outline-none'
                  aria-label='Menú de opciones'
                >
                  <svg
                    width='4'
                    height='16'
                    viewBox='0 0 4 16'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                    class='h-4 w-1'
                  >
                    <path d='M2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4ZM2 6C0.9 6 0 6.9 0 8C0 9.1 0.9 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6ZM2 12C0.9 12 0 12.9 0 14C0 15.1 0.9 16 2 16C3.1 16 4 15.1 4 14C4 12.9 3.1 12 2 12Z' />
                  </svg>
                </button>

                {openMenuId === project.id && (
                  <div class='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200'>
                    <div class='py-1'>
                      {rol === 'admin'
                        ? (
                          <>
                            <button
                              onClick={(e) => handleEdit(project.id, e)}
                              class='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center'
                            >
                              <span class='mr-2'>•</span> Editar
                            </button>
                            <button
                              onClick={(e) => handleDelete(project.id, e)}
                              class='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center'
                            >
                              <span class='mr-2'>•</span> Eliminar
                            </button>
                          </>
                        )
                        : (
                          <button
                            onClick={(e) => handleUnsubscribe(project.id, e)}
                            class='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center'
                          >
                            <span class='mr-2'>•</span> Darse de baja
                          </button>
                        )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div class='p-4'>
              <p class='text-gray-600 mb-4'>{project.description}</p>
              <div class='flex justify-between items-center'>
                <span class='text-sm text-gray-500'>Actualizado: {project.lastUpdated}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
