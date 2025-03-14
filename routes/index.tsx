import { useSignal } from '@preact/signals'
import { TextAreaBlue, TextAreaGreen, TextAreaOrange } from '../components/TextArea.tsx'
import {
  InputBusquedaBlue,
  InputBusquedaGreen,
  InputBusquedaOrange,
  InputIngresarBlue,
  InputIngresarGreen,
  InputIngresarOrange,
} from '../components/Input.tsx'
import { DivTareasBlue, DivTareasGreen, DivTareasOrange } from '../components/Div.tsx'
import { Header1, Header2, Header3 } from '../components/Headers.tsx'
import { DetallesProyecto } from '../components/Proyectos.tsx'
import ButtonGreen1, {
  ButtonBlue1,
  ButtonBlue2,
  ButtonBlue3,
  ButtonGreen2,
  ButtonGreen3,
  ButtonOrange1,
  ButtonOrange2,
  ButtonOrange3,
} from '../components/Button.tsx'

export default function Home() {
  const count = useSignal(3)
  return (
    <div class='pl-10 pb-7'>
      <h2>Tipos de encabezados</h2>
      <Header1></Header1>
      <Header2></Header2>
      <Header3></Header3>
      <h2>Tipos de botones</h2>
      <ButtonBlue1></ButtonBlue1>
      <ButtonBlue2></ButtonBlue2>
      <ButtonBlue3></ButtonBlue3>
      <ButtonGreen1></ButtonGreen1>
      <ButtonGreen2></ButtonGreen2>
      <ButtonGreen3></ButtonGreen3>
      <ButtonOrange1></ButtonOrange1>
      <ButtonOrange2></ButtonOrange2>
      <ButtonOrange3></ButtonOrange3>
      <h2>Tipos de TextArea</h2>
      <TextAreaBlue></TextAreaBlue>
      <TextAreaGreen></TextAreaGreen>
      <TextAreaOrange></TextAreaOrange>
      <h2>Tipos de Input</h2>
      <div class='pr-10'>
        <InputBusquedaBlue></InputBusquedaBlue>
        <InputIngresarBlue></InputIngresarBlue>
        <InputBusquedaGreen></InputBusquedaGreen>
        <InputIngresarGreen></InputIngresarGreen>
        <InputBusquedaOrange></InputBusquedaOrange>
        <InputIngresarOrange></InputIngresarOrange>
      </div>

      <h2>Lista de tareas</h2>
      <div class='flex gap-x-4 items-start'>
        <DivTareasBlue></DivTareasBlue>
        <DivTareasGreen></DivTareasGreen>
        <DivTareasOrange></DivTareasOrange>
      </div>
      <h2>Detalles Proyecto</h2>
      <div class='pb-5 flex gap-x-4 items-start'>
        <DetallesProyecto color='green-400' />
        <DetallesProyecto color='orange-400' />
        <DetallesProyecto color='sky-500' />
      </div>
    </div>
  )
}
