import { Page, Locator, expect } from '@playwright/test';

export class RegisterPage {
    private readonly page: Page;

    // Locators
    private readonly txtFirstName: Locator;
    private readonly txtLastName: Locator;
    private readonly txtEmail: Locator;
    private readonly txtTelephone: Locator;
    private readonly txtPassword: Locator;
    private readonly txtPasswordConfirm: Locator;
    private readonly chkPrivacyPolicy: Locator;
    private readonly btnContinue: Locator;
    private readonly lblSuccess: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.txtFirstName = page.getByLabel('First Name') || page.locator('#input-firstname');
        this.txtLastName = page.getByLabel('Last Name') || page.locator('#input-lastname');
        this.txtEmail = page.getByLabel('E-Mail') || page.locator('#input-email');
        this.txtTelephone = page.getByLabel('Telephone') || page.locator('#input-telephone');
        this.txtPassword = page.getByLabel('Password') || page.locator('#input-password');
        this.txtPasswordConfirm = page.getByLabel('Password Confirm') || page.locator('#input-confirm');
        this.chkPrivacyPolicy = page.getByRole('checkbox', { name: 'Privacy Policy' }) || page.locator('input[name="agree"]');
        this.btnContinue = page.getByRole('button', { name: 'Continue' }) || page.locator('button[type="submit"]');
        this.lblSuccess = page.locator('text=Your Account Has Been Created!');
    }

    /**
     * Fills the registration form with provided data
     * @param firstName - First name
     * @param lastName - Last name
     * @param email - Email address
     * @param telephone - Telephone number
     * @param password - Password
     */
    async fillRegistrationForm(firstName: string, lastName: string, email: string, telephone: string, password: string): Promise<void> {
        await this.txtFirstName.fill(firstName);
        await this.txtLastName.fill(lastName);
        await this.txtEmail.fill(email);
        await this.txtTelephone.fill(telephone);
        await this.txtPassword.fill(password);
        await this.txtPasswordConfirm.fill(password);
    }

    /**
     * Accepts the privacy policy
     */
    async acceptPrivacyPolicy(): Promise<void> {
        await this.chkPrivacyPolicy.check();
    }

    /**
     * Submits the registration form
     */
    async submitRegistration(): Promise<void> {
        await this.btnContinue.click();
    }

    /**
     * Verifies registration success
     * @returns Promise<boolean> - true if registration succeeded
     */
    async isRegistrationSuccess(): Promise<boolean> {
        try {
            return await this.lblSuccess.isVisible();
        } catch (error) {
            console.log(`Error checking registration success: ${error}`);
            return false;
        }
    }
}