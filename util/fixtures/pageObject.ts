import {test as base} from '@playwright/test';
import RegisterPage from '../../pom/pages/registerPage';
import LoginPage from '../../pom/pages/LoginPage';
import DashboardPage from '../../pom/pages/DashboardPage';
import ForgotPasswordPage from '../../pom/pages/ForgotPasswordPage';
import MigrateRepositoryPage from '../../pom/pages/MigrateRepositoryPage';
import RepositorySettingsPage from '../../pom/pages/RepositorySettingsPage';
import RepositoryPage from '../../pom/pages/RepositoryPage';

type PageObjects = {
    registerPage: RegisterPage;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    forgotPasswordPage: ForgotPasswordPage;
    migrateRepositoryPage: MigrateRepositoryPage;
    repositorySettingsPage: RepositorySettingsPage;
    repositoryPage: RepositoryPage;
};

export const test = base.extend<PageObjects>({
    registerPage: async ({ page }, use) => {
        let registerPage = new RegisterPage(page);
        await use(registerPage);
    },
    loginPage: async ({ page }, use) => {
        let loginPage = new LoginPage(page);
        await use(loginPage);
    },
    dashboardPage: async ({ page }, use) => {
        let dashboardPage = new DashboardPage(page);
        await use(dashboardPage);
    },
    forgotPasswordPage: async ({ page }, use) => {
        let forgotPasswordPage = new ForgotPasswordPage(page);
        await use(forgotPasswordPage);
    },
    migrateRepositoryPage: async ({ page }, use) => {
        let migrateRepositoryPage = new MigrateRepositoryPage(page);
        await use(migrateRepositoryPage);
    },
    repositorySettingsPage: async ({ page }, use) => {
        let repositorySettingsPage = new RepositorySettingsPage(page);
        await use(repositorySettingsPage);
    },
    repositoryPage: async ({ page }, use) => {
        let repositoryPage = new RepositoryPage(page);
        await use(repositoryPage);
    },
});

export { expect } from '@playwright/test';