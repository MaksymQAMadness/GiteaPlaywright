import { expect, Locator, Page } from "@playwright/test";
import { RegisterMessages } from "../test-data/messages/register-messages";

export default class BasePage {
    page: Page;
    url: string;

    constructor(page:Page){
        this.page = page;
        this.url = ''; 
    }

    async navigateTo(){
        await this.page.goto(this.url)
    }

    async validateEmptyErrorMessage(locator: Locator){
        await expect(locator).toHaveJSProperty('validity.valueMissing', true);
        await expect(locator).toHaveJSProperty('validationMessage', RegisterMessages.EMPTY_VALUE_MESSAGE);
    }
}