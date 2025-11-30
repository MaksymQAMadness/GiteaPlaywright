import BasePage from "../BasePage";

export default class RepositorySettingsPage extends BasePage {
    public descriptionField = this.page.locator('//textarea[@id="description"]');
}