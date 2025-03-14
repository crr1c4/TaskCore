import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Header1(props:JSX.HTMLAttributes<HTMLHeadingElement>){
   return (
    <h1
        {...props}
        disabled={!IS_BROWSER||props.disabled}
        class="text text-4xl font-semibold drop-shadow-md
        bg-gradient-to-r from-sky-500/75 to-orange-400  bg-clip-text
         text-transparent"    
    >Primer tipo de encabezado</h1>
   );
}

export function Header2(props:JSX.HTMLAttributes<HTMLHeadingElement>){
    return (
     <h1
         {...props}
         disabled={!IS_BROWSER||props.disabled}
         class="text text-2xl font-semibold drop-shadow-md
                    no-underline hover:underline
                    cursor-pointer"    
     >Segundo tipo de encabezado</h1>
    );
 }

 export function Header3(props:JSX.HTMLAttributes<HTMLHeadingElement>){
    return (
     <h1
         {...props}
         disabled={!IS_BROWSER||props.disabled}
         class=" text-xl font-semibold drop-shadow-md
                    
                    cursor-pointer"    
     >Tercer <a href="..."
      class="underline hover:decoration-sky-500/75 
      ...">tipo</a> de encabezado</h1>
    );
 }


