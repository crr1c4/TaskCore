import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function InputBusquedaBlue(props: JSX.HTMLAttributes<HTMLInputElement>){
  return(
      <input
          {...props}
          disabled={!IS_BROWSER || props.disabled}
          class="w-96 h-12 pl-3 shadow-lg bg-gray-275 rounded-lg 
                  transition delay-150 duration-300 ease-in-out
                      hover:-translate-y-1 hover:scale-110
                      hover:shadow-sky-500/75
                        cursor-text"
          placeholder="Busqueda"
      ></input>
  );
}

export function InputIngresarBlue(props: JSX.HTMLAttributes<HTMLInputElement>){
  return(
  <input
        {...props}
        disabled={!IS_BROWSER||props.disabled}
        class="w-72 h-10 pl-3 bg-gray-200 border-2 border-sky-500/75 
        rounded-lg cursor-text"
        placeholder="Ingresa tu dato"
        >
  </input>
  );
}


export function InputBusquedaGreen(props: JSX.HTMLAttributes<HTMLInputElement>){
  return(
      <input
          {...props}
          disabled={!IS_BROWSER || props.disabled}
          class="w-96 h-12 pl-3 shadow-lg bg-gray-275 rounded-lg 
                  transition delay-150 duration-300 ease-in-out
                      hover:-translate-y-1 hover:scale-110
                      hover:shadow-green-400
                        cursor-text"
          placeholder="Busqueda"
      ></input>
  );
}

export function InputIngresarGreen(props: JSX.HTMLAttributes<HTMLInputElement>){
  return(
  <input
        {...props}
        disabled={!IS_BROWSER||props.disabled}
        class="w-72 h-10 pl-3 bg-gray-200 border-2 border-green-400 
        rounded-lg cursor-text"
        placeholder="Ingresa tu dato"
        >
  </input>
  );
}


export function InputBusquedaOrange(props: JSX.HTMLAttributes<HTMLInputElement>){
  return(
      <input
          {...props}
          disabled={!IS_BROWSER || props.disabled}
          class="w-96 h-12 pl-3 shadow-lg bg-gray-275 rounded-lg 
                  transition delay-150 duration-300 ease-in-out
                      hover:-translate-y-1 hover:scale-110
                      hover:shadow-orange-400
                        cursor-text"
          placeholder="Busqueda"
      ></input>
  );
}

export function InputIngresarOrange(props: JSX.HTMLAttributes<HTMLInputElement>){
  return(
  <input
        {...props}
        disabled={!IS_BROWSER||props.disabled}
        class="w-72 h-10 pl-3 bg-gray-200 border-2 border-orange-400 
        rounded-lg cursor-text"
        placeholder="Ingresa tu dato"
        >
  </input>
  );
}

