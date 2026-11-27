import { test, expect } from '@playwright/test';
import { CartPage } from '../../pages/CartPage';

test('Add a product to guest cart and verify its name', async ({ page }) => {
  const cart = new CartPage(page);

  // 1. Go to the site
  await cart.goto();

  // 2. Search for a product
  await cart.searchForProduct('pliers');

  // 3. Add the first result to the cart
  await cart.addFirstResultToCart();

  // 4. Go to the cart page
  await cart.viewCart();

  // 5. The check (Assertion) lives here in the test file, not the Page Object!
  await expect(cart.cartProductTitle).toBeVisible();
  await expect(cart.cartProductTitle).toContainText(/pliers/i);
});
