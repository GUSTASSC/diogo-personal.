import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/browser",
  timeout: 60000,
  use: { baseURL: "http://127.0.0.1:3000", headless: true },
  webServer: process.env.CI
    ? {
        command: "npm run start -- --hostname 127.0.0.1",
        url: "http://127.0.0.1:3000",
      }
    : undefined,
  workers: 1,
  reporter: "list",
});
