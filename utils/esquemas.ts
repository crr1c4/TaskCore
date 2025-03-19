import { z } from 'npm:zod'

/**
 * @description Esquema para validar la complejidad de la contraseña.
 * Requisitos:
 * - Mínimo 8 caracteres.
 * - Al menos una letra mayúscula.
 * - Al menos una letra minúscula.
 * - Al menos un número.
 * - Al menos un carácter especial.
 */
export const esquemaContraseña = z
  .string()
  .min(8)
  .refine((val) => /[A-Z]/.test(val))
  .refine((val) => /[a-z]/.test(val))
  .refine((val) => /[0-9]/.test(val))
  .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val))


/**
 * @description Esquema de validación para nombres.
 * - Debe ser una cadena de texto con al menos 1 carácter.
 * @type {z.ZodString}
 */
export const esquemaNombre: z.ZodString = z.string().min(1)

/**
 * @description Esquema de validación para correos electrónicos.
 * - Debe ser una cadena de texto en formato de correo válido.
 * @type {z.ZodString}
 */
export const esquemaEmail: z.ZodString = z.string().email()
