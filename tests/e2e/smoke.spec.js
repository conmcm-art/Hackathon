import { test, expect } from '@playwright/test';

test('smoke flow from landing page', async ({ page }) => {
  const runtimeErrors = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text();
      if (!text.includes('favicon') && !text.includes('Failed to load resource')) {
        runtimeErrors.push(text);
      }
    }
  });

  page.on('pageerror', (error) => {
    runtimeErrors.push(error.message);
  });

  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: /Turning supermarket surplus into same-day meals\./i })
  ).toBeVisible();

  const startButton = page.getByRole('button', { name: /start|play/i }).first();

  if (await startButton.isVisible()) {
    await startButton.click();
    await expect(page.getByRole('heading', { name: /experience the same rescue from four sides\.?/i })).toBeVisible();
  }

  expect(runtimeErrors, `Major runtime errors found: ${runtimeErrors.join(' | ')}`).toEqual([]);
});
