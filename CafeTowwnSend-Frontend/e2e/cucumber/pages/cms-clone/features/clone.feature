@Clone
Feature: Clone - As an user, I want to clone my checklist

  @CloneScenario
  Scenario Outline: I am on CMS application and I want to clone my checklist
    Given Clone: I edit "My checklist item" have "<headline>"
    When Clone: I am on the "Edit" page
    And Clone: I click on "Clone button"
    And Clone: I wait for "1" seconds
    Then Clone: I click on "Delete" and wait for "Flight details" element to be removed
    And Clone: I wait for "1" seconds
    And Clone: I fill "<departureStation>" in "Departure station"
    And Clone: I fill "<arrivalStation>" in "Arrival station"
    And Clone: I fill "<flightNumber>" in "Flight number"
    And Clone: I click on "Aircraft type dropdown"
    And Clone: I select "<newAircraftType>" value in "Aircraft type"
    And Clone: I click on "Add applicable flight button"
    And Clone: I fill in "<newHeadline>" in ckeditor "Headline"
    And Clone: I wait for "1" seconds
    Then Clone: I click on "Save button"
    And Clone: I wait for "1" seconds
    Then Clone: I am on the "Search" page

    Examples:
      | departureStation | arrivalStation | flightNumber | aircraftType | headline          | newHeadline             | newAircraftType |
      | AMS              | MAA            | KL9999       | A333         | E2E update header | Clone E2E update header | B737            |

  @SearchScenario
  Scenario Outline: I am on CMS application and I want to search my cloned checklist
    Then Clone: I fill "<departureStation>" in "Departure station"
    And Clone: I fill "<arrivalStation>" in "Arrival station"
    And Clone: I fill "<flightNumber>" in "Flight number"
    And Clone: I click on "Aircraft type dropdown"
    And Clone: I select "<aircraftType>" value in "Aircraft type"
    And Clone: I wait for "1" seconds
    Then Clone: I click on "Search button"
    And Clone: I wait for "1" seconds
    Then Clone: I search "My checklist item" have "<newHeadline>"

    Examples:
      | departureStation | arrivalStation | flightNumber | aircraftType | newHeadline             |
      | AMS              | MAA            | KL9999       | B737         | Clone E2E update header |
