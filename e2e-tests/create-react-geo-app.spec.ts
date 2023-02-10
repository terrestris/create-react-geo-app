import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://localhost:8080/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Hello World/);
});
