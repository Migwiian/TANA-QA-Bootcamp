import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://with-bugs.practicesoftwaretesting.com',
    trace: 'on-first-retry',
  },
});
