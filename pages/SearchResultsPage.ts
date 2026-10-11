import { Page, Locator, expect } from '@playwright/test';

export class SearchResultsPage {
    private readonly page: Page;

    // Locators
    private readonly lblProductName: Locator;
    private readonly btnAddToCart: Locator;
    private readonly pNoResults: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.lblProductName = page.locator('.product-name');
        this.btnAddToCart = page.getByRole('button', { name: 'Add to Cart' });
        this.pNoResults = page.locator('text=No results');
    }

    /**
     * Clicks on a product by name
     * @param productName - Product name to click
     */
    async clickProduct(productName: string): Promise<void> {
        await this.page.getByRole('link', { name: productName }).click();
    }

    /**
     * Gets the product name from search results
     */
    async getProductName(): Promise<string> {
        return await this.lblProductName.first().textContent() || '';
    }

    /**
     * Clicks Add to Cart button
     */
    async clickAddToCart(): Promise<void> {
        await this.btnAddToCart.click();
    }

    /**
     * Verifies no results message is displayed
     * @returns Promise<boolean> - true if no results message is shown
     */
    async isNoResults(): Promise<boolean> {
        try {
            return await this.pNoResults.isVisible();
        } catch (error) {
            console.log(`Error checking no results: ${error}`);
            return false;
        }
    }
}