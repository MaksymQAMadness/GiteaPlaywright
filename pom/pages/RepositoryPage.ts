import BasePage from "../BasePage";

export default class RepositoryPage extends BasePage {
    public repositoryOwnerName = this.page.locator('//div[@class="flex-item-title tw-text-18"]//*').first();
    public repositoryName = this.page.locator('//div[@class="flex-item-title tw-text-18"]//*').nth(1);
    private settingsButton = this.page.locator('//a[contains(@href, "settings")]').nth(1);

    async getRepositoryFullName(): Promise<string> {
        const owner = await this.repositoryOwnerName.textContent();
        const repoName = await this.repositoryName.textContent();
        return `${owner}/${repoName}`;
    }

    async navigateToSettings() {
        await this.settingsButton.click();
    }
}