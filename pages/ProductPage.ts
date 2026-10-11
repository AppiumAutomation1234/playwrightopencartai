import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
    private readonly page: Page;

    // Locators
    public readonly lblProductName: Locator;
    private readonly txtQuantity: Locator;
    private readonly btnAddToCart: Locator;
    private readonly lblSuccess: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.lblProductName = page.locator('.product-title');
        this.txtQuantity = page.getByLabel('Quantity') || page.locator('input[name="quantity"]');
        this.btnAddToCart = page.getByRole('button', { name: 'Add to Cart' }) || page.locator('button[title="Add to cart"]');
        this.lblSuccess = page.locator('text=Product added to shopping cart!');
    }

    /**
     * Sets the product quantity
     * @param quantity - Quantity to set
     */
    async setQuantity(quantity: string): Promise<void> {
        await this.txtQuantity.fill(quantity);
    }

    /**
     * Clicks Add to Cart button
     */
    async clickAddToCart(): Promise<void> {
        await this.btnAddToCart.click();
    }

    /**
     * Verifies product added to cart success message
     * @returns Promise<boolean> - true if product was added successfully
     */
    async isProductAddedToCart(): Promise<boolean> {
        try {
            return await this.lblSuccess.isVisible();
        } catch (error) {
            console.log(`Error checking product added: ${error}`);
            return false;
        }
    }
}