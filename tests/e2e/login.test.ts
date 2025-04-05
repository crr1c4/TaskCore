// tests/e2e/login.test.ts
import { test, expect } from '@playwright/test';

test.describe('Página de Ingreso', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8000/ingresar', { waitUntil: 'networkidle' });
  });

  test('Debería mostrar el formulario correctamente', async ({ page }) => {
    // Verifica el formulario principal
    const form = page.locator('form[action="/ingresar"]');
    await expect(form).toBeVisible();
    
    // Verifica campos específicos
    await expect(page.locator('input[name="correo"]')).toBeVisible();
    await expect(page.locator('input[name="contraseña"]')).toBeVisible();
    await expect(page.locator('button:has-text("Iniciar sesión")')).toBeVisible();
  });

  test('Debería mostrar error con credenciales inválidas', async ({ page }) => {
    await page.fill('input[name="correo"]', 'noexiste@test.com');
    await page.fill('input[name="contraseña"]', 'password123');
    await page.click('button:has-text("Iniciar sesión")');
    
    // Esperar a que aparezca el modal de error
    await page.waitForSelector('.bg-red-100', { state: 'visible', timeout: 5000 });
    
    // Verificar el contenido del modal
    const modal = page.locator('.bg-red-100');
    await expect(modal).toBeVisible();
    await expect(modal.locator('text=Error')).toBeVisible();
    await expect(modal.locator('p:text-matches("No hay un usuario registrado", "i")')).toBeVisible();
    
    // Opcional: cerrar el modal para verificar su comportamiento
    await modal.locator('button:has-text("✕")').click();
    await expect(modal).toBeHidden();
  });
});
