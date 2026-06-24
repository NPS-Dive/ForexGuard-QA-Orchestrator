@wallet @regression
Feature: Wallet Management

  As a logged-in user,
  I want to manage my account funds,
  So I can prepare for trading.

  Background:
    Given the user is logged in with a standard account

  @p2 @web @testrail(C12350)
  Scenario: Successfully Deposit Funds
    Given the user's account balance is $1000.00
    When the user navigates to the "Deposit" page
    And they deposit $500.00 using a valid payment method
    Then they should see a success message "Deposit of $500.00 was successful"
    And their new account balance should be $1500.00
