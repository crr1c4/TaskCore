// tests/proyectos.editar.test.ts
import { expect } from 'jsr:@std/expect'
import { createHandler, ServeHandlerInfo } from '$fresh/server.ts'
import manifest from '../fresh.gen.ts'
import config from '../fresh.config.ts'

const CONN_INFO: ServeHandlerInfo = {
  remoteAddr: { hostname: '127.0.0.1', port: 53496, transport: 'tcp' },
  completed: Promise.resolve(),
}

Deno.test('Ruta edición de proyectos', async (t) => {
  const handler = await createHandler(manifest, config)
  const BASE_URL = 'http://127.0.0.1/proyectos/1/editar'

  // Headers de autenticación mock
  const headers = new Headers()
  headers.set(
    'Cookie',
    'token=eyJhbGciOiJIUzI1NiJ9.eyJjb3JyZW8iOiJjaHJpczJAZ21haWwuY29tIiwibm9tYnJlIjoiQURNSU4iLCJyb2wiOiJhZG1pbiIsInRlbWEiOiIiLCJpYXQiOjE3NDYyMjg2NzIsImV4cCI6MTc0NjIzNTg3Mn0.XLbUW4aFeXX0nh_y_rIKrsINjWK2nPZxEkVhwV7-St8',
  )

  await t.step('Debería mostrar la página de edición', async () => {
    const resp = await handler(new Request(BASE_URL, { headers }), CONN_INFO)
    const pagina = await resp.text()
    
    expect(resp.status).toBe(200)
    
    // Verificar elementos estáticos principales
    expect(pagina).toContain('Miembros del Equipo')
    expect(pagina).toContain('Detalles del Proyecto')
    expect(pagina).toContain('Guardar cambios')
  })
})
