import BasePage from "../BasePage";

export default class LoginPage extends BasePage {
    public url: string = '/user/login';

    public userNameOrEmailField = this.page.locator('//input[@id="user_name"]');
    public passwordField = this.page.locator('//input[@id="password"]');
    private loginButton = this.page.locator('//button[@class="ui primary button tw-w-full"]');
    public invalidCredentialsMessage = this.page.locator('//div[@class="ui negative message flash-message flash-error"]', { hasText: 'Username or password is incorrect.' });
    private registerLink = this.page.locator('//div[@class="field"]//a[@href="/user/sign_up"]');
    private forgotPasswordLink = this.page.locator('//a[@href="/user/forgot_password"]');


    async enterUserNameOrEmail(usernameOrEmail: string) {
        await this.userNameOrEmailField.fill(usernameOrEmail)
    }

    async enterPassword(password: string) {
        await this.passwordField.fill(password)
    }

    async clickLoginButton() {
        await this.loginButton.click()
    }

    async clickRegisterLink() {
        await this.registerLink.click()
    }

    async login(usernameOrEmail: string, password: string) {
        await this.enterUserNameOrEmail(usernameOrEmail)
        await this.enterPassword(password)
        await this.clickLoginButton()
    }

    async clickForgotPasswordLink() {
        await this.forgotPasswordLink.click()
    }

}