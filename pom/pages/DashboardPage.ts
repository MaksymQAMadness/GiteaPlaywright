import BasePage from "../BasePage";

export default class DashboardPage extends BasePage {
    public url: string = '/';

    public successRegistrationMessage = this.page.locator('//div[@class="ui positive message flash-message flash-success"]', { hasText: 'Account was successfully created. Welcome!' });
    public loggedInUserName = this.page.locator('//span[@class="gt-ellipsis"]').first();
    private logoutButton = this.page.locator('//a[@data-url="/user/logout"]');
    private createNewRepositoryButton = this.page.locator('//a[@data-tooltip-content="New Repository"]');


    async clickLogoutButton() {
        await this.logoutButton.click()
    }

    async clickCreateNewRepositoryButton() {
        await this.createNewRepositoryButton.click()
    }

}