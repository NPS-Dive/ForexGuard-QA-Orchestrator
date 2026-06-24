@authentication @smoke
Feature: User Authentication

  As a registered user of the Forex Trading Platform,
  I want to log in securely
  So that I can access my trading account.

  @p1 @web @mobile @testrail(C12345)
  Scenario: Successful Login with Valid Credentials
    Given the user is on the login page
    When the user enters valid credentials
    Then they should be redirected to the account dashboard
    And a "Welcome" message should be visible

  @p1 @web @mobile @testrail(C12346)
  Scenario: Failed Login with Invalid Credentials
    Given the user is on the login page
    When the user enters "invalid_user" and "wrong_password"
    Then an error message "Invalid username or password" should be displayed
    And the user should remain on the login page
