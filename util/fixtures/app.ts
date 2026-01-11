import { test as base, Page } from '@playwright/test';
import RegisterPage from '../../pom/pages/registerPage';
import LoginPage from '../../pom/pages/LoginPage';
import RepositoryPage from '../../pom/pages/RepositoryPage';
import RepositorySettingsPage from '../../pom/pages/RepositorySettingsPage';
import DashboardPage from '../../pom/pages/DashboardPage';
import MigrateRepositoryPage from '../../pom/pages/MigrateRepositoryPage';
import ForgotPasswordPage from '../../pom/pages/ForgotPasswordPage';
import CreateRepositoryPage from '../../pom/pages/CreateRepositoryPage';


type App = {
    page: Page;
    registerPage: RegisterPage;
    loginPage: LoginPage;
    repositoryPage: RepositoryPage;
    repositorySettingsPage: RepositorySettingsPage;
    dashboardPage: DashboardPage;
    migrateRepositoryPage: MigrateRepositoryPage;
    forgotPasswordPage: ForgotPasswordPage;
    createRepositoryPage: CreateRepositoryPage;
}

export const test = base.extend<{app: App}>({
    app: async ({ page }, use) => {
        const app: App = {
            page,
            registerPage: new RegisterPage(page),
            loginPage: new LoginPage(page),
            repositoryPage: new RepositoryPage(page),
            repositorySettingsPage: new RepositorySettingsPage(page),
            dashboardPage: new DashboardPage(page),
            migrateRepositoryPage: new MigrateRepositoryPage(page),
            forgotPasswordPage: new ForgotPasswordPage(page),
            createRepositoryPage: new CreateRepositoryPage(page),
        };
        await use(app);
    }



})
export { expect } from '@playwright/test';