import { test, expect } from '@playwright/test';
import { Routes } from '../../api/endpoints/routes';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Products API Tests', () => {

    const BASE_URL = Routes.BASE_URL;

    // ---------------------------------------------------------
    // 3. Get All Products
    // ---------------------------------------------------------

    test('GET - All Products @master @sanity @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_ALL_PRODUCTS}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody.length).toBeGreaterThan(0);

        const firstProduct = responseBody[0];
        expect(firstProduct.id).toBeTruthy();
        expect(firstProduct.title).toBeTruthy();
        expect(firstProduct.price).toBeTruthy();
        expect(firstProduct.category).toBeTruthy();
        expect(firstProduct.image).toBeTruthy();
    });

    // ---------------------------------------------------------
    // 4. Get Product by ID
    // ---------------------------------------------------------

    test('GET - Product by ID @master @sanity @api', async ({ request }) => {
        const productId = 1;
        const response = await request.get(
            `${BASE_URL}${Routes.GET_PRODUCT_BY_ID.replace('{id}', String(productId))}`
        );

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.id).toBe(productId);
        expect(responseBody.title).toBeTruthy();
        expect(responseBody.price).toBeTruthy();
    });

    // ---------------------------------------------------------
    // 5. Get Products with Limit
    // ---------------------------------------------------------

    test('GET - Products with Limit @master @sanity @api', async ({ request }) => {
        const limit = 3;
        const response = await request.get(
            `${BASE_URL}${Routes.GET_PRODUCTS_WITH_LIMIT.replace('{limit}', String(limit))}`
        );

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody.length).toBe(limit);
    });

    // ---------------------------------------------------------
    // 6. Sort Products - Ascending
    // ---------------------------------------------------------

    test('GET - Sort Products Ascending @master @regression @api', async ({ request }) => {
        const response = await request.get(
            `${BASE_URL}${Routes.GET_PRODUCTS_SORTED.replace('{order}', 'asc')}`
        );

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();

        const ids = responseBody.map((p: any) => p.id);
        const sortedIds = [...ids].sort((a, b) => a - b);
        expect(ids).toEqual(sortedIds);
    });

    // ---------------------------------------------------------
    // 7. Sort Products - Descending
    // ---------------------------------------------------------

    test('GET - Sort Products Descending @master @regression @api', async ({ request }) => {
        const response = await request.get(
            `${BASE_URL}${Routes.GET_PRODUCTS_SORTED.replace('{order}', 'desc')}`
        );

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();

        const ids = responseBody.map((p: any) => p.id);
        const sortedIds = [...ids].sort((a, b) => b - a);
        expect(ids).toEqual(sortedIds);
    });

    // ---------------------------------------------------------
    // 8. Get All Product Categories
    // ---------------------------------------------------------

    test('GET - All Product Categories @master @sanity @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_ALL_CATEGORIES}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody.length).toBeGreaterThan(0);
    });

    // ---------------------------------------------------------
    // 9. Get Products by Category
    // ---------------------------------------------------------

    test('GET - Products by Category @master @sanity @api', async ({ request }) => {
        const category = 'electronics';
        const response = await request.get(
            `${BASE_URL}${Routes.GET_PRODUCTS_BY_CATEGORY.replace('{category}', category)}`
        );

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();

        for (const product of responseBody) {
            expect(product.category).toBe(category);
        }
    });

    // ---------------------------------------------------------
    // 10. Product CRUD - Create
    // ---------------------------------------------------------

    test('POST - Create Product @master @regression @api', async ({ request }) => {
        const payload = {
            title: 'Test Product',
            price: 99.99,
            description: 'A test product for API validation',
            image: 'https://example.com/test.jpg',
            category: 'electronics'
        };

        const response = await request.post(`${BASE_URL}${Routes.CREATE_PRODUCT}`, {
            data: payload
        });

        expect(response.status()).toBe(201);

        const responseBody = await response.json();
        expect(responseBody.id).toBeTruthy();
        expect(responseBody.title).toBe(payload.title);
    });

    // ---------------------------------------------------------
    // 11. Product CRUD - Update
    // ---------------------------------------------------------

    test('PUT - Update Product @master @regression @api', async ({ request }) => {
        const productId = 1;
        const payload = {
            title: 'Updated Product Title',
            price: 199.99,
            description: 'Updated description',
            image: 'https://example.com/updated.jpg',
            category: 'electronics'
        };

        const response = await request.put(
            `${BASE_URL}${Routes.UPDATE_PRODUCT.replace('{id}', String(productId))}`,
            { data: payload }
        );

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.id).toBe(productId);
        expect(responseBody.title).toBe(payload.title);
    });

    // ---------------------------------------------------------
    // 12. Product CRUD - Delete
    // ---------------------------------------------------------

    test('DELETE - Delete Product @master @regression @api', async ({ request }) => {
        const productId = 1;
        const response = await request.delete(
            `${BASE_URL}${Routes.DELETE_PRODUCT.replace('{id}', String(productId))}`
        );

        expect(response.status()).toBe(200);
    });
});
