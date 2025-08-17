import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./test/e2e/specs",
  webServer: {
    command: "pnpm dev",
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
