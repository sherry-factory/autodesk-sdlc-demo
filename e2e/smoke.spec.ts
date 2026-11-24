import { expect, test } from '@playwright/test';

test('adds and completes a to-do', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'To-dos' })).toBeVisible();

  await page.getByLabel('New to-do').fill('Ship the demo');
  await page.getByRole('button', { name: 'Add' }).click();

  const todo = page.getByRole('checkbox', { name: 'Ship the demo' });
  await expect(todo).not.toBeChecked();
  await expect(page.getByRole('status')).toHaveText('1 item left');

  await todo.check();
  await expect(todo).toBeChecked();
  await expect(page.getByRole('status')).toHaveText('0 items left');

  await page.reload();
  await expect(page.getByRole('checkbox', { name: 'Ship the demo' })).toBeChecked();
});
