import test, { expect } from "@playwright/test";
import LoginPage from "../pom/pages/LoginPage";
import RegisterPage from "../pom/pages/registerPage";
import DashboardPage from "../pom/pages/DashboardPage";
import { faker } from "@faker-js/faker";
import { generateUniqueEmail } from "../util/data-generation/emails";
import { RegisterMessages } from "../test-data/messages/register-messages";
import ForgotPasswordPage from "../pom/pages/ForgotPasswordPage";


test.describe('user login tests', () => {
    let loginPage: LoginPage;
    let registerPage: RegisterPage;
    let dashboardPage: DashboardPage;
    let forgotPasswordPage: ForgotPasswordPage;

    let registeredUsername = faker.internet.username();
    let registeredPassword = faker.internet.password({ length: 10 });
    let registeredEmail = generateUniqueEmail();

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();

        registerPage = new RegisterPage(page);
        await registerPage.navigateTo();
        await registerPage.registerNewUser(registeredUsername, registeredEmail, registeredPassword, registeredPassword);
        await page.close();
        await context.close();
    });

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        forgotPasswordPage = new ForgotPasswordPage(page);
        await loginPage.navigateTo();
    });

    test('successful user login using email', async ({ page }) => {
        await loginPage.login(registeredEmail, registeredPassword);
        await expect(dashboardPage.loggedInUserName).toHaveText(registeredUsername);
    });

    test('successful user login using username', async ({ page }) => {
        await loginPage.login(registeredUsername, registeredPassword);
        await expect(dashboardPage.loggedInUserName).toHaveText(registeredUsername);
    });

    test('invalid password login attempt', async ({ page }) => {
        await loginPage.login(registeredEmail, 'WrongPassword123!');
        await expect(loginPage.invalidCredentialsMessage).toBeVisible();
        await expect(page.url()).toContain(loginPage.url);
    });

    test('empty email/username login attempt', async ({ page }) => {
        await loginPage.login('', registeredPassword);
        await expect(loginPage.userNameOrEmailField).toHaveJSProperty('validity.valueMissing', true);
        await expect(loginPage.userNameOrEmailField).toHaveJSProperty('validationMessage', RegisterMessages.EMPTY_VALUE_MESSAGE);
        await expect(page.url()).toContain(loginPage.url);
    });

    test('empty password login attempt', async ({ page }) => {
        await loginPage.login(registeredEmail, '');
        await expect(loginPage.passwordField).toHaveJSProperty('validity.valueMissing', true);
        await expect(loginPage.passwordField).toHaveJSProperty('validationMessage', RegisterMessages.EMPTY_VALUE_MESSAGE);
        await expect(page.url()).toContain(loginPage.url);
    });

    test('open register page from login page', async ({ page }) => {
        await loginPage.clickRegisterLink();
        await expect(page.url()).toContain(registerPage.url);
    });

    test('open forgot password page from login page', async ({ page }) => {
        await loginPage.clickForgotPasswordLink();
        await expect(page.url()).toContain(forgotPasswordPage.url);
    });







})