import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export  function ButtonBlue1(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class="px-2 py-1 bg-sky-500/75 border-2  hover:bg-gray-200 transition-colors
        font-sans font-semibold rounded-lg shadow-md cursor-pointer"
    > Ingresar</button>
  );
}


export function ButtonBlue2(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class="w-1/4 px-2 py-1 bg-sky-500/75 border-2  hover:bg-gray-200 transition-colors
        font-sans font-semibold rounded-lg shadow-md cursor-pointer"
    > + Agregar Tarea / - Eliminar Tarea</button>
  );
}

export function ButtonBlue3(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class="w-1/4 px-2 py-1 bg-sky-500/75 border-2  hover:bg-gray-200 transition-colors
        font-sans font-semibold rounded-lg shadow-md cursor-pointer"
    > Tarea Completada</button>
  );
}

export  function ButtonOrange1(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class="px-2 py-1 bg-orange-400/75 border-2  hover:bg-gray-200 transition-colors
        font-sans font-semibold rounded-lg shadow-md cursor-pointer"
    > Ingresar</button>
  );
}


export function ButtonOrange2(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class="w-1/4 px-2 py-1 bg-orange-400/75 border-2  hover:bg-gray-200 transition-colors
        font-sans font-semibold rounded-lg shadow-md cursor-pointer"
    > + Agregar Tarea / - Eliminar Tarea</button>
  );
}

export function ButtonOrange3(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class="w-1/4 px-2 py-1 bg-orange-400/75 border-2  hover:bg-gray-200 transition-colors
        font-sans font-semibold rounded-lg shadow-md cursor-pointer"
    > Tarea Completada</button>
  );
}

export default function ButtonGreen1(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class="px-2 py-1 bg-green-400/75 border-2  hover:bg-gray-200 transition-colors
        font-sans font-semibold rounded-lg shadow-md cursor-pointer"
    > Ingresar</button>
  );
}


export function ButtonGreen2(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class="w-1/4 px-2 py-1 bg-green-400/75 border-2  hover:bg-gray-200 transition-colors
        font-sans font-semibold rounded-lg shadow-md cursor-pointer"
    > + Agregar Tarea / - Eliminar Tarea</button>
  );
}

export function ButtonGreen3(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class="w-1/4 px-2 py-1 bg-green-400/75 border-2  hover:bg-gray-200 transition-colors
        font-sans font-semibold rounded-lg shadow-md cursor-pointer"
    > Tarea Completada</button>
  );
}
