import { Page, Locator, expect } from '@playwright/test';

export class AdminCustomersPage {
    private readonly page: Page;

    // Locators
    private readonly lblCustomers: Locator;
    private readonly btnAddNew: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.lblCustomers = page.locator('text=Customers');
        this.btnAddNew = page.getByRole('button', { name: 'Add New' });
    }

    /**
     * Verifies the customers page is displayed
     * @returns Promise<boolean> - true if customers page is shown
     */
    async isCustomersPageDisplayed(): Promise<boolean> {
        try {
            return await this.lblCustomers.isVisible();
        } catch (error) {
            console.log(`Error checking customers page: ${error}`);
            return false;
        }
    }

    /**
     * Clicks Add New button
     */
    async clickAddNew(): Promise<void> {
        await this.btnAddNew.click();
    }
}