// tests/e2e/login.test.ts
import { test, expect } from "@playwright/test";

test.describe("Página de Ingreso", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ingresar");
  });

  test("debería mostrar el formulario de login correctamente", async ({ page }) => {
    // Verificar elementos principales
    await expect(page.getByRole("heading", { name: "Inicio de sesión" })).toBeVisible();
    await expect(page.getByPlaceholder("Correo")).toBeVisible();
    await expect(page.getByPlaceholder("Contraseña")).toBeVisible();
    await expect(page.getByRole("button", { name: "Iniciar sesión" })).toBeVisible();
  });

  test("debería mostrar error cuando el usuario no existe", async ({ page }) => {
    // Rellenar formulario con credenciales incorrectas
    await page.getByPlaceholder("Correo").fill("usuario@inexistente.com");
    await page.getByPlaceholder("Contraseña").fill("password123");
    await page.getByRole("button", { name: "Iniciar sesión" }).click();

    // Verificar que se muestra el error
    await expect(page.getByText("No hay un usuario registrado con el correo ingresado.")).toBeVisible();
    // Verificar que el correo se mantiene en el campo
    await expect(page.getByPlaceholder("Correo")).toHaveValue("usuario@inexistente.com");
  });

  test("debería mostrar error cuando la contraseña es incorrecta", async ({ page }) => {
    // Rellenar formulario con contraseña incorrecta
    await page.getByPlaceholder("Correo").fill("chris@gmail.com");
    await page.getByPlaceholder("Contraseña").fill("contraseñaIncorrecta");
    await page.getByRole("button", { name: "Iniciar sesión" }).click();

    // Verificar que se muestra el error
    await expect(page.getByText("La contraseña es incorrecta.")).toBeVisible();
    // Verificar que el correo se mantiene en el campo
    await expect(page.getByPlaceholder("Correo")).toHaveValue("chris@gmail.com");
  });

  test("debería redirigir al dashboard cuando el login es exitoso", async ({ page }) => {
    // Rellenar formulario con credenciales válidas (ajusta según tu DB de test)
    await page.getByPlaceholder("Correo").fill("chris@gmail.com");
    await page.getByPlaceholder("Contraseña").fill("1234abcD@");
    await page.getByRole("button", { name: "Iniciar sesión" }).click();

    // Verificar la redirección (ajusta la URL según tu aplicación)
    await page.waitForURL(/\/usuario\/\w+\/$/);
    
    // Verificar que se estableció la cookie de autenticación
    const cookies = await page.context().cookies();
    const tokenCookie = cookies.find(c => c.name === "token");
    expect(tokenCookie).toBeDefined();
    expect(tokenCookie?.value.length).toBeGreaterThan(0);
  });

  test("debería mantener los valores del formulario después de un error", async ({ page }) => {
    const testEmail = "test@example.com";
    
    await page.getByPlaceholder("Correo").fill(testEmail);
    await page.getByPlaceholder("Contraseña").fill("wrongpass");
    await page.getByRole("button", { name: "Iniciar sesión" }).click();

    // Verificar que el correo se mantiene
    await expect(page.getByPlaceholder("Correo")).toHaveValue(testEmail);
    // Verificar que el campo de contraseña está vacío (por seguridad)
    await expect(page.getByPlaceholder("Contraseña")).toHaveValue("");
  });
});