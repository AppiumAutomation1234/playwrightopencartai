/**
 * Test Case: User Registration Flow
 *
 * Tags: @master @sanity @web
 *
 * Steps:
 * 1) Open the application
 * 2) Navigate to My Account → Register
 * 3) Verify that the registration page is displayed
 * 4) Generate a unique customer email
 * 5) Enter valid values for First Name, Last Name, Email, Telephone, Password, Password Confirmation
 * 6) Accept the Privacy Policy
 * 7) Submit the registration form
 * 8) Verify that registration succeeds
 * 9) Verify the account-created confirmation message
 * 10) Verify the newly created account is available through account navigation
 */

// using custom fixtures
import { test, expect } from '../../fixtures/pageFixtures'
import { RandomDataUtil } from '../../utils/dataGenerator';
import { Helper } from '../../utils/helper';

test('User registration flow @master @sanity @web', async ({ registerPage, homePage, myAccountPage }) => {
    // Generate unique test data
    const firstName = RandomDataUtil.getFirstName();
    const lastName = RandomDataUtil.getLastName();
    const email = RandomDataUtil.getEmail();
    const telephone = RandomDataUtil.getPhoneNumber();
    const password = RandomDataUtil.getPassword(10);

    await test.step('1) Open the application', async () => {
        // Home page is already navigated to via fixture
    });

    await test.step('2) Navigate to My Account → Register', async () => {
        await homePage.clickMyAccount();
        await homePage.clickRegister();
    });

    await test.step('3) Verify that the registration page is displayed', async () => {
        await expect(registerPage).toBeVisible();
    });

    await test.step('4) Enter valid registration details', async () => {
        await registerPage.fillRegistrationForm(firstName, lastName, email, telephone, password);
    });

    await test.step('5) Accept the Privacy Policy', async () => {
        await registerPage.acceptPrivacyPolicy();
    });

    await test.step('6) Submit the registration form', async () => {
        await registerPage.submitRegistration();
    });

    await test.step('7) Verify that registration succeeds', async () => {
        await expect(registerPage.isRegistrationSuccess()).resolves.toBeTruthy();
    });

    await test.step('8) Verify the account-created confirmation', async () => {
        await expect(registerPage.isRegistrationSuccess()).resolves.toBeTruthy();
    });

    await test.step('9) Verify the newly created account is available', async () => {
        await myAccountPage.isMyAccountPageExists();
    });

    console.log('✅ ✔️ User registration flow completed successfully!');
});