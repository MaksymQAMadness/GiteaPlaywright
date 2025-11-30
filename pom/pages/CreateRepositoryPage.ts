import BasePage from "../BasePage";

export default class CreateRepositoryPage extends BasePage {
    public url: string = '/repo/create';

    private migrateRepositoryLink = this.page.locator('//p[@class="ui center"]//a[@href="/repo/migrate"]');
    public repositoryNameField = this.page.locator('//input[@id="repo_name"]');
    private createRepositoryButton = this.page.locator('//button[@class="ui primary button"]', { hasText: 'Create Repository' });
    //public gitignoreSelector = this.page.locator(`//div[@id="_aria_dropdown_menu_28"]//*[${options.gitignoreTemplate}]`);
    private repositoryDescriptionField = this.page.locator('//textarea[@id="description"]')
    private gitIgnoreDropdown = this.page.locator('//div[@aria-controls="_aria_dropdown_menu_28"]');
    private licenseDropdown = this.page.locator('//div[@aria-controls="_aria_dropdown_menu_299"]');
    private makePrivateCheckbox = this.page.locator('//input[@id="_aria_label_input_0"]');
    private defaultBranchField = this.page.locator('//input[@id="default_branch"]');

    async clickMigrateRepositoryLink() {
        await this.migrateRepositoryLink.click();
    }

    async createNewRepository(repositoryName: string, options?: { repositoryDescription?: string, makePrivate?: boolean, gitignoreTemplate?: string, licenseTemplate?: string, defaultBranch?: string }) {
        await this.repositoryNameField.fill(repositoryName);
        if (options?.repositoryDescription) {
            await this.repositoryDescriptionField.fill(options.repositoryDescription);
        }

        await this.createRepositoryButton.click();
    }

}