//tests/e2e/mini.test.ts
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto('http://127.0.0.1:8000/ingresar');
    await page.waitForSelector('form', { state: 'attached', timeout: 15000 });
  });

test('Prueba de conexión básica', async ({ page }) => {
  await page.goto('http://127.0.0.1:8000');
  await expect(page).toHaveTitle(/TaskCore/); // Ajusta esto
});