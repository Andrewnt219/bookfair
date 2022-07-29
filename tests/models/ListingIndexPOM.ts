import { Locator, Page } from '@playwright/test';
import { IPage } from '../interfaces/IPage';

export class ListingIndexPOM implements IPage {
  page: Page;

  $searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.$searchButton = this.page.locator('button', { hasText: 'Search' });
  }

  async navigate(): Promise<void> {
    await this.page.goto('/listing');
  }

  async clickSearchButton(): Promise<void> {
    await this.$searchButton.click();
  }
}
