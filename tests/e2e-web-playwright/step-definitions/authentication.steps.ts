import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('the user is on the login page', async function () {
  await this.page!.goto('http://localhost:3000/login.html');
});

When('the user enters valid credentials', async function () {
  await this.page!.fill('#username', 'qa_user');
  await this.page!.fill('#password', 'password123');
  await this.page!.click('#login-button');
});

Then('they should be redirected to the account dashboard', async function () {
  // Added ! to tell TypeScript this.page is definitely defined
  await this.page!.waitForURL('**/dashboard.html');
  await expect(this.page!).toHaveURL('http://localhost:3000/dashboard.html');
});

Then('a {string} message should be visible', async function (message: string) {
  const welcomeText = await this.page!.locator('#welcome-message').textContent();
  expect(welcomeText).toContain(message);
});

When('the user enters {string} and {string}', async function (username, password) {
  await this.page!.fill('#username', username);
  await this.page!.fill('#password', password);
  await this.page!.click('#login-button');
});

Then('an error message {string} should be displayed', async function (errorMessage) {
  const errorText = await this.page!.locator('#error-message').textContent();
  expect(errorText).toContain(errorMessage);
});

Then('the user should remain on the login page', async function () {
  await expect(this.page!).toHaveURL('http://localhost:3000/login.html');
});
