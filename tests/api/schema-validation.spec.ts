import { test, expect } from '@playwright/test';
import { Routes } from '../../api/endpoints/routes';
import { DataProvider } from '../../utils/DataReader';
import dotenv from 'dotenv';

dotenv.config();

test.describe('JSON Schema Validation Tests', () => {

    const BASE_URL = Routes.BASE_URL;

    // ---------------------------------------------------------
    // 29. Product Response Schema
    // ---------------------------------------------------------

    test('GET - Product Response Schema Validation @master @sanity @api', async ({ request }) => {
        const productId = 1;
        const response = await request.get(
            `${BASE_URL}${Routes.GET_PRODUCT_BY_ID.replace('{id}', String(productId))}`
        );

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.id).toBeTruthy();
        expect(typeof responseBody.id).toBe('number');
        expect(typeof responseBody.title).toBe('string');
        expect(typeof responseBody.price).toBe('number');
        expect(typeof responseBody.category).toBe('string');
    });

    // ---------------------------------------------------------
    // 30. User Response Schema
    // ---------------------------------------------------------

    test('GET - User Response Schema Validation @master @sanity @api', async ({ request }) => {
        const userId = 1;
        const response = await request.get(
            `${BASE_URL}${Routes.GET_USER_BY_ID.replace('{id}', String(userId))}`
        );

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.id).toBeTruthy();
        expect(typeof responseBody.id).toBe('number');
        expect(typeof responseBody.email).toBe('string');
        expect(typeof responseBody.username).toBe('string');
    });

    // ---------------------------------------------------------
    // 31. Cart Response Schema
    // ---------------------------------------------------------

    test('GET - Cart Response Schema Validation @master @sanity @api', async ({ request }) => {
        const cartId = 1;
        const response = await request.get(
            `${BASE_URL}${Routes.GET_CART_BY_ID.replace('{id}', String(cartId))}`
        );

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.id).toBeTruthy();
        expect(typeof responseBody.id).toBe('number');
        expect(typeof responseBody.userId).toBe('number');
    });
});
