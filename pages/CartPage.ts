import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly firstProductCard: Locator;
  readonly addToCartButton: Locator;
  readonly cartNavButton: Locator;
  readonly cartProductTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    // Using the exact data-test attributes we proved exist
    this.searchInput = page.locator('input[data-test="search-query"]');
    this.searchButton = page.locator('button[data-test="search-submit"]');

    this.firstProductCard = page.locator('.card').first();

    // THE FIX: Changed from getByTestId to locator with data-test
    this.addToCartButton = page.locator('button[data-test="add-to-cart"]');
    this.cartNavButton = page.locator('[data-test="nav-cart"]');
    this.cartProductTitle = page.locator('[data-test="product-title"]').first();
  }

  async goto() {
    await this.page.goto('https://with-bugs.practicesoftwaretesting.com/#/');
  }

  async searchForProduct(productName: string) {
    await this.searchInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async addFirstResultToCart() {
    await this.firstProductCard.waitFor({ state: 'visible', timeout: 15000 });
    await this.firstProductCard.click();

    // Wait for the Add to Cart button to appear on the details page before clicking
    await this.addToCartButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.addToCartButton.click();
  }

  async viewCart() {
    await this.cartNavButton.click();
  }
}
