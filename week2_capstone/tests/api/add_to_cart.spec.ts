import { expect, test } from '@playwright/test';
import { CartHelper } from './helpers/cart_helper';

test('C4 Add to a cart', async ({ request }) => {
  // Use the API URL from .env or fall back to the default Practice Software Testing API
  const apiBaseUrl = process.env.API_BASE_URL ?? 'https://api.practicesoftwaretesting.com';
  expect(apiBaseUrl).toBeTruthy();

  const cartHelper = new CartHelper(request, apiBaseUrl);
  let createdCartId: string | null = null;

  try {
    // 1. Get a valid product ID from the catalog
    const productId = await cartHelper.getFirstProductId();

    // 2. Create a new cart (expects 201)
    createdCartId = await cartHelper.createCart();

    // 3. Add the product to the cart (expects 200)
    await cartHelper.addProductToCart(createdCartId, productId, 1);

    // 4. Fetch the cart to make sure the product and quantity are saved
    await cartHelper.expectCartContainsProduct(createdCartId, productId, 1);
  } finally {
    // Always delete the test cart so we don't leave test data behind
    await cartHelper.deleteCart(createdCartId);
  }
});
