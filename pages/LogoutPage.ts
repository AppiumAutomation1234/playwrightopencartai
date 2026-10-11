import { Page, Locator, expect } from '@playwright/test';

export class LogoutPage {
    private readonly page: Page;

    // Locators
    private readonly lblLogoutMessage: Locator;
    private readonly btnContinue: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.lblLogoutMessage = page.locator('text=You have been logged off');
        this.btnContinue = page.getByRole('link', { name: 'Continue' }) || page.locator('a[href*="route=common/home"]');
    }

    /**
     * Verifies the logout message is displayed
     * @returns Promise<boolean> - true if logout message is shown
     */
    async isLogoutMessageDisplayed(): Promise<boolean> {
        try {
            return await this.lblLogoutMessage.isVisible();
        } catch (error) {
            console.log(`Error checking logout message: ${error}`);
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