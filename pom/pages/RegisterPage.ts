import { Locator } from "@playwright/test";
import BasePage from "../BasePage";

export default class RegisterPage extends BasePage {
    public url: string = '/user/sign_up';
    public userNameField: Locator = this.page.locator('//input[@id="user_name"]')
    public emailField: Locator = this.page.locator('//input[@id="email"]')
    public passwordField: Locator = this.page.locator('//input[@id="password"]')
    public confirmPasswordField: Locator = this.page.locator('//input[@id="retype"]')
    public registerAccountButton: Locator = this.page.locator('//button[@class="ui primary button tw-w-full"]')
    public passwordDoesNotMatchMessage: Locator = this.page.locator('//div[@class="ui negative message flash-message flash-error"]', { hasText: 'The passwords do not match.' })


    async enterUserName(username: string) {
        await this.userNameField.fill(username)
    }

    async enterEmail(email: string) {
        await this.emailField.fill(email)
    }

    async enterPassword(password: string) {
        await this.passwordField.fill(password)
    }

    async enterConfirmPassword(confirmPassword: string) {
        await this.confirmPasswordField.fill(confirmPassword)
    }

    async clickRegisterAccountButton() {
        await this.registerAccountButton.click()
    }

    async registerNewUser(username: string, email: string, password: string, confirmPassword: string) {
        await this.enterUserName(username)
        await this.enterEmail(email)
        await this.enterPassword(password)
        await this.enterConfirmPassword(confirmPassword)
        await this.clickRegisterAccountButton()
    }


}