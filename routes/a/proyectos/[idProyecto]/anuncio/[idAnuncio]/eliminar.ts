import { Handlers } from '$fresh/server.ts'
import Proyecto from '../../../../../../models/Proyecto.ts'

export const handler: Handlers = {
  async GET(_req, ctx) {
    try {
      const { idProyecto, idAnuncio } = ctx.params
      const proyecto = await Proyecto.obtener(idProyecto)
      await proyecto.eliminarAnuncio(idAnuncio)

      const params = new URLSearchParams({
        mensaje: 'Anuncio elminado correctamente.',
      })

      return new Response(null, {
        status: 303,
        headers: {
          Location: `/a/proyectos/${idProyecto}?${params.toString()}`,
        },
      })
    } catch (error) {
      const e = error as Error
      const params = new URLSearchParams({
        error: e.message,
      })

      return new Response(null, {
        status: 303,
        headers: {
          Location: `/a/proyectos/${ctx.params.idProyecto}?${params.toString()}`,
        },
      })
    }
  },
}
