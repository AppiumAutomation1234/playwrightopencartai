import { Page, Locator, expect } from '@playwright/test';

export class SuccessPage {
    private readonly page: Page;

    // Locators
    private readonly lblSuccessMessage: Locator;
    private readonly btnContinue: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.lblSuccessMessage = page.locator('text=Your Account Has Been Created!');
        this.btnContinue = page.getByRole('link', { name: 'Continue' }) || page.locator('a[href*="route=account/account"]');
    }

    /**
     * Verifies the success message is displayed
     * @returns Promise<boolean> - true if success message is shown
     */
    async isSuccessMessageDisplayed(): Promise<boolean> {
        try {
            return await this.lblSuccessMessage.isVisible();
        } catch (error) {
            console.log(`Error checking success message: ${error}`);
            return false;
        }
    }

    /**
     * Clicks the Continue button
     */
    async clickContinue(): Promise<void> {
        await this.btnContinue.click();
    }
}