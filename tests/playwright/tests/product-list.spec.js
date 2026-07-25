const { test, expect } = require('@playwright/test');

const EXPECTED_PRODUCTS = ['t-shirt', 'jumper', 'jeans', 'polo shirt'];

test.describe('product listing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('loads the page', async ({ page }) => {
    await expect(page).toHaveTitle('kube-shop');
  });

  test('displays all products from the product-api', async ({ page }) => {
    for (const title of EXPECTED_PRODUCTS) {
      await expect(page.getByText(title, { exact: true })).toBeVisible();
    }
  });

  test('displays product details and an "add to order" button per product', async ({ page }) => {
    const product = page.locator('.Products').filter({ hasText: 't-shirt' });

    await expect(product).toContainText('funky and loud');
    await expect(product.getByText(/^price: £\d+\.\d{2}$/)).toBeVisible();
    await expect(product.getByRole('spinbutton', { name: /quantity/i })).toHaveValue('1');
    await expect(product.getByText(/^size: /)).toBeVisible();
    await expect(product.getByText(/^colour: /)).toBeVisible();
    await expect(product.getByRole('button', { name: 'add to order' })).toBeVisible();
  });

  test('the orders section starts empty', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'ORDERS' })).toBeVisible();
    // Only the product rows should have an "add to order" button; no order rows exist yet.
    await expect(page.getByRole('button', { name: 'add to order' })).toHaveCount(EXPECTED_PRODUCTS.length);
  });
});
