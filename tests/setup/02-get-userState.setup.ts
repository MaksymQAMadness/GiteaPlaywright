import { faker } from '@faker-js/faker';
import { test, expect } from "../../util/fixtures/app";
import { generateUniqueEmail } from '../../util/data-generation/emails';
import saveUserData from '../../util/data-generation/saveUserData';


test('Register test user and save user state', async ({ app }) => {
    const testUsername = faker.internet.username();
    const testUserEmail = generateUniqueEmail();
    const testUserPassword = faker.internet.password({ length: 10 });

    await app.registerPage.navigateTo();
    await app.registerPage.registerNewUser(testUsername, testUserEmail, testUserPassword, testUserPassword);
    await expect(app.dashboardPage.loggedInUserName).toHaveText(testUsername);
    await app.page.context().storageState({ path: `.states/testuser1.json` });

    await app.page.locator('//div[@aria-label="Profile and Settings…"]').click();
    await app.page.locator('//a[@href="/user/settings"]').click();
    await app.page.locator('//a[@href="/user/settings/applications"]').click();
    await app.page.locator('//input[@id="name"]').fill('Test OAuth App');
    const checkboxes = app.page.locator('//*[contains(text() ,"Write")]');
    for (const checkbox of await checkboxes.all()) {
        await checkbox.click();
    }
    await app.page.locator('//*[contains(text(),"Generate Token")]').click();
    const token = await app.page.locator('//div[@class="ui info message flash-message flash-info"]').innerText();
    console.log('Generated Token:', token);


    saveUserData({ username: testUsername, userEmail: testUserEmail, userPassword: testUserPassword, userToken: token }, './test-data/users/testuser1.json');

})