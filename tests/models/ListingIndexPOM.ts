import { Locator, Page } from '@playwright/test';
import { searchFixtures } from '../fixtures/search-fixtures';
import { IPage } from '../interfaces/IPage';

export class ListingIndexPOM implements IPage {
  page: Page;

  $searchButton: Locator;
  $searchInput: Locator;
  $searchResultText: Locator;
  $searchList: Locator;
  $searchListItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.$searchButton = this.page.locator('button', { hasText: 'Search' });
    this.$searchInput = this.page.locator('input[placeholder="PRJ566 books"]');
    this.$searchResultText = this.page.locator('h2');
    this.$searchList = this.page.locator('ul[aria-label=listings]');
    this.$searchListItems = this.page.locator('ul[aria-label=listing] > li');
    mockSearchRoute(page);
  }

  async navigate(): Promise<void> {
    await this.page.goto('/listing');
  }

  async clickSearchButton(): Promise<void> {
    await this.$searchButton.click();
  }

  async clickSearchButtonAndWait() {
    await Promise.all([
      this.page.waitForResponse((req) =>
        req.url().includes('indexes/listings/query')
      ),
      this.clickSearchButton(),
    ]);
  }

  async fillSearchInput(text: string): Promise<void> {
    await this.$searchInput.fill(text);
  }
}

const mockSearchRoute = (page: Page): void => {
  page.route('**/indexes/listings/query**', (route, request) => {
    const { query } = JSON.parse(request.postData()!) as {
      query: string;
      filters: 'isActive:true and isSold:false';
    };
    return route.fulfill({
      status: 200,
      body: JSON.stringify(searchFixtures[query]),
    });
  });
};
