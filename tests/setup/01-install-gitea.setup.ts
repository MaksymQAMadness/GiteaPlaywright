import test, { expect } from "playwright/test";

test('install Gitea', async ({ page }) => {
    if(process.env.CI === 'true') {
    await page.goto('/');
    await expect(page.locator('//h3[@class="ui top attached header"]')).toHaveText('Initial Configuration');
    await page.locator('//button[text()="Install Gitea"]').click();
    await expect(page.getByText('Installing now, please wait...')).not.toBeVisible({ timeout: 60000 });
    }
});