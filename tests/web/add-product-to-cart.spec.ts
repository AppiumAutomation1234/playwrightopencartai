/**
 * Test Case: Add Product to Cart
 *
 * Tags: @master @sanity @web
 *
 * Steps:
 * 1) Open the application
 * 2) Search for a valid known product
 * 3) Open the product details page
 * 4) Verify that the product details are displayed
 * 5) Set the required quantity when the product supports quantity selection
 * 6) Click Add to Cart
 * 7) Verify the product-added success/confirmation message
 * 8) Open the shopping cart
 * 9) Verify that the selected product is present
 * 10) Verify the displayed quantity matches the requested quantity
 */

// using custom fixtures
import { test, expect } from '../../fixtures/pageFixtures'

test('Add product to cart @master @sanity @web', async ({ homePage, productPage, searchResultsPage, cartPage }) => {
    await test.step('1) Open the application', async () => {
        // Home page is already navigated to via fixture
    });

    await test.step('2) Search for a valid known product', async () => {
        await homePage.searchProduct('MacBook');
    });

    await test.step('3) Open the product details page', async () => {
        await searchResultsPage.clickProduct('MacBook');
    });

    await test.step('4) Verify that the product details are displayed', async () => {
        await expect(productPage.lblProductName).toBeVisible();
    });

    await test.step('5) Set the required quantity', async () => {
        await productPage.setQuantity('2');
    });

    await test.step('6) Click Add to Cart', async () => {
        await productPage.clickAddToCart();
    });

    await test.step('7) Verify the product-added success message', async () => {
        await expect(productPage.isProductAddedToCart()).resolves.toBeTruthy();
    });

    await test.step('8) Open the shopping cart', async () => {
        await cartPage.clickCheckout(); // or navigate to cart directly
    });

    await test.step('9) Verify that the selected product is present', async () => {
        await expect(cartPage.isProductInCart()).resolves.toBeTruthy();
    });

    await test.step('10) Verify the displayed quantity matches the requested quantity', async () => {
        await expect(cartPage.getCartQuantity()).resolves.toBe('2');
    });

    console.log('✅ ✔️ Add product to cart completed successfully!');
});