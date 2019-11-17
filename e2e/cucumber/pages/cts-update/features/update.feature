@Update
Feature: Update - I want to update the employee I created in CafeTownSend application

  @UpdateScenario
  Scenario Outline: I am on CafeTownSend application and I want to update the employee I created
    Given Update: I am on the "View" page
    And Update: I wait for "2" seconds
    And Update: I click on "Checklist" have "<title>"
    And Update: I wait for "2" seconds
    And Update: I fill "<newFirstName>" in "Firstname"
    And Update: I wait for "2" seconds
    And Update: I click on "Update button"
    And Update: I wait for "2" seconds

    Examples:
      | newFirstName |  title         |
      | Pichu        |  Sumana Manju  |


