import { JWTPayload, jwtVerify, SignJWT } from 'npm:jose'

/**
 * Crea un JWT.
 * @param contenidoToken {JWTPayload} el contenido que se le va pasar al token
 * @returns El token generado.
 */
export async function crearToken(contenidoToken: JWTPayload): Promise<string> {
  // Verificación de la variable de entorno.
  if (!Deno.env.has('SECRETO')) {
    throw 'Error interno del servidor, no se ha configurado la variable de entorno.'
  }

  const secreto = new TextEncoder().encode(Deno.env.get('SECRETO'))

  // Creación del token.
  return await new SignJWT(contenidoToken)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(secreto)
}

/**
 * Obtiene el contenido del token.
 * @param token {string} el token que se pasa de la cookie. 
 * @returns {Promise<JWTPayload>} el contenido del token
 */
export async function verificarToken(token: string): Promise<JWTPayload> {
  // Verificación de la variable de entorno.

  if (!Deno.env.has('SECRETO')) {
    throw 'Error interno del servidor, no se ha configurado la variable de entorno.'
  }

  const secreto = new TextEncoder().encode(Deno.env.get('SECRETO'))

  // Obtención del contenido del token.
  const { payload } = await jwtVerify(token, secreto)
  return payload
}
