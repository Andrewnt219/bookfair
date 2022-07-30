import { Locator, Page } from '@playwright/test';
import { IPage } from '../interfaces/IPage';

export class ListingIndexPOM implements IPage {
  page: Page;

  $searchButton: Locator;
  $searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.$searchButton = this.page.locator('button', { hasText: 'Search' });
    this.$searchInput = this.page.locator('input[placeholder="PRJ566 books"]');
  }

  async navigate(): Promise<void> {
    await this.page.goto('/listing');
  }

  async clickSearchButton(): Promise<void> {
    await this.$searchButton.click();
  }

  async fillSearchInput(text: string): Promise<void> {
    await this.$searchInput.fill(text);
  }
}
