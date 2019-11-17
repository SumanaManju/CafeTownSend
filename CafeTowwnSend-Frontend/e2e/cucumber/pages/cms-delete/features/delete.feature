@Delete
Feature: Delete - As an user, I want to delete a checklist item

  @DeleteScenario
  Scenario Outline: I can delete the checklist item which just created by E2E test
    Given Delete: I delete "My checklist item" have "<headline>"
    Then Delete: I see "1" "Delete confirmation modal"
    And Delete: I see "Delete confirm" button is enabled
    Then Delete: I click on "Delete confirm" and wait for "My checklist item" element to be removed
    And Delete: I wait for "1" seconds

    Examples:
      | headline                |
      | Clone E2E update header |
      | E2E update header       |

