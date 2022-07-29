import { test, expect } from '@playwright/test';

test('homepage has Playwright in title and get started link linking to the intro page', async ({
  page,
}) => {
  await page.goto('/listing');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Search listings/);

  // create a locator
  const searchButton = page.locator('button', { hasText: 'Search' });

  // Click the get started link.
  await searchButton.click();

  // Expects the URL to contain intro.
  await expect(page.locator('.toast-body')).toHaveText(
    /Search term is required/
  );
});
