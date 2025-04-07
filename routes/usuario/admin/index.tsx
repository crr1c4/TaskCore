import { FreshContext } from '$fresh/src/server/mod.ts'
import Encabezado from '../../../islands/EncabezadoPrincipal.tsx'
import { ModalLink } from '../../../islands/Modal.tsx'
import { ComponenteProyecto } from '../../../islands/Proyecto.tsx'
import { Proyecto } from '../../../utils/db/modelos/proyecto.ts'
import { EstadoUsuario } from '../_middleware.ts'

// TODO: Acomodar el fondo
export default function Home(ctx: FreshContext<EstadoUsuario>) {
  // Obtiene la URL actual y extrae los parámetros 'error', 'nombre' y 'correo' (si existen).
  const url = ctx.url
  const resultado = url.searchParams.get('resultado')?.replaceAll('"', '') || ''
  // Datos de ejemplo
  const proyectosEjemplo: Proyecto[] = [
    {
      id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
      nombre: 'Plataforma de Gestión de Tareas',
      descripcion: 'Desarrollo de aplicación web para gestión colaborativa de proyectos',
      fechaCreacion: new Date('2024-03-15'),
      correoAdmin: 'admin@taskmanager.com',
      correosIntegrantesEquipo: [
        'frontend@taskmanager.com',
        'backend@taskmanager.com',
        'ux@taskmanager.com',
      ],
    },
    {
      id: 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
      nombre: 'App Fitness Personalizado',
      descripcion: 'Aplicación móvil para seguimiento de rutinas de ejercicio y nutrición',
      fechaCreacion: new Date('2024-02-28'),
      correoAdmin: 'ceo@fitnessapp.com',
      correosIntegrantesEquipo: [
        'dev.mobile@fitnessapp.com',
        'design@fitnessapp.com',
        'qa@fitnessapp.com',
      ],
    },
    {
      id: 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
      nombre: 'Tienda Online de Arte',
      descripcion: 'Plataforma de venta de obras de arte contemporáneo',
      fechaCreacion: new Date('2024-01-10'),
      correoAdmin: 'arte@galeria.com',
      correosIntegrantesEquipo: [
        'webmaster@galeria.com',
        'ventas@galeria.com',
        'soporte@galeria.com',
      ],
    },
    {
      id: 'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8g',
      nombre: 'Red Social para Fotógrafos',
      descripcion: 'Plataforma colaborativa para compartir trabajos fotográficos',
      fechaCreacion: new Date('2023-12-05'),
      correoAdmin: 'admin@fotored.com',
      correosIntegrantesEquipo: [
        'devops@fotored.com',
        'moderador@fotored.com',
        'smm@fotored.com',
      ],
    },
    {
      id: 'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8g9h',
      nombre: 'Plataforma de Cursos Interactivos',
      descripcion: 'Sistema de aprendizaje en línea con contenido interactivo',
      fechaCreacion: new Date('2024-04-01'),
      correoAdmin: 'soporte@cursosenlinea.com',
      correosIntegrantesEquipo: [
        'instructores@cursosenlinea.com',
        'soporte.tecnico@cursosenlinea.com',
        'diseño.educativo@cursosenlinea.com',
      ],
    },
  ]

  return (
    <div class={`h-screen ${ctx.state.tema} dark:bg-slate-800`}>
      <Encabezado rol='admin' />
      {resultado === 'ok'
        ? (
          <ModalLink
            mensaje='Configuración guardada.'
            enlace='/usuario/admin'
            textoEnlace='Ok'
          />
        )
        : ''}
      <main class='px-6 md:px-20 pt-24'>
        {/* Sección de proyectos (componente separado) */}
        <div class='mb-8'>
          <h2 class='text-2xl font-bold mb-6 text-gray-900 dark:text-white select-none'>Proyectos</h2>
          <div class='grid grid-cols-1 grid-flow-row sm:grid-cols-2 lg:grid-rows-3 lg:grid-cols-3 gap-6'>
            {proyectosEjemplo.map((proyecto) => (
              <ComponenteProyecto
                key={proyecto.id}
                rol='admin'
                proyecto={proyecto}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
