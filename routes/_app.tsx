import { type PageProps } from "$fresh/server.ts";


/**
 * Componente raíz de la aplicación que envuelve todas las páginas.
 * Proporciona la estructura HTML base y elementos comunes del `<head>` para todas las páginas.
 * 
 * Configura:
 * - Estructura básica del documento HTML5
 * - Codificación de caracteres UTF-8
 * - Metaetiqueta de viewport responsivo
 * - Título de la aplicación (TaskCore)
 * - Hoja de estilos global
 * 
 * Renderiza el componente de la página actual dentro del `<body>`.
 * 
 * @param {PageProps} props - Propiedades del componente que incluyen:
 *   - `Component`: El componente de la página actual a renderizar
 * @returns El diseño base de la aplicación con el contenido de la página actual
 */
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>TaskCore</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
