interface ColorProps {
  color: 'sky-500' | 'green-400' | 'orange-400'
}

export function DetallesProyecto(props: ColorProps) {
  const { color } = props

  return (
    <div class='mb-8 rounded-lg  flex flex-col gap-y-2'>
      <article
        class={`bg-gray-200 border-bg-${color} w-full rounded-lg pl-2 pt-2 pb-2 pr-2
                         transition-colors delay-150 duration-300 ease-in-out
                      hover:-translate-y-1 hover:scale-110
                      cursor-pointer mb-8 hover:bg-${color}`}
      >
        <div class='font-bold text-center'>Proyecto 1</div>
        <time class='font'>Mar 14, 2025</time>
        <div class='line-clamp-3 flex-wrap'>
          Proyecto enfocado en la creación de una página web para la clase de Gestion de Proyectos impartida en el
          Instituto Tecnológico de la Laguna
        </div>
        <div class='font-italic'>
          Jose Torres
        </div>
      </article>

      <article class='bg-gray-200 border-sky-500 w-full rounded-lg pl-2 pt-2 pb-2 pr-2
      transition-colors delay-150 duration-300 ease-in-out
      hover:-translate-y-1 hover:scale-110
      cursor-pointer hover:bg-sky-500'>
        <div class='font-bold text-center'>Proyecto 2</div>
        <time class='font'>Mayo 21, 2025</time>
        <div class='line-clamp-3 flex-wrap'>
          Proyecto enfocado en la creación de una aplicación enfocada en los créditos complementarios del Instituto
          Tecnológico de La Laguna
        </div>
        <div class='font-italic'>
          Juan Alberto
        </div>
      </article>
    </div>
  )
}

/*
export function DetallesProyectoGreen(props:JSX.HTMLAttributes<HTMLHeadingElement>){
  return (
    <div class=" mb-8 rounded-lg  flex flex-col gap-y-2">
      <article class="bg-gray-200 border-green-400 w-full rounded-lg pl-2 pt-2 pb-2 pr-2
                       transition-colors delay-150 duration-300 ease-in-out
                    hover:-translate-y-1 hover:scale-110
                    cursor-pointer mb-8 hover:bg-green-400">
      <div class="font-bold text-center">Proyecto 1</div>
      <time class="font">Mar 14, 2025</time>
      <div
       {...props}
      disabled={!IS_BROWSER||props.disabled}
      class="line-clamp-3 flex-wrap">
        Proyecto enfocado en la creación de una página web
        para la clase de Gestion de Proyectos impartida
        en el Instituto Tecnológico de la Laguna
      </div>
      <div class="font-italic">

        Jose Torres
      </div>
    </article>

    <article class="bg-gray-200 border-green-400 w-full rounded-lg pl-2 pt-2 pb-2 pr-2
    transition-colors delay-150 duration-300 ease-in-out
    hover:-translate-y-1 hover:scale-110
    cursor-pointer hover:bg-green-400">
    <div class="font-bold text-center">Proyecto 2</div>
    <time class="font">Mayo 21, 2025</time>
    <div
    {...props}
    disabled={!IS_BROWSER||props.disabled}
    class="line-clamp-3 flex-wrap">
    Proyecto enfocado en la creación de una
    aplicación enfocada en los créditos
    complementarios del Instituto Tecnológico de
    La Laguna
    </div>
    <div class="font-italic">

    Juan Alberto
    </div>
    </article>
</div>
  );
}


export function DetallesProyectoOrange(props:JSX.HTMLAttributes<HTMLHeadingElement>){
  return (
    <div class=" mb-8 rounded-lg  flex flex-col gap-y-2">
      <article class="bg-gray-200 border-orange-400 w-full rounded-lg pl-2 pt-2 pb-2 pr-2
                       transition-colors delay-150 duration-300 ease-in-out
                    hover:-translate-y-1 hover:scale-110
                    cursor-pointer mb-8 hover:bg-orange-400">
      <div class="font-bold text-center">Proyecto 1</div>
      <time class="font">Mar 14, 2025</time>
      <div
       {...props}
      disabled={!IS_BROWSER||props.disabled}
      class="line-clamp-3 flex-wrap">
        Proyecto enfocado en la creación de una página web
        para la clase de Gestion de Proyectos impartida
        en el Instituto Tecnológico de la Laguna
      </div>
      <div class="font-italic">

        Jose Torres
      </div>
    </article>

      <article class="bg-gray-200 border-orange-400 w-full rounded-lg pl-2 pt-2 pb-2 pr-2
      transition-colors delay-150 duration-300 ease-in-out
      hover:-translate-y-1 hover:scale-110
      cursor-pointer hover:bg-orange-400">
      <div class="font-bold text-center">Proyecto 2</div>
      <time class="font">Mayo 21, 2025</time>
      <div
      {...props}
      disabled={!IS_BROWSER||props.disabled}
      class="line-clamp-3 flex-wrap">
      Proyecto enfocado en la creación de una
      aplicación enfocada en los créditos
      complementarios del Instituto Tecnológico de
      La Laguna
      </div>
      <div class="font-italic">

      Juan Alberto
      </div>
      </article>
      </div>
  );
}

 */
