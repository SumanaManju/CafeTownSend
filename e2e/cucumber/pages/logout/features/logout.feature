@Logout
Feature: Logout CafeTownSend application

  @LogoutScenario
  Scenario: I logout CafeTownSend application
    Given Logout: I am on the "MainViewEmployee" page
    Then Logout: I wait for "5" seconds
    When Logout: I click on "Logout"
    Then Logout: I wait for "5" seconds
    Then Logout: I am on the "/"
