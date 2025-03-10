import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Input(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
  <input class="col-span-1" />
  );
}
