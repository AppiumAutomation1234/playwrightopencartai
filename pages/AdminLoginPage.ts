import { Page, Locator, expect } from '@playwright/test';

export class AdminLoginPage {
    private readonly page: Page;

    // Locators
    private readonly txtUsername: Locator;
    private readonly txtPassword: Locator;
    private readonly btnLogin: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.txtUsername = page.getByLabel('Username') || page.locator('#input-username');
        this.txtPassword = page.getByLabel('Password') || page.locator('#input-password');
        this.btnLogin = page.getByRole('button', { name: 'Login' }) || page.locator('button[type="submit"]');
    }

    /**
     * Fills the admin login form
     * @param username - Admin username
     * @param password - Admin password
     */
    async fillLoginForm(username: string, password: string): Promise<void> {
        await this.txtUsername.fill(username);
        await this.txtPassword.fill(password);
    }

    /**
     * Submits the admin login form
     */
    async submitLogin(): Promise<void> {
        await this.btnLogin.click();
    }
}