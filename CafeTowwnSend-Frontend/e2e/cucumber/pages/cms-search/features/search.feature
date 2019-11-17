@Search
Feature: Search - As an user, I want to search to find checklist items

  @SearchScenario
  Scenario Outline: I am on CMS application and I want to search my checklist
    Then Search: I fill "<departureStation>" in "Departure station"
    And Search: I fill "<arrivalStation>" in "Arrival station"
    And Search: I fill "<flightNumber>" in "Flight number"
    And Search: I click on "Aircraft type dropdown"
    And Search: I select "<aircraftType>" value in "Aircraft type"
    And Search: I wait for "5" seconds
    Then Search: I click on "Search button"
    And Search: I wait for "1" seconds
    Then Search: I search "No data container" have "<noData>"

    Examples:
      | departureStation | arrivalStation | flightNumber | aircraftType | noData        |
      | AMS              | PEK            | KL8888       | A333         | No Data Found |
