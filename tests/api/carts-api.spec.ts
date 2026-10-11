import { test, expect } from '@playwright/test';
import { Routes } from '../../api/endpoints/routes';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Carts API Tests', () => {

    const BASE_URL = Routes.BASE_URL;

    // ---------------------------------------------------------
    // 20. Get All Carts
    // ---------------------------------------------------------

    test('GET - All Carts @master @sanity @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_ALL_CARTS}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody.length).toBeGreaterThan(0);
    });

    // ---------------------------------------------------------
    // 21. Get Cart by ID
    // ---------------------------------------------------------

    test('GET - Cart by ID @master @sanity @api', async ({ request }) => {
        const cartId = 1;
        const response = await request.get(
            `${BASE_URL}${Routes.GET_CART_BY_ID.replace('{id}', String(cartId))}`
        );

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.id).toBe(cartId);
    });

    // ---------------------------------------------------------
    // 22. Get Carts by Date Range
    // ---------------------------------------------------------

    test('GET - Carts by Date Range @master @sanity @api', async ({ request }) => {
        const startDate = '2020-01-01';
        const endDate = '2020-12-31';
        const response = await request.get(
            `${BASE_URL}${Routes.GET_CARTS_BY_DATE_RANGE
                .replace('{startdate}', startDate)
                .replace('{enddate}', endDate)}`
        );

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();
    });

    // ---------------------------------------------------------
    // 23. Get User Cart
    // ---------------------------------------------------------

    test('GET - User Cart @master @sanity @api', async ({ request }) => {
        const userId = 1;
        const response = await request.get(
            `${BASE_URL}${Routes.GET_USER_CART.replace('{userId}', String(userId))}`
        );

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();
    });

    // ---------------------------------------------------------
    // 24. Get Carts with Limit
    // ---------------------------------------------------------

    test('GET - Carts with Limit @master @sanity @api', async ({ request }) => {
        const limit = 3;
        const response = await request.get(
            `${BASE_URL}${Routes.GET_CARTS_WITH_LIMIT.replace('{limit}', String(limit))}`
        );

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody.length).toBe(limit);
    });

    // ---------------------------------------------------------
    // 25. Sort Carts - Ascending & Descending
    // ---------------------------------------------------------

    test('GET - Sort Carts Ascending @master @regression @api', async ({ request }) => {
        const response = await request.get(
            `${BASE_URL}${Routes.GET_CARTS_SORTED.replace('{order}', 'asc')}`
        );

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();
    });

    test('GET - Sort Carts Descending @master @regression @api', async ({ request }) => {
        const response = await request.get(
            `${BASE_URL}${Routes.GET_CARTS_SORTED.replace('{order}', 'desc')}`
        );

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();
    });

    // ---------------------------------------------------------
    // 26. Cart CRUD - Create
    // ---------------------------------------------------------

    test('POST - Create Cart @master @regression @api', async ({ request }) => {
        const payload = {
            userId: 1,
            date: '2020-01-01',
            products: [
                { productId: 1, quantity: 2 }
            ]
        };

        const response = await request.post(`${BASE_URL}${Routes.CREATE_CART}`, {
            data: payload
        });

        expect(response.status()).toBe(201);

        const responseBody = await response.json();
        expect(responseBody.id).toBeTruthy();
        expect(responseBody.userId).toBe(payload.userId);
    });

    // ---------------------------------------------------------
    // 27. Cart CRUD - Update
    // ---------------------------------------------------------

    test('PUT - Update Cart @master @regression @api', async ({ request }) => {
        const cartId = 1;
        const payload = {
            userId: 1,
            date: '2020-01-01',
            products: [
                { productId: 1, quantity: 5 }
            ]
        };

        const response = await request.put(
            `${BASE_URL}${Routes.UPDATE_CART.replace('{id}', String(cartId))}`,
            { data: payload }
        );

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.id).toBe(cartId);
    });

    // ---------------------------------------------------------
    // 28. Cart CRUD - Delete
    // ---------------------------------------------------------

    test('DELETE - Delete Cart @master @regression @api', async ({ request }) => {
        const cartId = 1;
        const response = await request.delete(
            `${BASE_URL}${Routes.DELETE_CART.replace('{id}', String(cartId))}`
        );

        expect(response.status()).toBe(200);
    });
});
