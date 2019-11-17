@Authentication
Feature: Login CafeTownSend application

  @LoginScenario
  Scenario Outline: I login to CafeTownSend application
    Given Login: I am on the "/"
    When Login: I wait for "5" seconds
    And Login: I fill "<userId>" in "Username"
    And Login: I fill "<password>" in "Password"
    When Login: I wait for "5" seconds
    When Login: I click on "Login button"
    When Login: I wait for "5" seconds
    Then Login: Check "Greeting" message

    Examples:
      | userId  | password  |
      | Luke    | Skywalker |
