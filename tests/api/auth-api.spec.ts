import { test, expect } from '@playwright/test';
import { Routes } from '../../api/endpoints/routes';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Authentication API Tests', () => {

    // ---------------------------------------------------------
    // Configuration
    // ---------------------------------------------------------

    const BASE_URL = Routes.BASE_URL;

    // ---------------------------------------------------------
    // 1. Successful Login
    // ---------------------------------------------------------

    test('POST - Successful Login @master @sanity @api', async ({ request }) => {
        const payload = {
            username: 'mor_2314',
            password: '83r5^_'
        };

        const response = await request.post(`${BASE_URL}${Routes.AUTH_LOGIN}`, {
            data: payload
        });

        expect(response.status()).toBe(201);

        const responseBody = await response.json();
        expect(responseBody.token).toBeTruthy();
        expect(typeof responseBody.token).toBe('string');
        expect(responseBody.token.length).toBeGreaterThan(0);
    });

    // ---------------------------------------------------------
    // 2. Invalid Login
    // ---------------------------------------------------------

    test('POST - Invalid Login @master @regression @api', async ({ request }) => {
        const payload = {
            username: 'invalid_user',
            password: 'wrong_password'
        };

        const response = await request.post(`${BASE_URL}${Routes.AUTH_LOGIN}`, {
            data: payload
        });

        expect(response.status()).toBe(401);

        const responseBody = await response.json();
        expect(responseBody).toBeTruthy();
    });
});
