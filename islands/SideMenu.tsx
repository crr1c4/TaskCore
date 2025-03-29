import { useState } from 'preact/hooks'

interface Props {
  rol: 'admin' | 'miembro'
}

export default function SideMenu({ rol }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const menuitems: string[] = [
    'Proyecto A',
    'Proyecto B',
    'Proyecto C',
    'Proyecto D',
    'Proyecto E',
    'Proyecto F',
    'Proyecto G',
    'Proyecto H',
    'Proyecto I',
    'Proyecto J',
    'Proyecto K',
    'Proyecto L',
    'Proyecto M',
    'Proyecto N',
    'Proyecto O',
  ]

  const handleAddProject = () => {
    console.log('Agregar nuevo proyecto')
    setIsAddMenuOpen(false)
  }

  const handleLogout = () => {
    console.log('Cerrando sesión...')
    setIsUserMenuOpen(false)
  }

  // Determinar la imagen de usuario según el rol
  const userImage = rol === 'admin' ? '/admin.png' : '/miembro.jpg'
  const userLabel = rol === 'admin' ? 'Administrador' : 'Miembro'

  return (
    <>
      <header class='fixed top-0 left-0 right-0 h-20 bg-white shadow-md z-40 flex items-center justify-between px-4 border-b border-black'>
        {/* Parte izquierda - Logo y botón de menú */}
        <div class='flex items-center h-full'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            class='md:hidden p-2 rounded-md hover:bg-gray-100 mr-2'
          >
            {isOpen
              ? (
                <svg class='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18L18 6M6 6l12 12' />
                </svg>
              )
              : (
                <svg class='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 6h16M4 12h16M4 18h16' />
                </svg>
              )}
          </button>

          <div class='ml-4 h-full py-2 flex items-center'>
            <img
              src='/icono.jpeg'
              alt='Logo de la aplicación'
              class='h-full object-contain'
            />
            <h1 class='text-2xl font-bold'>TaskCore</h1>
          </div>
        </div>

        {/* Parte derecha - Usuario y botón + */}
        <div class='flex items-center space-x-3'>
          {/* Botón + (solo visible para admin) */}
          {rol === 'admin' && (
            <div class='relative'>
              <button
                onClick={() => {
                  setIsAddMenuOpen(!isAddMenuOpen)
                  setIsUserMenuOpen(false)
                }}
                class='p-2 rounded-full bg-white text-black hover:bg-blue-600 hover:text-white transition-colors'
              >
                <svg class='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 4v16m8-8H4' />
                </svg>
              </button>

              {isAddMenuOpen && (
                <div class='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200'>
                  <div class='py-1'>
                    <button
                      onClick={handleAddProject}
                      class='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center'
                    >
                      <svg class='w-4 h-4 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 4v16m8-8H4' />
                      </svg>
                      Agregar proyecto
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Imagen de usuario (cambia según rol) */}
          <div class='relative h-[70%] flex items-center'>
            <button
              onClick={() => {
                setIsUserMenuOpen(!isUserMenuOpen)
                setIsAddMenuOpen(false)
              }}
              class='focus:outline-none'
            >
              <img
                src={userImage}
                alt='Foto de perfil'
                class={`w-10 h-10 rounded-full hover:opacity-80 transition-opacity`}
              />
            </button>

            {isUserMenuOpen && (
              <div class='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200'>
                <div class='py-1'>
                  <div class='block px-4 py-2 text-sm text-gray-700 border-b border-gray-100'>
                    Usuario: {userLabel}
                  </div>
                  <button
                    onClick={handleLogout}
                    class='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center'
                  >
                    <svg class='w-4 h-4 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='2'
                        d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                      />
                    </svg>
                    <a href='/salir'>Salir</a>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Resto del código del sidebar... */}
      <aside
        class={`
        fixed left-0 z-30
        transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        bg-gray-300 shadow-xl
        w-64
        top-20
        md:bottom-14
        bottom-0
        overflow-y-auto
        scrollbar-hidden
      `}
      >
        <nav class='p-4'>
          <ul class='space-y-2'>
            {menuitems.map((item, index) => (
              <li key={`${item}-${index}`}>
                <a
                  href='#'
                  class='block px-4 py-3 bg-yellow-300 rounded-lg hover:bg-yellow-400 transition-colors shadow'
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {(isOpen || isAddMenuOpen || isUserMenuOpen) && (
        <div
          class='fixed inset-0 bg-black bg-opacity-50 z-20'
          onClick={() => {
            setIsOpen(false)
            setIsAddMenuOpen(false)
            setIsUserMenuOpen(false)
          }}
        />
      )}
    </>
  )
}
