/**
 * Test Case: Product Search Flow
 *
 * Tags: @master @sanity @web
 *
 * Steps:
 * 1) Open the application
 * 2) Locate the main product search field
 * 3) Enter a valid known product name
 * 4) Submit the search
 * 5) Verify that the search results page is displayed
 * 6) Verify that the expected product appears in the results
 * 7) Verify that the displayed product name matches the search criteria
 */

// using custom fixtures
import { test, expect } from '../../fixtures/pageFixtures'

test('Product search flow @master @sanity @web', async ({ homePage, searchResultsPage }) => {
    await test.step('1) Open the application', async () => {
        // Home page is already navigated to via fixture
    });

    await test.step('2) Locate the main product search field', async () => {
        // Search field is on the home page - we'll interact with it
    });

    await test.step('3) Enter a valid known product name', async () => {
        // Using MacBook as the known product
        await homePage.searchProduct('MacBook');
    });

    await test.step('4) Submit the search', async () => {
        // Search is submitted when user presses Enter or clicks the search button
    });

    await test.step('5) Verify that the search results page is displayed', async () => {
        await expect(searchResultsPage).toBeVisible();
    });

    await test.step('6) Verify that the expected product appears in the results', async () => {
        await expect(searchResultsPage.lblProductName).toBeVisible();
    });

    await test.step('7) Verify that the displayed product name matches the search criteria', async () => {
        const productName = await searchResultsPage.getProductName();
        await expect(productName).toContain('MacBook');
    });

    console.log('✅ ✔️ Product search flow completed successfully!');
});