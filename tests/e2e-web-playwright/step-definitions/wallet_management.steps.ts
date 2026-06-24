import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('the user is logged in with a standard account', async function () {
  await this.page!.goto('http://localhost:3000/deposit.html');
});

Given(/^the user's account balance is \$(.*)$/, async function (balance) {
  const uiBalance = await this.page!.locator('#balance').textContent();
  expect(uiBalance).toContain(balance);
});

When('the user navigates to the {string} page', async function (page) {
  // We are already on deposit page for this mock
});

When(/^they deposit \$(.*) using a valid payment method$/, async function (amount) {
  await this.page!.fill('#deposit-amount', amount);
  await this.page!.click('#deposit-btn');
});

Then('they should see a success message {string}', async function (message) {
  const msg = await this.page!.locator('#success-message').textContent();
  expect(msg).toContain(message);
});

Then(/^their new account balance should be \$(.*)$/, async function (balance) {
  const uiBalance = await this.page!.locator('#balance').textContent();
  expect(uiBalance).toContain(balance);
});
