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
