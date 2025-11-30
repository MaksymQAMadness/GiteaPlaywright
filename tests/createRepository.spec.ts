import test, { expect } from "@playwright/test";
import RegisterPage from "../pom/pages/registerPage";
import DashboardPage from "../pom/pages/DashboardPage";
import CreateRepositoryPage from "../pom/pages/CreateRepositoryPage";
import LoginPage from "../pom/pages/LoginPage";
import RepositoryPage from "../pom/pages/RepositoryPage";
import RepositorySettingsPage from "../pom/pages/RepositorySettingsPage";
import { faker } from "@faker-js/faker";
import { generateUniqueEmail } from "../util/data-generation/emails";
import MigrateRepositoryPage from "../pom/pages/MigrateRepositoryPage";


test.describe('Create Repository Tests', () => {
    let registerPage: RegisterPage;
    let dashboardPage: DashboardPage;
    let createRepositoryPage: CreateRepositoryPage;
    let loginPage: LoginPage;
    let repositoryPage: RepositoryPage;
    let repositorySettingsPage: RepositorySettingsPage;
    let migrateRepositoryPage: MigrateRepositoryPage;

    const testUsername = faker.internet.username();
    const testUserEmail = generateUniqueEmail();
    const testUserPassword = faker.internet.password({ length: 10 });

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();

        registerPage = new RegisterPage(page);
        await registerPage.navigateTo();
        await registerPage.registerNewUser(testUsername, testUserEmail, testUserPassword, testUserPassword);
        await page.close();
        await context.close();
    });

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        createRepositoryPage = new CreateRepositoryPage(page);
        repositoryPage = new RepositoryPage(page);
        repositorySettingsPage = new RepositorySettingsPage(page);
        migrateRepositoryPage = new MigrateRepositoryPage(page);

        await loginPage.navigateTo();
        await loginPage.login(testUserEmail, testUserPassword);
        await dashboardPage.clickCreateNewRepositoryButton();
    });

    test('successful repository creation', async ({ page }) => {
        const repositoryName = `Maktre-${faker.number.int()}`;
        const expectedFullRepositoryName = `${testUsername}/${repositoryName}`;
        await createRepositoryPage.createNewRepository(repositoryName);
        expect(await repositoryPage.getRepositoryFullName()).toBe(expectedFullRepositoryName);
        expect(page.url()).toContain(expectedFullRepositoryName);
    });

    test('repository name is required validation', async ({ page }) => {
        await createRepositoryPage.createNewRepository('');
        await createRepositoryPage.validateEmptyErrorMessage(createRepositoryPage.repositoryNameField);
        expect(page.url()).toContain(createRepositoryPage.url);
    });

    test('create repository with description', async ({ page }) => {
        const repositoryName = `Maktre-${faker.number.int()}`;
        const repositoryDescription = faker.lorem.sentence();
        await createRepositoryPage.createNewRepository(repositoryName, { repositoryDescription });
        await expect(repositoryPage.repositoryName).toHaveText(repositoryName);
        await repositoryPage.navigateToSettings();
        await expect(repositorySettingsPage.descriptionField).toHaveValue(repositoryDescription);
    });

    test('navigate to migrate repository page', async ({ page }) => {
        await createRepositoryPage.clickMigrateRepositoryLink();
        expect(page.url()).toContain(migrateRepositoryPage.url);
    });




})