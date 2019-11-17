@Edit
Feature: Edit - As an user, I want to edit a checklist item

  @EditScenario
  Scenario Outline: I can edit the checklist item which just created by E2E test
    Given Edit: I edit "My checklist item" have "<headline>"
    Then Edit: I am on the "Edit" page
    Then Edit: I click on "Delete" and wait for "Flight details" element to be removed
    Then Edit: I fill "<departureStation>" in "Departure station"
    And Edit: I fill "<arrivalStation>" in "Arrival station"
    And Edit: I fill "<flightNumber>" in "Flight number"
    When Edit: I click on "Aircraft type dropdown"
    And Edit: I select "<aircraftType>" value in "Aircraft type"
    And Edit: I click on "Add applicable flight button"
    And Create: I fill in "<newHeadline>" in ckeditor "Headline"
    Then Edit: I click on "Save button"
    And Edit: I wait for "1" seconds
    Then Edit: I am on the "Search" page

    Examples:
      | headline        | departureStation | arrivalStation | flightNumber | aircraftType | newHeadline       |
      | E2E test header | AMS              | MAA            | KL9999       | B737         | E2E update header |

  @SearchScenario
  Scenario Outline: I am on CMS application and I want to search my checklist
    Then Edit: I fill "<departureStation>" in "Departure station"
    And Edit: I fill "<arrivalStation>" in "Arrival station"
    And Edit: I fill "<flightNumber>" in "Flight number"
    And Edit: I click on "Aircraft type dropdown"
    And Edit: I select "<aircraftType>" value in "Aircraft type"
    Then Edit: I click on "Search button"
    And Edit: I wait for "1" seconds
    Then Edit: I search "My checklist item" have "<newHeadline>"

    Examples:
      | departureStation | arrivalStation | flightNumber | aircraftType | newHeadline       |
      | AMS              | MAA            | KL9999       | B737         | E2E update header |
