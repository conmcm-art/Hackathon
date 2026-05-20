import { test, expect } from '@playwright/test';

test.use({ reducedMotion: 'reduce' });

test('reduced motion preference limits transitions', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: /start|play/i }).first().click();
  await expect(page.getByRole('heading', { name: /Experience the same rescue from four sides/i })).toBeVisible();

  const animatedNode = page.locator('main [style*="transform"]').first();
  await expect(animatedNode).toHaveCount(0);
});
