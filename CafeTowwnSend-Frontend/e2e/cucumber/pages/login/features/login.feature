@Authentication @IgnoreForLocalhost
Feature: Habile Authentication

  @LoginScenario
  Scenario Outline: I can login into the CMS application
    Given Login: I am on the "/"
    And Login: I fill "<userId>" in "Username"
    And Login: I fill "<password>" in "Password"
    When Login: I wait for "1" seconds
    When Login: I click on "Login button"
    Then Login: I am on the "Search" page
    # Then Login: I see "My user ID" have "<userId>"

    # Replace userId and password with your own ID and password for Acceptance Environment (AE)
    Examples:
      | userId  | password  |
      | Luke    | Skywalker |
