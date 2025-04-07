// // Definición de la interfaz ColorProps que permite seleccionar entre tres colores predefinidos.
// interface ColorProps {
//   color: 'sky-500' | 'green-400' | 'orange-400'
// }
//
// /*Función cuyo objetivo en crear un componente enfocado en visualizar
// la descripción del proyecto (fecha, objetivo y autor) además de
// mostrar una animación enfocando un color de fondo en el componente*/
// export function DetallesProyecto(props: ColorProps) {
//   const { color } = props
//
//   return (
//     <div class='mb-8 rounded-lg  flex flex-col gap-y-2'>
//       <article
//         class={`bg-gray-200 w-full rounded-lg pl-2 pt-2 pb-2 pr-2
//                          transition-colors delay-150 duration-300 ease-in-out
//                       hover:-translate-y-1 hover:scale-110
//                       cursor-pointer mb-8 hover:bg-${color}`}
//       >
//         <div class='font-bold text-center'>Proyecto 1</div>
//         <time class='font'>Mar 14, 2025</time>
//         <div class='line-clamp-3 flex-wrap'>
//           Proyecto enfocado en la creación de una página web para la clase de Gestion de Proyectos impartida en el
//           Instituto Tecnológico de la Laguna
//         </div>
//         <div class='font-italic'>
//           Jose Torres
//         </div>
//       </article>
//
//       <article
//         class={`bg-gray-200 w-full rounded-lg pl-2 pt-2 pb-2 pr-2
//                          transition-colors delay-150 duration-300 ease-in-out
//                       hover:-translate-y-1 hover:scale-110
//                       cursor-pointer mb-8 hover:bg-${color}`}
//       >
//         <div class='font-bold text-center'>Proyecto 2</div>
//         <time class='font'>Mayo 21, 2025</time>
//         <div class='line-clamp-3 flex-wrap'>
//           Proyecto enfocado en la creación de una aplicación enfocada en los créditos complementarios del Instituto
//           Tecnológico de La Laguna
//         </div>
//         <div class='font-italic'>
//           Juan Alberto
//         </div>
//       </article>
//     </div>
//   )
// }
