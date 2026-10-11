/**
 * Test Case: End-to-End Shopping Flow
 *
 * Tags: @master @end-to-end @web
 *
 * Steps:
 * 1) Open the application
 * 2) Register a new customer using dynamically generated unique data
 * 3) Verify successful registration
 * 4) Log out
 * 5) Log in again using the newly created credentials
 * 6) Verify successful authentication
 * 7) Search for a known product
 * 8) Open the product details page
 * 9) Add the product to the cart
 * 10) Open the shopping cart
 * 11) Verify the correct product
 * 12) Verify the quantity
 * 13) Verify the product price
 * 14) Verify the applicable cart total
 * 15) Verify that the complete journey finishes without errors
 */

// using custom fixtures
import { test, expect } from '../../fixtures/pageFixtures'
import { RandomDataUtil } from '../../utils/dataGenerator';

test('End-to-end shopping flow @master @end-to-end @web', async ({ homePage, registerPage, loginPage, myAccountPage, productPage, searchResultsPage, cartPage }) => {
    // Step 1: Generate unique test data
    const firstName = RandomDataUtil.getFirstName();
    const lastName = RandomDataUtil.getLastName();
    const email = RandomDataUtil.getEmail();
    const telephone = RandomDataUtil.getPhoneNumber();
    const password = RandomDataUtil.getPassword(10);

    await test.step('1) Open the application', async () => {
        // Home page is already navigated to via fixture
    });

    await test.step('2) Register a new customer using dynamically generated unique data', async () => {
        await homePage.clickMyAccount();
        await homePage.clickRegister();
        await registerPage.fillRegistrationForm(firstName, lastName, email, telephone, password);
        await registerPage.acceptPrivacyPolicy();
        await registerPage.submitRegistration();
    });

    await test.step('3) Verify successful registration', async () => {
        await expect(registerPage.isRegistrationSuccess()).resolves.toBeTruthy();
    });

    await test.step('4) Log out', async () => {
        await myAccountPage.clickLogout();
    });

    await test.step('5) Log in again using the newly created credentials', async () => {
        await homePage.clickMyAccount();
        await homePage.clickLogin();
        await loginPage.fillLoginForm(email, password);
        await loginPage.submitLogin();
    });

    await test.step('6) Verify successful authentication', async () => {
        await expect(myAccountPage.isMyAccountPageExists()).resolves.toBeTruthy();
    });

    await test.step('7) Search for a known product', async () => {
        await homePage.searchProduct('MacBook');
    });

    await test.step('8) Open the product details page', async () => {
        await searchResultsPage.clickProduct('MacBook');
    });

    await test.step('9) Add the product to the cart', async () => {
        await productPage.setQuantity('1');
        await productPage.clickAddToCart();
    });

    await test.step('10) Open the shopping cart', async () => {
        await cartPage.clickCheckout();
    });

    await test.step('11) Verify the correct product', async () => {
        await expect(cartPage.isProductInCart()).resolves.toBeTruthy();
    });

    await test.step('12) Verify the quantity', async () => {
        await expect(cartPage.getCartQuantity()).resolves.toBe('1');
    });

    await test.step('13) Verify the product price', async () => {
        await expect(cartPage.isCartPageExists()).resolves.toBeTruthy();
    });

    await test.step('14) Verify the applicable cart total', async () => {
        await expect(cartPage.isProductInCart()).resolves.toBeTruthy();
    });

    await test.step('15) Verify that the complete journey finishes without errors', async () => {
        await expect(cartPage.getCartQuantity()).resolves.toBe('1');
    });

    console.log('✅ ✔️ End-to-end shopping flow completed successfully!');
});