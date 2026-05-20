import { test, expect } from '@playwright/test';

test('restart controls reset flow state', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: /start|play/i }).first().click();
  await page.getByRole('button', { name: /Supermarket/i }).click();
  await expect(page.getByRole('heading', { name: /Supermarket Staff/i })).toBeVisible();

  await page.getByRole('button', { name: /Restart demo/i }).first().click();
  await expect(page.getByRole('heading', { name: /Turning supermarket surplus into same-day meals\./i })).toBeVisible();
});
