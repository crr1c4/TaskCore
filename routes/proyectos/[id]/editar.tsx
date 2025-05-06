// routes/proyectos/[id]/editar.tsx
import { PageProps } from "$fresh/server.ts";
import Encabezado from "../../../islands/EncabezadoPrincipal.tsx";

// Datos de ejemplo para las tareas
const tareasEjemplo = [
  { id: 1, nombre: "Diseñar UI principal", estado: "completado", fecha: "01 abr. 2024" },
  { id: 2, nombre: "Implementar autenticación", estado: "en progreso", fecha: "05 abr. 2024" },
  { id: 3, nombre: "Crear API de tareas", estado: "expirado", fecha: "10 abr. 2024" }
];

// Objeto del proyecto
const proyecto = {
  nombre: "Plataforma TaskCore",
  descripcion: "Desarrollo de sistema de gestión de proyectos colaborativo",
  fechaCreacion: "15 mar. 2024",
  equipo: [
    { correo: "christian@taskcore.com", rol: "Administrador" },
    { correo: "daniel@taskcore.com", rol: "Miembro" },
    { correo: "abel@taskcore.com", rol: "Miembro" },
    { correo: "dante@taskcore.com", rol: "Miembro" }
  ],
  anuncios: [
    {
      titulo: "Reunión de revisión",
      contenido: "Recordatorio: reunión de progreso mañana a las 10:00 AM para revisar las tareas en progreso",
      fecha: "08 abr. 2024"
    }
  ],
  tareas: tareasEjemplo
};

export default function EditarProyecto({ params }: PageProps) {
  return (
    <div class="dark pt-20 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Encabezado rol="admin" />

      {/* Header de edición */}
      <header class="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
        <div class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div class="flex-1 space-y-4">
              <input
                type="text"
                value={proyecto.nombre}
                class="text-3xl font-bold bg-transparent border-none focus:ring-0 w-full text-gray-900 dark:text-white placeholder-gray-400"
                placeholder="Nombre del proyecto"
              />
              <textarea
                value={proyecto.descripcion}
                class="w-full bg-transparent border-none focus:ring-0 resize-none text-gray-600 dark:text-gray-300 placeholder-gray-400"
                placeholder="Descripción del proyecto"
                rows={2}
              />
            </div>
            <button class="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
              Guardar cambios
            </button>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Sección de Equipo */}
          <section class="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 transition-colors duration-200">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Miembros del Equipo</h2>
              <button class="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 px-4 py-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                <span class="font-medium">Agregar miembro</span>
              </button>
            </div>
            
            {/* Lista de miembros */}
            <ul class="space-y-4">
              {proyecto.equipo.map((miembro) => (
                <li class="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div class="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                    <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-gray-900 dark:text-white font-medium truncate">{miembro.correo}</p>
                  </div>
                  <span class={`px-3 py-1 text-sm font-medium rounded-full ${
                    miembro.rol === 'Administrador' 
                      ? 'text-blue-800 dark:text-blue-200 bg-blue-100 dark:bg-blue-900/20'
                      : 'text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-600'
                  }`}>
                    {miembro.rol}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Sección de Detalles del Proyecto */}
          <section class="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 transition-colors duration-200">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Detalles del Proyecto</h2>
            
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nombre del Proyecto
                </label>
                <input
                  type="text"
                  value={proyecto.nombre}
                  class="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 text-lg font-medium"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Descripción
                </label>
                <textarea
                  rows={4}
                  class="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                >{proyecto.descripcion}</textarea>
              </div>

              <div class="flex items-center gap-4">
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Fecha de creación
                  </label>
                  <p class="text-gray-900 dark:text-white">{proyecto.fechaCreacion}</p>
                </div>
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ID del Proyecto
                  </label>
                  <p class="text-gray-900 dark:text-white">{crypto.randomUUID()}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
