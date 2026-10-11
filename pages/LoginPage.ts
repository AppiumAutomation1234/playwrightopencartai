import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;

    // Locators
    private readonly txtEmail: Locator;
    private readonly txtPassword: Locator;
    private readonly btnLogin: Locator;
    private readonly lblWarning: Locator;
    private readonly lblMyAccount: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.txtEmail = page.getByLabel('E-Mail') || page.locator('#input-email');
        this.txtPassword = page.getByLabel('Password') || page.locator('#input-password');
        this.btnLogin = page.getByRole('button', { name: 'Login' }) || page.locator('button[type="submit"]');
        this.lblWarning = page.locator('text=Warning: No match for E-Mail Address and/or Password.');
        this.lblMyAccount = page.locator('text=My Account');
    }

    /**
     * Fills the login form with provided credentials
     * @param email - Email address
     * @param password - Password
     */
    async fillLoginForm(email: string, password: string): Promise<void> {
        await this.txtEmail.fill(email);
        await this.txtPassword.fill(password);
    }

    /**
     * Submits the login form
     */
    async submitLogin(): Promise<void> {
        await this.btnLogin.click();
    }

    /**
     * Verifies login success
     * @returns Promise<boolean> - true if login succeeded
     */
    async isLoginSuccess(): Promise<boolean> {
        try {
            return await this.lblMyAccount.isVisible();
        } catch (error) {
            console.log(`Error checking login success: ${error}`);
            return false;
        }
    }

    /**
     * Verifies login failure (warning message displayed)
     * @returns Promise<boolean> - true if login failed with warning
     */
    async isLoginFailure(): Promise<boolean> {
        try {
            return await this.lblWarning.isVisible();
        } catch (error) {
            console.log(`Error checking login failure: ${error}`);
            return false;
        }
    }
}