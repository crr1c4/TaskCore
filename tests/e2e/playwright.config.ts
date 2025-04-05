//tests/e2e/playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 60000, // 60 segundos para timeout global
  workers: 1, // Solo 1 worker para mayor estabilidad
  retries: 1, // 1 reintento automático
  reporter: 'html',
  use: {
    browserName: 'chromium',
    launchOptions: {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ],
      headless: true
    },
    viewport: { width: 1280, height: 720 },
    baseURL: 'http://127.0.0.1:8000',
    trace: 'on-first-retry',
    screenshot: 'on'
  },
  webServer: {
    command: 'deno task start',
    url: 'http://127.0.0.1:8000',
    timeout: 180000, // 3 minutos timeout
    reuseExistingServer: true
  }
});