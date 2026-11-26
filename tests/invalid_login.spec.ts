import { test, expect } from '@playwright/test';

test('invalid login is rejected with a clear message', async ({ page }) => {
  // Give the test 60 seconds instead of the default 30
  test.setTimeout(60000);

  await page.goto('https://with-bugs.practicesoftwaretesting.com/#/auth/login');

  // Use standard CSS selector. It waits for the element to exist in the DOM.
  const emailInput = page.locator('input[data-test="email"]');
  const passwordInput = page.locator('input[data-test="password"]');

  await emailInput.fill('wrong@example.com');
  await passwordInput.fill('wrongpassword');

  // Click the button
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  // Assert the error message appears
  await expect(page.getByText(/invalid email or password/i)).toBeVisible();
});
