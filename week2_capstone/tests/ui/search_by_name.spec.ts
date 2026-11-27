import { test } from '@playwright/test';
import { SearchPage } from '../../pages/SearchPage';

test('C1 Search by name', async ({ page }) => {
  const searchPage = new SearchPage(page);

  // Navigate to the store and search for "pliers"
  await searchPage.goto();
  await searchPage.searchByName('pliers');

  // Verify every product shown has "pliers" in its name
  await searchPage.expectAllTitlesContain('pliers');

  // Reset search so the page is left clean
  await searchPage.resetSearch();
});
