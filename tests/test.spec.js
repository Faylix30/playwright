// const { test, expect } = require('@playwright/test');
import {test, expect} from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
});

test('TC01', async ({ page }) => {
    // await page.setViewportSize({ width: 375, height: 667 });

    // await page.goto('https://practicetestautomation.com/practice-test-login/')
    await expect(page).toHaveTitle(/Practice Test Automation/);
    // await page.getByLabel('Username').fill('student');
    await page.locator('#username').fill('student')
    await page.getByLabel('Password').fill('Password123');
    await page.getByRole('button', { name: 'Submit' }).click();
    console.log(page.url('https://practicetestautomation.com/logged-in-successfully/'));
    await expect(page).toHaveTitle(/Logged In Successfully/);
    const logoLink = page.getByRole('link', { name: 'Practice Test Automation', exact: true });
    await expect(logoLink).toBeVisible();
    const logoImage = logoLink.locator('img');
    await expect(logoImage).toBeVisible();

    // await expect(page).toHaveURL('https://practicetestautomation.com/logged-in-successfully/');
    // await expect(page.getByRole('heading', { name: 'Logged In Successfully' })).toBeVisible();
    // expect(page.url()).toBe('https://practicetestautomation.com/logged-in-successfully/');
    const currentURL = page.url();
    expect(currentURL).toBe('https://practicetestautomation.com/logged-in-successfully/');

    await page.screenshot({ path: "./picture/picture2.jpg", fullPage: true }); // ตั้งชื่อไฟล์ให้มันด้วย
    // await page.locator('.header').screenshot({ path: 'screenshot.png' });
});

test('TC02', async ({ page }) => {
    await expect(page).toHaveTitle(/Practice Test Automation/);
    await page.getByLabel('Username').fill('incorrectuser');
    await page.getByLabel('Password').fill('Password123');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('#error')).toHaveText(/invalid!/);
});

test('TC03', async ({ page }) => {
    await expect(page).toHaveTitle(/Practice Test Automation/);
    await page.getByLabel('Username').fill('student');
    await page.getByLabel('Password').fill('incorrectPassword');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('#error')).toHaveText(/invalid!/);
});

// test.afterAll(async ({ page }) => {
//     expect(currentURL).toBe('https://practicetestautomation.com/logged-in-successfully/');
//     await page.getByRole('link', { name: 'Log out' }).click();
// });