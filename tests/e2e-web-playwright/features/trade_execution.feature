@trading @core @p1
Feature: Forex Trade Execution

  As a trader,
  I want to execute currency pair trades,
  So I can speculate on the market.

  Background:
    Given the user is logged in
    And they have a funded trading account with a balance of $10,000.00

  @regression @web @testrail(C12401)
  Scenario: Execute a successful market order
    Given the live market price for EUR/USD is 1.0750
    When the user places a BUY market order for 1,000 units of "EUR/USD"
    Then the trade should be executed successfully
    And a new position for "EUR/USD" should appear in their portfolio
    And their account balance should be updated correctly reflecting the trade cost

  @high-impact @web @mobile @testrail(C12402)
  Scenario: Block trade execution due to insufficient funds
    Given they have a funded trading account with a balance of $500.00
    And the cost to buy 100,000 units of "GBP/JPY" exceeds the account balance
    When the user attempts to place a BUY market order for 100,000 units of "GBP/JPY"
    Then the order should be rejected
    And an error message "Insufficient funds to execute trade" must be displayed
    And the user's account balance should remain $500.00

  @regression @web @testrail(C12403)
  Scenario Outline: Execute trades for various currency pairs
    Given the user is on the trading dashboard
    When the user places a BUY market order for <Quantity> units of "<Pair>"
    Then the trade should be executed successfully
    And a new position for "<Pair>" should be visible

    Examples:
      | Pair    | Quantity |
      | "USD/JPY" | 5000     |
      | "AUD/CAD" | 2500     |
      | "EUR/GBP" | 10000    |
