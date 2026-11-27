import { APIRequestContext, expect } from '@playwright/test';

export class CartHelper {
  private readonly request: APIRequestContext;
  private readonly baseUrl: string;

  constructor(request: APIRequestContext, baseUrl: string) {
    this.request = request;
    // Remove any trailing slash so endpoint paths stay clean
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  async getFirstProductId(): Promise<string> {
    // Fetch a real product ID from the catalog instead of hardcoding one
    const response = await this.request.get(`${this.baseUrl}/products`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    const items = Array.isArray(body) ? body : body.data;
    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toBeGreaterThan(0);

    return String(items[0].id);
  }

  async createCart(): Promise<string> {
    // Send POST request to create a new empty cart and expect 201 Created
    const response = await this.request.post(`${this.baseUrl}/carts`);
    expect(response.status()).toBe(201);

    const body = await response.json();
    const cartId = body.id ?? body.cart_id;
    expect(cartId).toBeTruthy();

    return String(cartId);
  }

  async addProductToCart(cartId: string, productId: string, quantity: number): Promise<void> {
    // Add the product and quantity to the cart we just created
    const response = await this.request.post(`${this.baseUrl}/carts/${cartId}`, {
      data: {
        product_id: productId,
        quantity,
      },
    });
    expect(response.status()).toBe(200);
  }

  async expectCartContainsProduct(cartId: string, productId: string, quantity: number): Promise<void> {
    // Read the cart back to confirm the product was actually saved inside it
    const response = await this.request.get(`${this.baseUrl}/carts/${cartId}`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    const items = body.cart_items ?? body.items ?? [];
    const matched = items.find(
      (item: { product_id?: string | number; quantity?: number }) =>
        String(item.product_id) === String(productId)
    );

    expect(matched).toBeDefined();
    expect(matched.quantity).toBe(quantity);
  }

  async deleteCart(cartId: string | null): Promise<void> {
    // Clean up test data by deleting the cart created during the test
    if (!cartId) {
      return;
    }
    const response = await this.request.delete(`${this.baseUrl}/carts/${cartId}`);
    expect([200, 204, 404]).toContain(response.status());
  }
}
