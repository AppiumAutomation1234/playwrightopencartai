import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
    private readonly page: Page;

    // Locators
    private readonly lblCartTitle: Locator;
    private readonly lblProductInCart: Locator;
    private readonly txtQuantity: Locator;
    private readonly btnCheckout: Locator;
    private readonly lblNoItems: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.lblCartTitle = page.locator('text=Shopping Cart');
        this.lblProductInCart = page.locator('.product-name');
        this.txtQuantity = page.locator('input[name="quantity"]');
        this.btnCheckout = page.getByRole('button', { name: 'Checkout' });
        this.lblNoItems = page.locator('text=Your shopping cart is empty');
    }

    /**
     * Verifies the cart page is displayed
     * @returns Promise<boolean> - true if cart page is displayed
     */
    async isCartPageExists(): Promise<boolean> {
        try {
            return await this.lblCartTitle.isVisible();
        } catch (error) {
            console.log(`Error checking cart page: ${error}`);
            return false;
        }
    }

    /**
     * Verifies a product is in the cart
     * @returns Promise<boolean> - true if product is in cart
     */
    async isProductInCart(): Promise<boolean> {
        try {
            return await this.lblProductInCart.isVisible();
        } catch (error) {
            console.log(`Error checking product in cart: ${error}`);
            return false;
        }
    }

    /**
     * Gets the product quantity in cart
     */
    async getCartQuantity(): Promise<string> {
        return await this.txtQuantity.inputValue() || '0';
    }

    /**
     * Clicks Checkout button
     */
    async clickCheckout(): Promise<void> {
        await this.btnCheckout.click();
    }
}