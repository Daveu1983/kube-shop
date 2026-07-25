const { defineConfig, devices } = require('@playwright/test');

// When testing against minikube, set BASE_URL to the output of:
//   minikube service frontend -n kube-shop --url
const baseURL = process.env.BASE_URL || 'http://localhost:3001';

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
