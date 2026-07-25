const { test, expect } = require('@playwright/test');

const addToOrderButton = () => ({ name: 'add to order' });

test.describe('adding products to an order', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('clicking "add to order" creates a matching order entry', async ({ page }) => {
    const productRow = page.locator('.Products').filter({ hasText: 'jumper' });
    const priceText = await productRow.getByText(/^price: £\d+\.\d{2}$/).innerText();

    await productRow.getByRole('button', addToOrderButton()).click();

    // Two ".Products" blocks now mention "jumper": the original product row and the new order row.
    const jumperRows = page.locator('.Products').filter({ hasText: 'jumper' });
    await expect(jumperRows).toHaveCount(2);

    const orderRow = jumperRows.filter({ hasNot: page.getByRole('button', addToOrderButton()) });
    await expect(orderRow).toHaveCount(1);
    // The order should carry over the exact price shown on the product.
    await expect(orderRow).toContainText(priceText);
  });

  test('adding multiple products lists them all as separate orders', async ({ page }) => {
    await page.locator('.Products').filter({ hasText: 't-shirt' }).getByRole('button', addToOrderButton()).click();
    await page.locator('.Products').filter({ hasText: 'jeans' }).getByRole('button', addToOrderButton()).click();

    const orderRows = page.locator('.Products').filter({ hasNot: page.getByRole('button', addToOrderButton()) });
    await expect(orderRows).toHaveCount(2);
    await expect(orderRows.filter({ hasText: 't-shirt' })).toHaveCount(1);
    await expect(orderRows.filter({ hasText: 'jeans' })).toHaveCount(1);
  });

  test('adding the same product twice creates two separate order entries', async ({ page }) => {
    const button = page.locator('.Products').filter({ hasText: 'polo shirt' }).getByRole('button', addToOrderButton());

    await button.click();
    await button.click();

    const orderRows = page
      .locator('.Products')
      .filter({ hasText: 'polo shirt' })
      .filter({ hasNot: page.getByRole('button', addToOrderButton()) });
    await expect(orderRows).toHaveCount(2);
  });
});
