import { test, expect } from "../util/fixtures/app";
import { faker } from "@faker-js/faker";
import TestUserData from '../test-data/users/testuser1.json';
import RepositoryService from "../api/services/RepositoryService";

test.describe('Create Repository Tests', () => {
    const testUserName = TestUserData.userData.username;
    test.use({ storageState: `.states/testuser1.json` });

    test.beforeEach(async ({ app }) => {
        await app.dashboardPage.navigateTo();
        await app.dashboardPage.clickCreateNewRepositoryButton();
    });

    test('successful repository creation', async ({ app }) => {
        const repositoryName = `Maktre-${faker.number.int()}`;
        const expectedFullRepositoryName = `${testUserName}/${repositoryName}`;
        await app.createRepositoryPage.createNewRepository(repositoryName);
        expect(await app.repositoryPage.getRepositoryFullName()).toBe(expectedFullRepositoryName);
        expect(app.repositoryPage.page.url()).toContain(expectedFullRepositoryName);
    });

    test('repository name is required validation', async ({ app }) => {
        await app.createRepositoryPage.createNewRepository('');
        await app.createRepositoryPage.validateEmptyErrorMessage(app.createRepositoryPage.repositoryNameField);
        expect(app.createRepositoryPage.page.url()).toContain(app.createRepositoryPage.url);
    });

    test('create repository with description', async ({ app }) => {
        const repositoryName = `Maktre-${faker.number.int()}`;
        const repositoryDescription = faker.lorem.sentence();
        await app.createRepositoryPage.createNewRepository(repositoryName, { repositoryDescription });
        await expect(app.repositoryPage.repositoryName).toHaveText(repositoryName);
        await app.repositoryPage.navigateToSettings();
        await expect(app.repositorySettingsPage.descriptionField).toHaveValue(repositoryDescription);
    });

    test('navigate to migrate repository page', async ({ app }) => {
        await app.createRepositoryPage.clickMigrateRepositoryLink();
        expect(app.migrateRepositoryPage.page.url()).toContain(app.migrateRepositoryPage.url);
    });




})

test.afterAll(async ({ request }) => {
    const repositoryService = new RepositoryService(request);
    const response = await request.get(`/api/v1/user/repos`, {
        headers: {
            'Authorization': `token ${TestUserData.userData.userToken}`
        }
    });
    const repos = await response.json();
    for (const repo of repos) {
        const repoName: string = repo.name;
        const owner: string = repo.owner.login;
        const response = await repositoryService.deleteRepository(owner, repoName, TestUserData.userData.userToken);
        test.expect(response.status()).toBe(204);
    }
});