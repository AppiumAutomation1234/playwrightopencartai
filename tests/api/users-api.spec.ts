import { test, expect } from '@playwright/test';
import { Routes } from '../../api/endpoints/routes';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Users API Tests', () => {

    const BASE_URL = Routes.BASE_URL;

    // ---------------------------------------------------------
    // 13. Get All Users
    // ---------------------------------------------------------

    test('GET - All Users @master @sanity @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_ALL_USERS}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody.length).toBeGreaterThan(0);
    });

    // ---------------------------------------------------------
    // 14. Get User by ID
    // ---------------------------------------------------------

    test('GET - User by ID @master @sanity @api', async ({ request }) => {
        const userId = 1;
        const response = await request.get(
            `${BASE_URL}${Routes.GET_USER_BY_ID.replace('{id}', String(userId))}`
        );

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.id).toBe(userId);
    });

    // ---------------------------------------------------------
    // 15. Get Users with Limit
    // ---------------------------------------------------------

    test('GET - Users with Limit @master @sanity @api', async ({ request }) => {
        const limit = 3;
        const response = await request.get(
            `${BASE_URL}${Routes.GET_USERS_WITH_LIMIT.replace('{limit}', String(limit))}`
        );

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody.length).toBe(limit);
    });

    // ---------------------------------------------------------
    // 16. Sort Users - Ascending & Descending
    // ---------------------------------------------------------

    test('GET - Sort Users Ascending @master @regression @api', async ({ request }) => {
        const response = await request.get(
            `${BASE_URL}${Routes.GET_USERS_SORTED.replace('{order}', 'asc')}`
        );

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();
    });

    test('GET - Sort Users Descending @master @regression @api', async ({ request }) => {
        const response = await request.get(
            `${BASE_URL}${Routes.GET_USERS_SORTED.replace('{order}', 'desc')}`
        );

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();
    });

    // ---------------------------------------------------------
    // 17. User CRUD - Create
    // ---------------------------------------------------------

    test('POST - Create User @master @regression @api', async ({ request }) => {
        const payload = {
            email: 'test@example.com',
            username: 'testuser',
            password: 'testpass',
            name: {
                firstname: 'Test',
                lastname: 'User'
            },
            address: {
                city: 'Test City',
                street: 'Test Street',
                number: 1,
                zipcode: '12345',
                geolocation: {
                    lat: '0',
                    long: '0'
                }
            },
            phone: '1234567890'
        };

        const response = await request.post(`${BASE_URL}${Routes.CREATE_USER}`, {
            data: payload
        });

        expect(response.status()).toBe(201);

        const responseBody = await response.json();
        expect(responseBody.id).toBeTruthy();
    });

    // ---------------------------------------------------------
    // 18. User CRUD - Update
    // ---------------------------------------------------------

    test('PUT - Update User @master @regression @api', async ({ request }) => {
        const userId = 1;
        const payload = {
            email: 'updated@example.com',
            username: 'updateduser',
            password: 'updatedpass',
            name: {
                firstname: 'Updated',
                lastname: 'Name'
            },
            address: {
                city: 'Updated City',
                street: 'Updated Street',
                number: 2,
                zipcode: '54321',
                geolocation: {
                    lat: '1',
                    long: '1'
                }
            },
            phone: '0987654321'
        };

        const response = await request.put(
            `${BASE_URL}${Routes.UPDATE_USER.replace('{id}', String(userId))}`,
            { data: payload }
        );

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.id).toBe(userId);
    });

    // ---------------------------------------------------------
    // 19. User CRUD - Delete
    // ---------------------------------------------------------

    test('DELETE - Delete User @master @regression @api', async ({ request }) => {
        const userId = 1;
        const response = await request.delete(
            `${BASE_URL}${Routes.DELETE_USER.replace('{id}', String(userId))}`
        );

        expect(response.status()).toBe(200);
    });
});
