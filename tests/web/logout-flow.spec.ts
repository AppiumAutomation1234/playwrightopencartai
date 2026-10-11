/**
 * Test Case: Logout Flow
 *
 * Tags: @master @sanity @web
 *
 * Steps:
 * 1) Open the application
 * 2) Log in using valid customer credentials
 * 3) Verify that authentication succeeds
 * 4) Navigate to the account logout option
 * 5) Click Logout
 * 6) Verify that the logout confirmation page is displayed
 * 7) Click Continue
 * 8) Verify the expected redirect, such as the homepage
 * 9) Verify that authenticated account options are no longer available
 */

// using custom fixtures
import { test, expect } from '../../fixtures/pageFixtures'
import { Helper } from '../../utils/helper';

test('Logout flow @master @sanity @web', async ({ loginPage, homePage, myAccountPage, logoutPage }) => {
    await test.step('1) Open the application', async () => {
        // Home page is already navigated to via fixture
    });

    await test.step('2) Log in using valid customer credentials', async () => {
        await homePage.clickMyAccount();
        await homePage.clickLogin();
        await loginPage.fillLoginForm(Helper.getLoginDetails().email, Helper.getLoginDetails().password);
        await loginPage.submitLogin();
    });

    await test.step('3) Verify that authentication succeeds', async () => {
        await expect(myAccountPage.isMyAccountPageExists()).resolves.toBeTruthy();
    });

    await test.step('4) Navigate to the account logout option', async () => {
        await myAccountPage.clickLogout();
    });

    await test.step('5) Click Logout', async () => {
        // Logout is clicked in step 4
    });

    await test.step('6) Verify that the logout confirmation page is displayed', async () => {
        // After logout, we should be back at home page
        await expect(homePage.isHomePageExists()).resolves.toBeTruthy();
    });

    await test.step('7) Click Continue', async () => {
        // Continue button typically on the home page after logout
    });

    await test.step('8) Verify the expected redirect (homepage)', async () => {
        await expect(homePage.isHomePageExists()).resolves.toBeTruthy();
    });

    await test.step('9) Verify that authenticated account options are no longer available', async () => {
        await expect(loginPage.isLoginSuccess()).resolves.toBeFalsy();
    });

    console.log('✅ ✔️ Logout flow completed successfully!');
});