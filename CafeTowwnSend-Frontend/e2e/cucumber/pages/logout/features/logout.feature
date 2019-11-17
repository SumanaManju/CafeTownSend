@Logout @IgnoreForLocalhost
Feature: Habile Logout

  @LogoutScenario
  Scenario: Logout
    Given Logout: I am on the "/"
    Then Logout: I wait for "1" seconds
    When Logout: I click on "Logout"
    Then Logout: I am on the "Login" page
