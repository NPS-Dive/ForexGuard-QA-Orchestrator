Feature: Mobile App Login

  Scenario: User can log in successfully
    Given the user is on the login screen
    When the user enters username "bob@example.com" and password "10203040"
    And the user taps the login button
    Then the user should see the products screen
