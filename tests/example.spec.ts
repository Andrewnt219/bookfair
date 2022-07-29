import { test, expect } from '@playwright/test';
import { ListingIndexPOM } from './models/ListingIndexPOM';
import { _Toast } from './locators/_Toast';

test('homepage has Playwright in title and get started link linking to the intro page', async ({
  page,
}) => {
  const pom = new ListingIndexPOM(page);
  const _toast = new _Toast(page);

  await pom.navigate();

  // Expect a title "to contain" a substring.
  await expect(pom.page).toHaveTitle(/Search listings/);

  await pom.clickSearchButton();

  // Expects the URL to contain intro.
  await expect(_toast.root).toHaveText(/Search term is required/);
});
