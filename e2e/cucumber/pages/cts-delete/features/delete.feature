@Delete
Feature: Delete - I want to delete the employee I created in CafeTownSend application

  @DeleteScenario
  Scenario Outline: I am on CafeTownSend application and I can delete the employee I created
    Given Delete: I am on the "View" page
    And Delete: I wait for "5" seconds
    When Delete: I click on "Checklist" have "<title>"
    And Delete: I wait for "5" seconds
    When Delete: I click on "Delete button"
    And Delete: I wait for "5" seconds
    Then Delete: I switch to alert
    And Delete: I wait for "5" seconds

    Examples:
      |  title   |
      |  AMS     |
