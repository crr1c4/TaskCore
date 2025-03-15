import { Handlers } from "$fresh/server.ts";
import { deleteCookie } from "jsr:@std/http/cookie";

/**
 * Manejador para cerrar sesión eliminando la cookie de autenticación.
 * @type {Handlers} Manejador de solicitudes HTTP.
 */
export const handler: Handlers = {
  /**
   * Maneja la solicitud GET para cerrar sesión.
   */
  GET() {
    const headers = new Headers();

    // Eliminar la cookie de autenticación.
    deleteCookie(headers, "token");

    // Redirigir al usuario a la página de inicio de sesión.
    headers.set("Location", "/ingresar");

    return new Response(null, {
      status: 302, // Redirección temporal.
      headers,
    });
  },
};
