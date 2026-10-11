import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
    private readonly page: Page;

    // Locators
    private readonly lnkMyAccount: Locator;
    private readonly lnkRegister: Locator;
    public readonly lnkLogin: Locator;
    private readonly lblWelcome: Locator;
    private readonly txtSearch: Locator;
    private readonly btnSearch: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.lnkMyAccount = page.getByRole('link', { name: 'My Account' }).first();
        this.lnkRegister = page.getByRole('link', { name: 'Register' });
        this.lnkLogin = page.getByRole('link', { name: 'Login' });
        this.lblWelcome = page.locator('h2');
        this.txtSearch = page.getByPlaceholder('Search') || page.locator('input[name="search"]');
        this.btnSearch = page.getByRole('button', { name: 'Search' }) || page.locator('button[type="submit"]');
    }

    /**
     * Clicks My Account link
     */
    async clickMyAccount(): Promise<void> {
        await this.lnkMyAccount.click();
    }

    /**
     * Clicks Register link
     */
    async clickRegister(): Promise<void> {
        await this.lnkRegister.click();
    }

    /**
     * Clicks Login link
     */
    async clickLogin(): Promise<void> {
        await this.lnkLogin.click();
    }

    /**
     * Searches for a product
     * @param productName - Product name to search for
     */
    async searchProduct(productName: string): Promise<void> {
        await this.txtSearch.fill(productName);
        await this.btnSearch.click();
    }

    /**
     * Verifies the home page is displayed
     * @returns Promise<boolean> - true if the home page is displayed
     */
    async isHomePageExists(): Promise<boolean> {
        try {
            return await this.lblWelcome.isVisible();
        } catch (error) {
            console.log(`Error checking home page: ${error}`);
            return false;
        }
    }
}