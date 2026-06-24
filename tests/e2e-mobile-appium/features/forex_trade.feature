# tests/MobileE2E/features/forex_trade.feature
Feature: Mobile Forex App Trading
  As a user
  I want to use the mobile app
  So I can trade currency pairs

  Scenario: User opens app
    Given the forex mobile app is launched
    Then the login screen is displayed
