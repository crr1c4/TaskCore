import { createHandler, ServeHandlerInfo } from '$fresh/server.ts'
import manifest from '../fresh.gen.ts'
import config from '../fresh.config.ts'
import { expect } from 'jsr:@std/expect'

/**
 * Información de conexión para la prueba del manejador de solicitudes.
 * @type {ServeHandlerInfo}
 */
const CONN_INFO: ServeHandlerInfo = {
  remoteAddr: { hostname: '127.0.0.1', port: 53496, transport: 'tcp' },
  completed: Promise.resolve(),
}

/**
 * Prueba de integración HTTP para verificar la carga de la página de inicio.
 */
Deno.test.ignore('HTTP.', async (t) => {
  const handler = await createHandler(manifest, config)

  await t.step('#1 GET /', async () => {
    const resp = await handler(new Request('http://127.0.0.1/'), CONN_INFO)
    expect(resp.status).toBe(200)
  })
})

Deno.test('GET /proyecto/ee4e1e7b-1835-4d1b-98b6-8e206c2fcf75/tareas/0c987ce6-7862-440f-ab30-d3aa0017bdda', async (t) => {
  const handler = await createHandler(manifest, config)
  const BASE_URL = 'http://127.0.0.1/proyecto/ee4e1e7b-1835-4d1b-98b6-8e206c2fcf75/tareas/0c987ce6-7862-440f-ab30-d3aa0017bdda'

  await t.step('Debería cargar correctamente la UI de una tarea en especifico', async () => {
    // Simular cookie de sesión válida
    const headers = new Headers()
    headers.set('Cookie', 'token=eyJhbGciOiJIUzI1NiJ9.eyJjb3JyZW8iOiJhZG1pbjFAZ21haWwuY29tIiwibm9tYnJlIjoiY3IxYzQiLCJyb2wiOiJhZG1pbiIsInRlbWEiOiJkYXJrIiwiaWF0IjoxNzQ2ODQ2NjkzLCJleHAiOjE3NDY4NTM4OTN9.J8Deb6jhughRYpf_MoETT3NOOYa7ECHJ46L_tHygq7I')

    const resp = await handler(
      new Request(BASE_URL, { headers }),
      CONN_INFO,
    )

    expect(resp.status).toBe(200)

    const body = await resp.text()
    expect(body).toContain('Detalles de la Tarea')
    expect(body).toContain('Estado')
    expect(body).toContain('Comentarios')
  })
})

// await t.step('Debería redirigir cuando no hay autenticación', async () => {
//   const resp = await handler(new Request(BASE_URL), CONN_INFO)
//   expect(resp.status).toBe(302)
//   expect(resp.headers.get('location')).toMatch(/auth\/login/)
// })
//
//   const handler = await createHandler(manifest, config)
//   const BASE_URL = 'http://127.0.0.1/usuario/admin/crear-proyecto'
//
//   // Crear headers de autenticación mock
//   const headers = new Headers()
//   headers.set('Cookie', 'token=eyJhbGciOiJIUzI1NiJ9.eyJjb3JyZW8iOiJjaHJpczJAZ21haWwuY29tIiwibm9tYnJlIjoiQURNSU4iLCJyb2wiOiJhZG1pbiIsInRlbWEiOiIiLCJpYXQiOjE3NDQ0MzE4MjcsImV4cCI6MTc0NDQzOTAyN30.E9gEwmLXM9fhoujvA1vJjOeAzY0aYyvVmbCRSEZLt_Y')
//
//   await t.step('Debería mostrar el formulario de creación', async () => {
//     const resp = await handler(new Request(BASE_URL, { headers }), CONN_INFO)
//
//     // Verificar respuesta exitosa
//     expect(resp.status).toBe(200)
//
//     // Verificar elementos clave en el HTML
//     const body = await resp.text()
//     expect(body).toContain('<h1 class="text-4xl">Crear un nuevo proyecto</h1>')
//     expect(body).toContain('placeholder="Correo de miembro"')
//     expect(body).toContain('Crear un nuevo proyecto')
//   })
//
//   await t.step('Debería mostrar miembros mock en el resumen', async () => {
//     const resp = await handler(new Request(BASE_URL, { headers }), CONN_INFO)
//     const body = await resp.text()
//
//     // Verificar miembros de ejemplo
//     expect(body).toContain('miembro@correo.com')
//     expect(body).toContain('miembro_correo_largo@correo.com')
//     expect(body).toContain('otro.miembro@correo.com')
//
//     // Verificar estructura de los badges
//     expect(body).toContain('rounded-full bg-sky-400')
//     expect(body.match(/div class="rounded-full/g)?.length).toBeGreaterThan(5)
//   })
// })

// Deno.test('Ruta /usuario/crear-proyecto', async (t) => {
