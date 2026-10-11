/**
 * Test Case: Invalid Login Flow
 *
 * Tags: @master @sanity @web
 *
 * Steps:
 * 1) Open the application
 * 2) Navigate to My Account → Login
 * 3) Enter an invalid email and/or password
 * 4) Submit the form
 * 5) Verify that authentication fails
 * 6) Verify the appropriate warning/error message
 * 7) Verify that the customer is not authenticated
 *
 * Expected warning: Warning: No match for E-Mail Address and/or Password.
 */

// using custom fixtures
import { test, expect } from '../../fixtures/pageFixtures'

test('Invalid login flow @master @sanity @web', async ({ loginPage, homePage }) => {
    await test.step('1) Open the application', async () => {
        // Home page is already navigated to via fixture
    });

    await test.step('2) Navigate to My Account → Login', async () => {
        await homePage.clickMyAccount();
        await homePage.clickLogin();
    });

    await test.step('3) Enter invalid credentials', async () => {
        await loginPage.fillLoginForm('invalid@email.com', 'wrongpassword');
    });

    await test.step('4) Submit the login form', async () => {
        await loginPage.submitLogin();
    });

    await test.step('5) Verify that authentication fails', async () => {
        await expect(loginPage.isLoginFailure()).resolves.toBeTruthy();
    });

    await test.step('6) Verify the appropriate warning message', async () => {
        await expect(loginPage.lblWarning).toBeVisible();
    });

    await test.step('7) Verify that the customer is not authenticated', async () => {
        // If warning is shown, user should not be logged in
        await expect(loginPage.lblMyAccount).not.toBeVisible();
    });

    console.log('✅ ✔️ Invalid login flow completed successfully!');
});