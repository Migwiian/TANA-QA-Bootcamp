import { expect, test } from '@playwright/test';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

test('Save updates status to Saved', async ({ page }) => {
  // Resolve the local fixture path into a file URL for navigation.
  const fileUrl = pathToFileURL(path.join(__dirname, 'index.html')).href;
  await page.goto(fileUrl);

  // Trigger the save action and wait for the status text to update.
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.locator('#status')).toHaveText('Saved');
});
