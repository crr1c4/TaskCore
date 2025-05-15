/**
 * Componente de pie de página fijo
 * @component
 * @returns Pie de página con:
 * - Fondo semitransparente oscuro
 * - Posición fija en la parte inferior
 * - Contenido centrado y responsive
 * - Información de copyright y marca
 * @description
 * Este componente renderiza un footer que:
 * - Permanece fijo en la parte inferior de la pantalla
 * - Se adapta a dispositivos móviles y desktop
 * - Muestra el nombre de la empresa y copyright
 * - Incluye el nombre de la aplicación (TaskCore)
 * @example
 * <Footer />
 */
export default function Footer() {
  return (
    <footer class='fixed bottom-0 left-0 w-full bg-gray-900/50 text-white py-4 z-10 select-none'>
      <div class='container mx-auto px-4 flex flex-col md:flex-row justify-between items-center'>
        <div class='flex items-center gap-2'>
          <p class='text-lg font-semibold'>Navetix © 2025</p>
        </div>
        <p class='text-sm mt-2 md:mt-0 flex flex-col justify-center items-center'>
          <span class='font-medium'>TaskCore</span>
        </p>
      </div>
    </footer>
  )
}
