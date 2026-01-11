import { faker } from '@faker-js/faker';
import { test, expect } from "../../util//fixtures/app";
import { generateUniqueEmail } from '../../util/data-generation/emails';
import * as fs from 'fs';
import path from 'path';
import saveUserData from '../../util/data-generation/saveUserData';


test('Register test user and save user state', async ({ app }) => {
    const testUsername = faker.internet.username();
    const testUserEmail = generateUniqueEmail();
    const testUserPassword = faker.internet.password({ length: 10 });

    await app.registerPage.navigateTo();
    await app.registerPage.registerNewUser(testUsername, testUserEmail, testUserPassword, testUserPassword);
    await expect(app.dashboardPage.loggedInUserName).toHaveText(testUsername);
    await app.page.context().storageState({ path: `.states/testuser1.json` });
    saveUserData({ username: testUsername, userEmail: testUserEmail, userPassword: testUserPassword }, './test-data/users/testuser1.json');

})