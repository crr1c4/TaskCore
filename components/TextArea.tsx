import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export  function TextAreaBlue(props: JSX.HTMLAttributes<HTMLTextAreaElement>){
    return(
        <textarea
            {...props}
            disabled={!IS_BROWSER || props.disabled}
            class=" mr-3 w-80 h-64
                    border-2 border-sky-500 rounded-lg
                    cursor-text"
            placeholder="Ingresa un comentario al proyecto"
            ></textarea>
    );
}

export  function TextAreaGreen(props: JSX.HTMLAttributes<HTMLTextAreaElement>){
    return(
        <textarea
            {...props}
            disabled={!IS_BROWSER || props.disabled}
            class=" mr-3 w-80 h-64
                    border-2 border-green-400 rounded-lg
                    cursor-text"
            placeholder="Ingresa un comentario al proyecto"
            ></textarea>
    );
}

export  function TextAreaOrange(props: JSX.HTMLAttributes<HTMLTextAreaElement>){
    return(
        <textarea
            {...props}
            disabled={!IS_BROWSER || props.disabled}
            class="mr-3 w-80 h-64
                    border-2 border-orange-400 rounded-lg
                    cursor-text"
            placeholder="Ingresa un comentario al proyecto"
            ></textarea>
    );
}
