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
  .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  .refine((val) => /[A-Z]/.test(val), {
    message: 'Debe contener al menos una letra mayúscula',
  })
  .refine((val) => /[a-z]/.test(val), {
    message: 'Debe contener al menos una letra minúscula',
  })
  .refine((val) => /[0-9]/.test(val), {
    message: 'Debe contener al menos un número',
  })
  .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
    message: 'Debe contener al menos un carácter especial',
  })

/**
 * Esquema para validar el formulario de registro de usuario.
 *
 * Valida que:
 * - El nombre no esté vacío.
 * - El correo tenga un formato válido.
 * - La contraseña cumpla con el esquema de complejidad definido en {@link esquemaCOntraseña}.
 * - La verificación de la contraseña tenga al menos 8 caracteres.
 * - Las contraseñas sean idénticas.
 */
export const esquemaNombre = z.string().min(1, { message: 'El nombre es obligatorio.' })
export const esquemaEmail = z.string().email({ message: 'El correo debe ser válido.' })
