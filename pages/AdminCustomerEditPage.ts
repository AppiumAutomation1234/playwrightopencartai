import { Page, Locator, expect } from '@playwright/test';

export class AdminCustomerEditPage {
    private readonly page: Page;

    // Locators
    private readonly lblEditCustomer: Locator;
    private readonly btnSave: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.lblEditCustomer = page.locator('text=Edit Customer');
        this.btnSave = page.getByRole('button', { name: 'Save' });
    }

    /**
     * Verifies the edit customer page is displayed
     * @returns Promise<boolean> - true if edit page is shown
     */
    async isEditPageDisplayed(): Promise<boolean> {
        try {
            return await this.lblEditCustomer.isVisible();
        } catch (error) {
            console.log(`Error checking edit page: ${error}`);
            return false;
        }
    }

    /**
     * Clicks Save button
     */
    async clickSave(): Promise<void> {
        await this.btnSave.click();
    }
}