import { test, expect } from '@playwright/test';

test('keyboard-only flow works without mouse', async ({ page }) => {
  await page.goto('/');

  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');

  await expect(page.getByRole('heading', { name: /Experience the same rescue from four sides/i })).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(page.getByRole('heading', { name: /Turning supermarket surplus into same-day meals\./i })).toBeVisible();
});

test('every tab stop shows visible focus ring', async ({ page }) => {
  await page.goto('/');

  const interactive = page.locator('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
  const count = await interactive.count();

  for (let i = 0; i < Math.min(count, 14); i += 1) {
    await page.keyboard.press('Tab');
    const focused = page.locator(':focus');
    await expect(focused).toBeVisible();

    const boxShadow = await focused.evaluate((el) => window.getComputedStyle(el).boxShadow);
    const outlineStyle = await focused.evaluate((el) => window.getComputedStyle(el).outlineStyle);

    expect(boxShadow !== 'none' || outlineStyle !== 'none').toBeTruthy();
  }
});
