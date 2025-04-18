// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from './routes/_404.tsx'
import * as $_app from './routes/_app.tsx'
import * as $index from './routes/index.tsx'
import * as $ingresar from './routes/ingresar.tsx'
import * as $registro from './routes/registro.tsx'
import * as $salir from './routes/salir.ts'
import * as $usuario_middleware from './routes/usuario/_middleware.ts'
import * as $usuario_admin_middleware from './routes/usuario/admin/_middleware.ts'
import * as $usuario_admin_configuracion from './routes/usuario/admin/configuracion.tsx'
import * as $usuario_admin_index from './routes/usuario/admin/index.tsx'
import * as $usuario_miembro_middleware from './routes/usuario/miembro/_middleware.ts'
import * as $usuario_miembro_configuracion from './routes/usuario/miembro/configuracion.tsx'
import * as $usuario_miembro_index from './routes/usuario/miembro/index.tsx'
import * as $Counter from './islands/Counter.tsx'
import * as $Modal from './islands/Modal.tsx'
import type { Manifest } from '$fresh/server.ts'

const manifest = {
  routes: {
    './routes/_404.tsx': $_404,
    './routes/_app.tsx': $_app,
    './routes/index.tsx': $index,
    './routes/ingresar.tsx': $ingresar,
    './routes/registro.tsx': $registro,
    './routes/salir.ts': $salir,
    './routes/usuario/_middleware.ts': $usuario_middleware,
    './routes/usuario/admin/_middleware.ts': $usuario_admin_middleware,
    './routes/usuario/admin/configuracion.tsx': $usuario_admin_configuracion,
    './routes/usuario/admin/index.tsx': $usuario_admin_index,
    './routes/usuario/miembro/_middleware.ts': $usuario_miembro_middleware,
    './routes/usuario/miembro/configuracion.tsx': $usuario_miembro_configuracion,
    './routes/usuario/miembro/index.tsx': $usuario_miembro_index,
  },
  islands: {
    './islands/Counter.tsx': $Counter,
    './islands/Modal.tsx': $Modal,
  },
  baseUrl: import.meta.url,
} satisfies Manifest

export default manifest
