import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    headless: true, // Set to false if you want to see the browser pop up
  },
  projects: [
    {
      name: 'Google Chrome',
      use: { 
        ...devices['Desktop Chrome'], 
        channel: 'chrome' // This tells Playwright to use your local Google Chrome
      },
    },
    /* Alternatively, if you prefer Edge, uncomment this and comment out Chrome:
    {
      name: 'Microsoft Edge',
      use: { 
        ...devices['Desktop Edge'], 
        channel: 'msedge' 
      },
    }
    */
  ],
});
