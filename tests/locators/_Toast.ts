import { Locator, Page } from '@playwright/test';
import { ILocator } from '../interfaces/ILocator';

export class _Toast implements ILocator {
  root: Locator;

  constructor(page: Page) {
    this.root = page.locator('.toast-body');
  }
}
