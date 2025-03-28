import { useState } from "preact/hooks";

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top Bar con botón */}
      <header class="fixed top-0 left-0 right-0 h-20 bg-white shadow-md z-40 flex items-center justify-between px-4 border-b border-black">
        {/* Parte izquierda - Logo y botón de menú */}
        <div class="flex items-center h-full">
          {/* Botón de menú (solo móvil) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            class="md:hidden p-2 rounded-md hover:bg-gray-100 mr-2"
          >
            {isOpen ? (
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Logo */}
          <div class="ml-4 h-full py-2 flex items-center">
            <img
              src="/icono.jpeg" // Ruta a tu imagen
              alt="Logo de la aplicación"
              class="h-full object-contain" // Mantiene proporciones
            />
            <h1 class="text-2xl font-bold ">TaskCore</h1>
          </div>
        </div>

        {/* Parte derecha - Usuario y botón + */}
        <div class="flex items-center space-x-3">
          {/* Botón + */}
          <button class="p-2 rounded-full bg-white text-black hover:bg-blue-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>

          {/* Imagen de usuario */}
          <div class="h-[70%] flex items-center">
            <img
              src="/usuario.jpg" // Ruta a tu imagen de usuario
              alt="Foto de perfil"
              class="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
            />
          </div>
          
        </div>
      </header>

      {/* Menú lateral */}
      <aside class={`
        fixed left-0 z-30 mt-16
        transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        bg-gray-300 rounded-r-lg shadow-xl
        top-1/2 -translate-y-1/2
      `}>
        <nav class="p-4">
          <ul class="space-y-3">
            <li>
              <a href="#" class="block px-6 py-3 bg-yellow-300 rounded-lg hover:bg-yellow-400 transition-colors shadow">
                Inicio
              </a>
            </li>
            <li>
              <a href="#" class="block px-6 py-3 bg-yellow-300 rounded-lg hover:bg-yellow-400 transition-colors shadow">
                Proyectos
              </a>
            </li>
            <li>
              <a href="#" class="block px-6 py-3 bg-yellow-300 rounded-lg hover:bg-yellow-400 transition-colors shadow">
                Configuración
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Overlay para móviles */}
      {isOpen && (
        <div
          class="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}