import { test, expect } from '@playwright/test';

test('homepage title', async ({ page }) => {
  await page.goto('https://with-bugs.practicesoftwaretesting.com/#/');
  await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0 with bugs");
});
