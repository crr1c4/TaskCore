import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function DivTareasBlue(props: JSX.HTMLAttributes<HTMLDivElement>){
    return(
      <div
            {...props}
            disabled={!IS_BROWSER||props.disabled}
            class="rounded-lg flex flex-col gap-y-2"
            >
                <div class="w-64 bg-gray-200  hover:bg-sky-500/75 transition-colors
                     cursor-pointer rounded-r-lg pb-3 pt-3 text-center">Tarea 1</div>
                <div class="w-64 bg-gray-200 hover:bg-sky-500/75 transition-colors
                       cursor-pointer rounded-r-lg pb-3 pt-3 text-center">Tarea 2</div>
                <div class="w-64 bg-gray-200  hover:bg-sky-500/75 transition-colors
                       cursor-pointer rounded-r-lg pb-3 pt-3 text-center">Tarea 3</div>
                <div class="w-64 bg-gray-200  hover:bg-sky-500/75 transition-colors
                       cursor-pointer rounded-r-lg pb-3 pt-3 text-center">Tarea 4</div>
                <div class="w-64 bg-gray-200  hover:bg-sky-500/75 transition-colors
                       cursor-pointer rounded-r-lg pb-3 pt-3 text-center">Tarea 5</div>
      </div>
      );
  }

  export function DivTareasGreen(props: JSX.HTMLAttributes<HTMLDivElement>){
       return(
         <div
               {...props}
               disabled={!IS_BROWSER||props.disabled}
               class="rounded-lg flex flex-col gap-y-2"
               >
                   <div class="w-64 bg-gray-200  hover:bg-green-400 transition-colors
                        cursor-pointer rounded-r-lg pb-3 pt-3 text-center">Tarea 1</div>
                   <div class="w-64 bg-gray-200 hover:bg-green-400 transition-colors
                          cursor-pointer rounded-r-lg pb-3 pt-3 text-center">Tarea 2</div>
                   <div class="w-64 bg-gray-200  hover:bg-green-400 transition-colors
                          cursor-pointer rounded-r-lg pb-3 pt-3 text-center">Tarea 3</div>
                   <div class="w-64 bg-gray-200  hover:bg-green-400 transition-colors
                          cursor-pointer rounded-r-lg pb-3 pt-3 text-center">Tarea 4</div>
                   <div class="w-64 bg-gray-200  hover:bg-green-400 transition-colors
                          cursor-pointer rounded-r-lg pb-3 pt-3 text-center">Tarea 5</div>
         </div>
         );
     }

     export function DivTareasOrange(props: JSX.HTMLAttributes<HTMLDivElement>){
       return(
         <div
               {...props}
               disabled={!IS_BROWSER||props.disabled}
               class="rounded-lg  flex flex-col gap-y-2"
               >
                   <div class="w-64 bg-gray-200  hover:bg-orange-400 transition-colors
                        cursor-pointer rounded-r-lg pb-3 pt-3 text-center">Tarea 1</div>
                   <div class="w-64 bg-gray-200 hover:bg-orange-400 transition-colors
                          cursor-pointer rounded-r-lg pb-3 pt-3 text-center">Tarea 2</div>
                   <div class="w-64 bg-gray-200  hover:bg-orange-400 transition-colors
                          cursor-pointer rounded-r-lg pb-3 pt-3 text-center">Tarea 3</div>
                   <div class="w-64 bg-gray-200  hover:bg-orange-400 transition-colors
                          cursor-pointer rounded-r-lg pb-3 pt-3 text-center">Tarea 4</div>
                   <div class="w-64 bg-gray-200  hover:bg-orange-400 transition-colors
                          cursor-pointer rounded-r-lg pb-3 pt-3 text-center">Tarea 5</div>
         </div>
         );
     }