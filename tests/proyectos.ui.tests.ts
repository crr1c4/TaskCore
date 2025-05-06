import { expect } from 'jsr:@std/expect'
import { createHandler, ServeHandlerInfo } from '$fresh/server.ts'
import manifest from '../fresh.gen.ts'
import config from '../fresh.config.ts'

const CONN_INFO: ServeHandlerInfo = {
  remoteAddr: { hostname: '127.0.0.1', port: 53496, transport: 'tcp' },
  completed: Promise.resolve(),
}

Deno.test('Ruta proyectos', async (t) => {
  const handler = await createHandler(manifest, config)
  const BASE_URL = 'http://127.0.0.1/proyectos/1'

  // Crear headers de autenticación mock
  const headers = new Headers()
  headers.set(
    'Cookie',
    'token=eyJhbGciOiJIUzI1NiJ9.eyJjb3JyZW8iOiJjaHJpczJAZ21haWwuY29tIiwibm9tYnJlIjoiQURNSU4iLCJyb2wiOiJhZG1pbiIsInRlbWEiOiIiLCJpYXQiOjE3NDYyMjg2NzIsImV4cCI6MTc0NjIzNTg3Mn0.XLbUW4aFeXX0nh_y_rIKrsINjWK2nPZxEkVhwV7-St8',
  )

  await t.step('Debería mostrar la pagina de proyectos', async () => {
    const resp = await handler(new Request(BASE_URL, { headers }), CONN_INFO)

    const pagina = await resp.text()
    expect(resp.status).toBe(200)

    expect(pagina).toContain('Equipo')
    expect(pagina).toContain('Tareas')
    expect(pagina).toContain('anuncios')
    expect(pagina).toContain('Progreso')
  })
})
