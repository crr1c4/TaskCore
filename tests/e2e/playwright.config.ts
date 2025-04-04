import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 60000, // Aumenta timeout
  workers: 1, // Usa solo 1 worker en Windows
  use: {
    browserName: 'chromium',
    headless: true,
    launchOptions: {
      args: ['--disable-gpu', '--no-sandbox'],
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    }
  },
  webServer: {
    command: 'deno task start',
    url: 'http://localhost:8000',
    timeout: 180000,
    reuseExistingServer: true
  }
});