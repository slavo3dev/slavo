import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/smoke",
  use: { baseURL: "http://localhost:3100" },
  webServer: {
    command: "yarn start -p 3100",
    url: "http://localhost:3100",
    reuseExistingServer: false,
    timeout: 60000,
  },
});