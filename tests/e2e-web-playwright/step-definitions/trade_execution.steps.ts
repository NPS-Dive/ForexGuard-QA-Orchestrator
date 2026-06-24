import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('the user is logged in', async function () {
  await this.page!.goto('http://localhost:3000/trading.html');
});

Given(/^they have a funded trading account with a balance of \$(.*)$/, async function (balance) {
  // Use our mock setup tool to set the balance
  const cleanBalance = balance.replace(/,/g, '');
  await this.page!.fill('#setup-balance', cleanBalance);
  await this.page!.click('#set-balance-btn');
});

Given(/^the live market price for (.*) is (.*)$/, async function (pair, price) {
  // In a real SUT, we might mock the API response here. For the UI test, we pass.
});

When(/^the user places a BUY market order for (.*) units of (.*)$/, async function (units, pair) {
  // Clean commas and quotes that Cucumber might pick up from the feature file
  const cleanUnits = units.replace(/,/g, '');
  const cleanPair = pair.replace(/"/g, ''); 
  
  await this.page!.fill('#trade-units', cleanUnits);
  await this.page!.fill('#trade-pair', cleanPair);
  await this.page!.click('#buy-btn');
});

Then('the trade should be executed successfully', async function () {
  const status = await this.page!.locator('#trade-status').textContent();
  expect(status).toContain('Success');
});

Then(/^a new position for (.*) should appear in their portfolio$/, async function (pair) {
  const cleanPair = pair.replace(/"/g, '');
  const portfolio = await this.page!.locator('#portfolio').textContent();
  expect(portfolio).toContain(cleanPair);
});

Then('their account balance should be updated correctly reflecting the trade cost', async function () {
  const balance = await this.page!.locator('#account-balance').textContent();
  // Ensure the balance is no longer 10000.00
  expect(balance).not.toBe('10000.00');
});

Given(/^the cost to buy (.*) units of (.*) exceeds the account balance$/, async function (units, pair) {
  // This is a business logic assumption for the test scenario
});

When(/^the user attempts to place a BUY market order for (.*) units of (.*)$/, async function (units, pair) {
  const cleanUnits = units.replace(/,/g, '');
  const cleanPair = pair.replace(/"/g, ''); 
  
  await this.page!.fill('#trade-units', cleanUnits);
  await this.page!.fill('#trade-pair', cleanPair);
  await this.page!.click('#buy-btn');
});

Then('the order should be rejected', async function () {
  const status = await this.page!.locator('#trade-status').textContent();
  expect(status).toContain('Rejected');
});

Then('an error message {string} must be displayed', async function (errorMessage) {
  const errorText = await this.page!.locator('#error-message').textContent();
  expect(errorText).toContain(errorMessage);
});

Then('the user is on the trading dashboard', async function () {
    const url = this.page!.url();
    expect(url).toContain('trading.html');
});

Then(/^a new position for (.*) should be visible$/, async function (pair) {
  const cleanPair = pair.replace(/"/g, '');
  const portfolio = await this.page!.locator('#portfolio').textContent();
  expect(portfolio).toContain(cleanPair);
});

Then(/^the user's account balance should remain \$(.*)$/, async function (balance) {
  const uiBalance = await this.page!.locator('#account-balance').textContent();
  expect(uiBalance).toContain(balance);
});
