import { test, expect } from '@playwright/test';

test('no major console or page errors during key flow', async ({ page }) => {
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
  await page.getByRole('button', { name: /start|play/i }).first().click();
  await page.getByRole('button', { name: /Supermarket/i }).click();
  await page.getByRole('button', { name: /Impact/i }).click();

  expect(runtimeErrors, `Console/page errors: ${runtimeErrors.join(' | ')}`).toEqual([]);
});

test('touch target size is accessible for key controls', async ({ page }) => {
  await page.goto('/');

  const controls = [
    page.getByRole('button', { name: /start|play/i }).first(),
    page.getByRole('button', { name: /Sound/i }).first(),
    page.getByRole('button', { name: /FoodBridge AI home/i }).first(),
  ];

  for (const control of controls) {
    const box = await control.boundingBox();
    expect(box, 'control should have a visible box').toBeTruthy();
    expect(box.width).toBeGreaterThanOrEqual(44);
    expect(box.height).toBeGreaterThanOrEqual(44);
  }
});
