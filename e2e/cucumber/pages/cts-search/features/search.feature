@Search
Feature: Search - I want to search the employee I created in CafeTownSend application

  @UpdateScenario
  Scenario Outline: I am on CafeTownSend application and I want to search the employee I created
    Given Search: I am on the "View" page
    And Search: I wait for "2" seconds
    And Search: I click on "Checklist" have "<title>"
    And Search: I wait for "2" seconds
    And Search: I click on "Back button"
    And Search: I wait for "2" seconds

    Examples:
      |  title        |
      | Sumana Manju  |


