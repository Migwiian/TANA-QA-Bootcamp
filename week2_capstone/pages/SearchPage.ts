import { expect, Locator, Page } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly submitButton: Locator;
  readonly resetButton: Locator;
  readonly productTitles: Locator;

  constructor(page: Page) {
      this.page = page;

      // Use accessible roles/names matching the rendered search controls and product titles
      this.searchInput = page.getByRole('textbox', { name: 'Search' });
      this.submitButton = page.getByRole('button', { name: 'Search' });
      this.resetButton = page.getByRole('button', { name: 'X' });
      this.productTitles = page.getByRole('link').locator('h5');
  }

  async goto(): Promise<void> {
    // Fall back to the default app URL when BASE_URL is not configured in the environment
    const targetUrl = process.env.BASE_URL ?? 'https://practicesoftwaretesting.com';
    await this.page.goto(targetUrl);
  }

  async searchByName(query: string): Promise<void> {
    // Enter the search term and wait for the backend search response before reading results
    await this.searchInput.fill(query);

    const searchResponse = this.page.waitForResponse(
      (res) => res.url().includes('/products/search') && res.status() === 200
    );

    await this.submitButton.click();
    await searchResponse;
  }

  async expectAllTitlesContain(term: string): Promise<void> {
    const normalizedTerm = term.toLowerCase();

    // Auto-retry until the first result reflects the new search term instead of initial items
    await expect(this.productTitles.first()).toContainText(term, { ignoreCase: true });

    const titles = await this.productTitles.allTextContents();
    // Guard against passing when no product cards are rendered
    expect(titles.length).toBeGreaterThan(0);

    // Verify every rendered product card matches the search keyword
    for (const title of titles) {
      expect(title.toLowerCase()).toContain(normalizedTerm);
    }
  }

  async resetSearch(): Promise<void> {
    // Reset search state if the reset control is visible on the page
    if (await this.resetButton.isVisible()) {
      await this.resetButton.click();
    }
  }
}
