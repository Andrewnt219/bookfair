import { Page } from '@playwright/test';

export interface IPage {
  page: Page;
  navigate(): Promise<void>;
}
