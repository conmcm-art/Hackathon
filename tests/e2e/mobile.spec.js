import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 375, height: 812 } });

test('mobile flow at 375px and header/menu navigation', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /Turning supermarket surplus into same-day meals\./i })).toBeVisible();

  await page.getByRole('button', { name: /start|play/i }).first().click();

  await expect(page.getByRole('heading', { name: /Experience the same rescue from four sides/i })).toBeVisible();

  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByRole('heading', { name: /Supermarket Staff/i })).toBeVisible();

  await page.getByRole('button', { name: 'Menu' }).click();
  await expect(page.getByRole('heading', { name: /Screen navigation/i })).toBeVisible();

  await page.getByRole('button', { name: 'Delivery' }).click();
  await expect(page.getByRole('heading', { name: /Delivery Partner/i })).toBeVisible();

  await page.getByRole('button', { name: /FoodBridge AI home/i }).click();
  await expect(page.getByRole('heading', { name: /Turning supermarket surplus into same-day meals\./i })).toBeVisible();
});
