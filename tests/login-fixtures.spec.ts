import { test, expect } from "../util/fixtures/app";
import { faker } from "@faker-js/faker";
import { generateUniqueEmail } from "../util/data-generation/emails";
import { RegisterMessages } from "../test-data/messages/register-messages";
import RegisterPage from "../pom/pages/registerPage";


test.describe('user login tests', () => {

    let registeredUsername = faker.internet.username();
    let registeredPassword = faker.internet.password({ length: 10 });
    let registeredEmail = generateUniqueEmail();

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        let registerPage = new RegisterPage(page);
        await registerPage.navigateTo();
        await registerPage.registerNewUser(registeredUsername, registeredEmail, registeredPassword, registeredPassword);
        await page.close();
        await context.close();
    });

    test.beforeEach(async ({ app }) => {
        await app.loginPage.navigateTo();
    });

    test('successful user login using email', async ({ app }) => {
        await app.loginPage.login(registeredEmail, registeredPassword);
        await expect(app.dashboardPage.loggedInUserName).toHaveText(registeredUsername);
    });

    test('successful user login using username', async ({ app }) => {
        await app.loginPage.login(registeredUsername, registeredPassword);
        await expect(app.dashboardPage.loggedInUserName).toHaveText(registeredUsername);
    });

    test('invalid password login attempt', async ({ app }) => {
        await app.loginPage.login(registeredEmail, 'WrongPassword123!');
        await expect(app.loginPage.invalidCredentialsMessage).toBeVisible();
        await expect(app.loginPage.page.url()).toContain(app.loginPage.url);
    });

    test('empty email/username login attempt', async ({ app }) => {
        await app.loginPage.login('', registeredPassword);
        await expect(app.loginPage.userNameOrEmailField).toHaveJSProperty('validity.valueMissing', true);
        await expect(app.loginPage.userNameOrEmailField).toHaveJSProperty('validationMessage', RegisterMessages.EMPTY_VALUE_MESSAGE);
        await expect(app.loginPage.page.url()).toContain(app.loginPage.url);
    });

    test('empty password login attempt', async ({ app }) => {
        await app.loginPage.login(registeredEmail, '');
        await expect(app.loginPage.passwordField).toHaveJSProperty('validity.valueMissing', true);
        await expect(app.loginPage.passwordField).toHaveJSProperty('validationMessage', RegisterMessages.EMPTY_VALUE_MESSAGE);
        await expect(app.loginPage.page.url()).toContain(app.loginPage.url);
    });

    test('open register page from login page', async ({ app }) => {
        await app.loginPage.clickRegisterLink();
        await expect(app.registerPage.page.url()).toContain(app.registerPage.url);
    });

    test('open forgot password page from login page', async ({ app }) => {
        await app.loginPage.clickForgotPasswordLink();
        await expect(app.forgotPasswordPage.page.url()).toContain(app.forgotPasswordPage.url);
    });

})