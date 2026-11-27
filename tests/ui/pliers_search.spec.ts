import { test, expect } from '@playwright/test';

test('searching for pliers returns only matching products', async ({ page }) => {
  // Give the test 60 seconds
  test.setTimeout(60000);

  await page.goto('https://with-bugs.practicesoftwaretesting.com/#/');

  // Use standard CSS selector to find the search box
  const searchBox = page.locator('input[data-test="search-query"]');
  await searchBox.fill('pliers');

  // Click search
  await page.locator('button[data-test="search-submit"]').click();

  // Use polling for the list
  await expect
    .poll(
      async () => {
        const names = await page.locator('[data-test="product-name"]').allTextContents();
        return (
          names.length > 0 &&
          names.every((name) => /pliers/i.test(name.trim()))
        );
      },
      { timeout: 10000, message: 'Products did not match the search' }
    )
    .toBe(true);
});
