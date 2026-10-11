/**
 * Test Case: Login Flow (Data Driven using External File)
 *
 * Tags: @master @datadriven @web
 *
 * Test Data: Load rows from opencart_logindata.json (or .csv/.xlsx)
 * Each row contains: testName, email, password, expected
 *
 * For expected: success - verify login succeeds and My Account page is displayed
 * For expected: failure - verify login fails with warning message
 * For blank email/password - verify the application's actual validation/error behavior
 */

// using custom fixtures
import { test, expect } from '../../fixtures/pageFixtures'
import { Helper } from '../../utils/helper';
import { DataProvider } from '../../utils/DataReader';

test.describe('OpenCart Login Data-Driven Tests', () => {
    // Load test data from external file
    const testData = DataProvider.readJson('./testdata/opencart_logindata.json');

    for (const dataRow of testData) {
        const { testName, email, password, expected } = dataRow;

        test(`Data-driven login: ${testName} @master @datadriven @web`, async ({ loginPage, homePage }) => {
            await test.step('1) Open the application', async () => {
                // Home page is already navigated to via fixture
            });

            await test.step('2) Navigate to login page', async () => {
                await homePage.clickMyAccount();
                await homePage.clickLogin();
            });

            await test.step('3) Enter email and password', async () => {
                // If a value is blank/whitespace, leave that field empty
                const emailToUse = email && email.trim() ? email : '';
                const passwordToUse = password && password.trim() ? password : '';

                await loginPage.fillLoginForm(emailToUse, passwordToUse);
            });

            await test.step('4) Submit the login form', async () => {
                await loginPage.submitLogin();
            });

            await test.step(`5) Validate the result based on expected: ${expected}`, async () => {
                if (expected === 'success') {
                    // Verify login is successful
                    await expect(loginPage.isLoginSuccess()).resolves.toBeTruthy();
                    // Verify the My Account page is displayed
                    await expect(homePage.isHomePageExists()).resolves.toBeTruthy();
                } else if (expected === 'failure') {
                    // Verify login is unsuccessful
                    await expect(loginPage.isLoginFailure()).resolves.toBeTruthy();
                    // Verify the appropriate OpenCart warning/error message
                    await expect(loginPage.lblWarning).toBeVisible();
                    // Verify that the customer is not authenticated
                    await expect(loginPage.lblMyAccount).not.toBeVisible();
                } else {
                    // Handle other validation scenarios as needed
                    console.log(`Expected value: ${expected}`);
                }
            });
        });
    }
});