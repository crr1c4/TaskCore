/* Importación de librerías y componentes necesarios para la aplicación.
 Se incluyen señales de estado, inputs, botones, áreas de texto, encabezados y otros componentes visuales.*/
// import { useSignal } from '@preact/signals'
// import { TextArea } from '../components/TextArea.tsx'
// import { CampoIngreso, InputBusqueda } from '../components/Input.tsx'
// import { DivTareas } from '../components/Div.tsx'
// import { EncabezadoPrincipal, Header2, Header3 } from '../components/Headers.tsx'
// import { DetallesProyecto } from '../components/Proyectos.tsx'
// import { BotonIngresar, ButtonAcciones, ButtonTareaCompletada } from '../components/Button.tsx'

/* Componente principal Home: Renderiza la estructura de la página principal con distintos componentes.
 Muestra encabezados, botones, inputs, listas de tareas y detalles de proyectos.*/
export default function Home() {
  // const count = useSignal(3)
  return (
    <div class='text-4xl'>
      PAGINA PRINCIPAL
    </div>
    // <div class='pl-10 pb-7'>
    //   <h2>Tipos de encabezados</h2>
    //   <EncabezadoPrincipal></EncabezadoPrincipal>
    //   <Header2></Header2>
    //   <Header3></Header3>
    //   <h2>Tipos de botones</h2>
    //   <ButtonIngresar color='sky-500' />
    //   <ButtonAcciones color='sky-500' />
    //   <ButtonTareaCompletada color='sky-500' />
    //   <ButtonIngresar color='green-400' />
    //   <ButtonAcciones color='green-400' />
    //   <ButtonTareaCompletada color='green-400' />
    //   <ButtonIngresar color='orange-400' />
    //   <ButtonAcciones color='orange-400' />
    //   <ButtonTareaCompletada color='orange-400' />
    //   <h2>Tipos de TextArea</h2>
    //   <TextArea color='sky-500' />
    //   <TextArea color='green-400' />
    //   <TextArea color='orange-400' />
    //   <h2>Tipos de Input</h2>
    //   <div class='pr-10'>
    //     <InputBusqueda color='sky-500' />
    //     <CampoIngreso color='sky-500' />
    //     <InputBusqueda color='green-400' />
    //     <CampoIngreso color='green-400' />
    //     <InputBusqueda color='orange-400' />
    //     <CampoIngreso color='orange-400' />
    //   </div>
    //
    //   <h2>Lista de tareas</h2>
    //   <div class='flex gap-x-4 items-start'>
    //     <DivTareas color='sky-500' />
    //     <DivTareas color='green-400' />
    //     <DivTareas color='orange-400' />
    //   </div>
    //   <h2>Detalles Proyecto</h2>
    //   <div class='pb-5 flex gap-x-4 items-start'>
    //     <DetallesProyecto color='sky-500' />
    //     <DetallesProyecto color='green-400' />
    //     <DetallesProyecto color='orange-400' />
    //   </div>
    // </div>
  )
}
