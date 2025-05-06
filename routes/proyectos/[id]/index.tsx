import { PageProps } from "$fresh/server.ts";
import Encabezado from '../../../islands/EncabezadoPrincipal.tsx'

const tareasEjemplo = [
  { id: 1, nombre: "Diseñar UI principal", estado: "completado", fecha: "01 abr. 2024" },
  { id: 2, nombre: "Implementar autenticación", estado: "en progreso", fecha: "05 abr. 2024" },
  { id: 3, nombre: "Crear API de tareas", estado: "expirado", fecha: "10 abr. 2024" },
  { id: 4, nombre: "Testing de componentes", estado: "expirado", fecha: "12 abr. 2024" },
  { id: 5, nombre: "Documentación técnica", estado: "completado", fecha: "28 mar. 2023" },
  { id: 6, nombre: "Optimizar rendimiento", estado: "en progreso", fecha: "07 abr. 2024" },
  { id: 7, nombre: "Revisión de código", estado: "completado", fecha: "15 mar. 2024" },
  { id: 8, nombre: "Implementar CI/CD", estado: "en progreso", fecha: "08 abr. 2024" },
  { id: 9, nombre: "Diseñar base de datos", estado: "completado", fecha: "20 feb. 2024" },
  { id: 10, nombre: "Configurar servidores", estado: "expirado", fecha: "01 mar. 2024" },
  { id: 11, nombre: "Entrenamiento equipo", estado: "completado", fecha: "10 ene. 2024" },
  { id: 12, nombre: "Pruebas de seguridad", estado: "en progreso", fecha: "09 abr. 2024" },
  { id: 13, nombre: "Diseñar logo", estado: "expirado", fecha: "15 dic. 2023" },
  { id: 14, nombre: "Plan de marketing", estado: "completado", fecha: "28 feb. 2024" },
  { id: 15, nombre: "Análisis de competencia", estado: "expirado", fecha: "30 nov. 2023" }
];

export default function PaginaProyecto() {
  
  // Calcular estadísticas
  const totalTareas = tareasEjemplo.length;
  const estados = {
    completado: tareasEjemplo.filter(t => t.estado === "completado").length,
    enProgreso: tareasEjemplo.filter(t => t.estado === "en progreso").length,
    expirado: tareasEjemplo.filter(t => t.estado === "expirado").length,
  };

  // Calcular porcentajes
  const porcentajes = {
    completado: Math.round((estados.completado / totalTareas) * 100),
    enProgreso: Math.round((estados.enProgreso / totalTareas) * 100),
    expirado: Math.round((estados.expirado / totalTareas) * 100),
  };

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

  return (
    <div class="dark pt-20 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Encabezado rol='admin' />

      {/* Header */}
      <header class="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
        <div class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div class="mb-4 md:mb-0">
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{proyecto.nombre}</h1>
              <p class="mt-2 text-gray-600 dark:text-gray-300">{proyecto.descripcion}</p>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Creado el {proyecto.fechaCreacion}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Columna izquierda - Equipo y Resumen */}
          <div class="lg:col-span-1 space-y-6">
            {/* Sección Equipo */}
            <section class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Equipo</h2>
                <button class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                </button>
              </div>
              <ul class="space-y-3">
                {proyecto.equipo.map((miembro) => (
                  <li class="flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                    <div class="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                      <span class="text-blue-600 dark:text-blue-300 font-medium">
                        {miembro.correo[0].toUpperCase()}
                      </span>
                    </div>
                    <div class="min-w-0">
                      <p class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{miembro.correo}</p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">{miembro.rol}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Sección Resumen con Gráfica */}
            <section class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Resumen de Progreso</h2>
              
              {/* Gráfica circular */}
              <div class="flex items-center justify-center mb-6">
                <div class="relative w-40 h-40">
                  <div class="absolute inset-0">
                    <div 
                      class="absolute w-full h-full rounded-full border-8 border-white dark:border-gray-800"
                      style={{
                        background: `conic-gradient(
                          #10B981 0 ${porcentajes.completado}%,
                          #3B82F6 ${porcentajes.completado}% ${porcentajes.completado + porcentajes.enProgreso}%,
                          #EF4444 ${porcentajes.completado + porcentajes.enProgreso}% 100%
                        )`
                      }}
                    ></div>
                  </div>
                  <div class="absolute inset-0 flex items-center justify-center">
                    <span class="text-xl font-bold text-gray-700 dark:text-gray-200">
                      {totalTareas}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Leyenda con porcentajes */}
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span class="text-sm dark:text-gray-300">Completado</span>
                  </div>
                  <span class="text-sm font-medium dark:text-gray-300">{porcentajes.completado}%</span>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span class="text-sm dark:text-gray-300">En Progreso</span>
                  </div>
                  <span class="text-sm font-medium dark:text-gray-300">{porcentajes.enProgreso}%</span>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span class="text-sm dark:text-gray-300">Expirado</span>
                  </div>
                  <span class="text-sm font-medium dark:text-gray-300">{porcentajes.expirado}%</span>
                </div>
              </div>
            </section>
          </div>

          {/* Columna derecha - Contenido */}
          <div class="lg:col-span-2 space-y-6">
            
            {/* Anuncios */}
            <section class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Últimos anuncios</h2>
                <button class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                </button>
              </div>
              <div class="space-y-4">
                {proyecto.anuncios.map((anuncio) => (
                  <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg transition-colors duration-200">
                    <h3 class="text-lg font-medium text-blue-800 dark:text-blue-200">{anuncio.titulo}</h3>
                    <p class="mt-1 text-blue-700 dark:text-blue-300">{anuncio.contenido}</p>
                    <time class="mt-2 block text-sm text-blue-600 dark:text-blue-400">{anuncio.fecha}</time>
                  </div>
                ))}
              </div>
            </section>

            {/* Tareas */}
            <section class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-colors duration-200">
              <div class="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Tareas del proyecto</h2>
                <button class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                </button>
              </div>
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead class="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tarea</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Estado</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Fecha límite</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {proyecto.tareas.map((tarea) => (
                      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{tarea.nombre}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span class={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            tarea.estado === 'completado' ? 
                              'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                            tarea.estado === 'en progreso' ? 
                              'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                              'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                          }`}>
                            {tarea.estado}
                          </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {tarea.fecha}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
