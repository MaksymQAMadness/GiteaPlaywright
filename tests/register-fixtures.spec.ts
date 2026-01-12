import { test, expect } from '../util/fixtures/pageObject';
import { faker } from '@faker-js/faker';
import { RegisterMessages } from '../test-data/messages/register-messages';
import { generateUniqueEmail } from '../util/data-generation/emails';

test.describe('Register Page Tests', () => {
    
    test.beforeEach(async ({ registerPage }) => {
        await registerPage.navigateTo();
    });

    test('successful user registration', async ({ registerPage, dashboardPage }) => {
        const randomUsername = faker.internet.username();
        const password = faker.internet.password({ length: 10 });
        await registerPage.registerNewUser(randomUsername, generateUniqueEmail(), password, password);
        await expect(dashboardPage.successRegistrationMessage).toBeVisible();
        await expect(dashboardPage.loggedInUserName).toHaveText(randomUsername);

    });

    test('username is required validation', async ({ registerPage }) => {
        const password = faker.internet.password({ length: 10 });
        await registerPage.registerNewUser('', generateUniqueEmail(), password, password);
        await expect(registerPage.userNameField).toHaveJSProperty('validity.valueMissing', true);
        await expect(registerPage.userNameField).toHaveJSProperty('validationMessage', RegisterMessages.EMPTY_VALUE_MESSAGE);
        expect(registerPage.page.url()).toContain(registerPage.url);

    });

    test('email is required validation', async ({ registerPage }) => {
        const password = faker.internet.password({ length: 10 });
        await registerPage.registerNewUser(faker.internet.username(), '', password, password);
        await expect(registerPage.emailField).toHaveJSProperty('validity.valueMissing', true);
        await expect(registerPage.emailField).toHaveJSProperty('validationMessage', RegisterMessages.EMPTY_VALUE_MESSAGE);
        expect(registerPage.page.url()).toContain(registerPage.url);
    });

    test('email format validation', async ({ registerPage }) => {
        const password = faker.internet.password({ length: 10 });
        await registerPage.registerNewUser(faker.internet.username(), 'invalidEmailFormat', password, password);
        await expect(registerPage.emailField).toHaveJSProperty('validity.typeMismatch', true);
        await expect(registerPage.emailField).toHaveJSProperty('validationMessage', RegisterMessages.INVALID_EMAIL_MESSAGE);
        expect(registerPage.page.url()).toContain(registerPage.url);
    });

    test('password is required validation', async ({ registerPage }) => {
        await registerPage.registerNewUser(faker.internet.username(), generateUniqueEmail(), '', '');
        await expect(registerPage.passwordField).toHaveJSProperty('validity.valueMissing', true);
        await expect(registerPage.passwordField).toHaveJSProperty('validationMessage', RegisterMessages.EMPTY_VALUE_MESSAGE);
        expect(registerPage.page.url()).toContain(registerPage.url);
    });

    test('confirm password is required validation', async ({ registerPage }) => {
        await registerPage.registerNewUser(faker.internet.username(), generateUniqueEmail(), faker.internet.password({ length: 10 }), '');
        await expect(registerPage.confirmPasswordField).toHaveJSProperty('validity.valueMissing', true);
        await expect(registerPage.confirmPasswordField).toHaveJSProperty('validationMessage', RegisterMessages.EMPTY_VALUE_MESSAGE);
        expect(registerPage.page.url()).toContain(registerPage.url);
    });

    test('passwords do not match validation', async ({ registerPage }) => {
        await registerPage.registerNewUser(faker.internet.username(), generateUniqueEmail(), faker.internet.password({ length: 10 }), faker.internet.password({ length: 10 }));
        await expect(registerPage.passwordDoesNotMatchMessage).toBeVisible();
        expect(registerPage.page.url()).toContain(registerPage.url);
    });

});