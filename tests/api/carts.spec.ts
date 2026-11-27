import { test, expect } from '@playwright/test';

const API_URL = 'https://api.practicesoftwaretesting.com';

test('GET products API returns status 200 and valid data', async ({ request }) => {
  // Explicitly pass ?page=1 because the endpoint requires pagination parameters to return 200
  const response = await request.get(`${API_URL}/products?page=1`);

  console.log('Status Code:', response.status());
  expect(response.status()).toBe(200);

  const body = await response.json();

  // Verify the paginated response includes the total record count field
  expect(body).toHaveProperty('total');

  console.log('Total products in database:', body.total);
});

test('POST carts creates a cart, adds a product, and checks response fields', async ({ request }) => {
  // Fetch products inside this test so execution does not depend on another test's state
  const productsRes = await request.get(`${API_URL}/products?page=1`);
  expect(productsRes.status()).toBe(200);
  const productsBody = await productsRes.json();
  const productId = productsBody.data[0].id;

  // Create a new cart and verify the returned identifier
  const createCartRes = await request.post(`${API_URL}/carts`);
  expect(createCartRes.status()).toBe(201);
  const cartBody = await createCartRes.json();
  expect(cartBody).toHaveProperty('id');

  const cartId = cartBody.id;

  try {
    // Add the product to the newly created cart and check the response payload
    const addItemRes = await request.post(`${API_URL}/carts/${cartId}`, {
      data: {
        product_id: productId,
        quantity: 1,
      },
    });
    expect(addItemRes.status()).toBe(200);
    const addItemBody = await addItemRes.json();
    expect(addItemBody).toHaveProperty('result');
  } finally {
    // Delete the created cart even if an earlier assertion fails to avoid leftover test data
    const deleteRes = await request.delete(`${API_URL}/carts/${cartId}`);
    expect([200, 204]).toContain(deleteRes.status());
  }
});

test('GET non-existent cart ID returns status 404', async ({ request }) => {
  // Request a cart ID that does not exist and verify the API returns 404 Not Found
  const response = await request.get(`${API_URL}/carts/non-existent-cart-id-99999`);

  console.log('404 Test Status Code:', response.status());
  expect(response.status()).toBe(404);
});
