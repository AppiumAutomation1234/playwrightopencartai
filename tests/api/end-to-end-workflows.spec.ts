import { test, expect } from '@playwright/test';
import { Routes } from '../../api/endpoints/routes';
import { RandomDataUtil } from '../../utils/dataGenerator';
import dotenv from 'dotenv';

dotenv.config();

test.describe('End-to-End API Workflows', () => {

    const BASE_URL = Routes.BASE_URL;

    // ---------------------------------------------------------
    // 32. Product CRUD Workflow
    // ---------------------------------------------------------

    test('Product CRUD Workflow - Create, Update, Delete @master @end-to-end @api', async ({ request }) => {
        // 1. Create a product
        const payload = RandomDataUtil.generateProductPayload();
        const createResponse = await request.post(`${BASE_URL}${Routes.CREATE_PRODUCT}`, {
            data: payload
        });
        expect(createResponse.status()).toBe(201);
        const created = await createResponse.json();
        expect(created.id).toBeTruthy();
        const productId = created.id;

        // 2. Update the same product
        const updatedPayload = RandomDataUtil.generateUpdatedProductPayload();
        const updateResponse = await request.put(
            `${BASE_URL}${Routes.UPDATE_PRODUCT.replace('{id}', String(productId))}`,
            { data: updatedPayload }
        );
        expect(updateResponse.status()).toBe(200);
        const updated = await updateResponse.json();
        expect(updated.id).toBe(productId);

        // 3. Delete the same product
        const deleteResponse = await request.delete(
            `${BASE_URL}${Routes.DELETE_PRODUCT.replace('{id}', String(productId))}`
        );
        expect(deleteResponse.status()).toBe(200);
    });

    // ---------------------------------------------------------
    // 33. User CRUD Workflow
    // ---------------------------------------------------------

    test('User CRUD Workflow - Create, Update, Delete @master @end-to-end @api', async ({ request }) => {
        // 1. Create a user
        const payload = RandomDataUtil.generateUserPayload();
        const createResponse = await request.post(`${BASE_URL}${Routes.CREATE_USER}`, {
            data: payload
        });
        expect(createResponse.status()).toBe(201);
        const created = await createResponse.json();
        expect(created.id).toBeTruthy();
        const userId = created.id;

        // 2. Update the same user
        const updatedPayload = RandomDataUtil.generateUserUpdatePayload();
        const updateResponse = await request.put(
            `${BASE_URL}${Routes.UPDATE_USER.replace('{id}', String(userId))}`,
            { data: updatedPayload }
        );
        expect(updateResponse.status()).toBe(200);
        const updated = await updateResponse.json();
        expect(updated.id).toBe(userId);

        // 3. Delete the same user
        const deleteResponse = await request.delete(
            `${BASE_URL}${Routes.DELETE_USER.replace('{id}', String(userId))}`
        );
        expect(deleteResponse.status()).toBe(200);
    });

    // ---------------------------------------------------------
    // 34. Cart CRUD Workflow
    // ---------------------------------------------------------

    test('Cart CRUD Workflow - Create, Update, Delete @master @end-to-end @api', async ({ request }) => {
        // 1. Create a cart
        const payload = RandomDataUtil.generateCartPayload(1);
        const createResponse = await request.post(`${BASE_URL}${Routes.CREATE_CART}`, {
            data: payload
        });
        expect(createResponse.status()).toBe(201);
        const created = await createResponse.json();
        expect(created.id).toBeTruthy();
        const cartId = created.id;

        // 2. Update the same cart
        const updatedPayload = RandomDataUtil.generateUpdatedCartPayload(1);
        const updateResponse = await request.put(
            `${BASE_URL}${Routes.UPDATE_CART.replace('{id}', String(cartId))}`,
            { data: updatedPayload }
        );
        expect(updateResponse.status()).toBe(200);
        const updated = await updateResponse.json();
        expect(updated.id).toBe(cartId);

        // 3. Delete the same cart
        const deleteResponse = await request.delete(
            `${BASE_URL}${Routes.DELETE_CART.replace('{id}', String(cartId))}`
        );
        expect(deleteResponse.status()).toBe(200);
    });
});
