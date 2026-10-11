import { Page, Locator, expect } from '@playwright/test';

export class MyAccountPage {
    private readonly page: Page;

    // Locators
    private readonly lblMyAccount: Locator;
    private readonly lnkLogout: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.lblMyAccount = page.locator('text=My Account');
        this.lnkLogout = page.getByRole('link', { name: 'Logout' });
    }

    /**
     * Verifies the My Account page is displayed
     * @returns Promise<boolean> - true if My Account page is displayed
     */
    async isMyAccountPageExists(): Promise<boolean> {
        try {
            return await this.lblMyAccount.isVisible();
        } catch (error) {
            console.log(`Error checking My Account page: ${error}`);
            return false;
        }
    }

    /**
     * Clicks Logout link
     */
    async clickLogout(): Promise<void> {
        await this.lnkLogout.click();
    }
}