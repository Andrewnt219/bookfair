import { test, expect } from '@playwright/test';
import { ListingIndexPOM } from './models/ListingIndexPOM';
import { _Toast } from './locators/_Toast';

test.describe('Search listings', () => {
  let pom: ListingIndexPOM;

  test.beforeEach(async ({ page }) => {
    pom = new ListingIndexPOM(page);
    await pom.navigate();
  });

  test('Empty input', async ({ page }) => {
    const _toast = new _Toast(page);

    await pom.fillSearchInput('');
    await pom.clickSearchButton();
    await expect(_toast.root).toHaveText(/Search term is required/);
  });

  test('White space input', async ({ page }) => {
    const _toast = new _Toast(page);

    await pom.fillSearchInput('   ');
    await pom.clickSearchButton();
    await expect(_toast.root).toHaveText(/Search term is required/);
  });

  test('\\t input', async ({ page }) => {
    const _toast = new _Toast(page);

    await pom.fillSearchInput('\t\t');
    await pom.clickSearchButton();
    await expect(_toast.root).toHaveText(/Search term is required/);
  });

  test('\\n input', async ({ page }) => {
    const _toast = new _Toast(page);

    await pom.fillSearchInput('\n\n');
    await pom.clickSearchButton();
    await expect(_toast.root).toHaveText(/Search term is required/);
  });

  test('No results', async ({ page }) => {
    const _toast = new _Toast(page);

    await pom.fillSearchInput('non exist listing search term');
    await pom.clickSearchButton();
    await expect(_toast.root).toHaveText(/No result/);
  });
});
