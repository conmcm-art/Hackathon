import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 768, height: 1024 } });

test('tablet navigation keeps app screens accessible', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: /start|play/i }).first().click();
  await expect(page.getByRole('heading', { name: /Experience the same rescue from four sides/i })).toBeVisible();

  await page.getByRole('button', { name: 'Supermarket' }).click();
  await expect(page.getByRole('heading', { name: /Supermarket Staff/i })).toBeVisible();

  await page.getByRole('button', { name: 'Impact' }).click();
  await expect(page.getByRole('heading', { name: /Impact Dashboard/i })).toBeVisible();
});
