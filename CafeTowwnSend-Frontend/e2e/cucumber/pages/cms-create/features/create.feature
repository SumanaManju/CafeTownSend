@Create
Feature: Create - As an user, I want to create a new checklist in CMS application

  @CreateScenario
  Scenario Outline: I am on CMS application and I can create a new checklist item

    Given Create: I am on the "Search" page
    And Create: I click on "Add item button"
    And Create: I am on the "Create" page
    When Create: I wait for "1" seconds
    And Create: I fill "<departureStation>" in "Departure station"
    And Create: I fill "<arrivalStation>" in "Arrival station"
    And Create: I fill "<flightNumber>" in "Flight number"
    When Create: I click on "Aircraft type dropdown"
    And Create: I select "<aircraftType>" value in "Aircraft type"
    And Create: I click on "Add applicable flight button"
    When Create: I wait for "1" seconds
    When Create: I click on "Area dropdown"
    And Create: I select "<area>" value in "Area"
    When Create: I click on "Category dropdown"
    And Create: I select "<category>" value in "Category"
    When Create: I click on "Item type dropdown"
    And Create: I select "<itemType>" value in "Item type"
    When Create: I click on "Flight phase dropdown"
    And Create: I select "<flightPhase>" value in "Flight phase"
    When Create: I click on "Process step dropdown"
    And Create: I select "<processStep>" value in "Process step"
    And Create: I fill in "<headline>" in ckeditor "Headline"
    When Create: I wait for "1" seconds
    When Create: I click on "Create button"
    When Create: I wait for "1" seconds
    Then Create: I am on the "Search" page

    Examples:
      | departureStation | arrivalStation | flightNumber | aircraftType | area   | category  | itemType | flightPhase | processStep       | headline        | detail          |
      | AMS              | MAA            | KL9999       | A333         | EUROPE | OM part A | standard | Alert       | Flight Monitoring | E2E test header | E2E test detail |

  @SearchScenario
  Scenario Outline: I am on CMS application and I want to search my checklist
    Given Create: I am on the "Search" page
    And Create: I fill "<departureStation>" in "Departure station"
    And Create: I fill "<arrivalStation>" in "Arrival station"
    And Create: I fill "<flightNumber>" in "Flight number"
    And Create: I click on "Aircraft type dropdown"
    And Create: I select "<aircraftType>" value in "Aircraft type"
    Then Create: I click on "Search button"
    Then Create: I wait for "1" seconds
    Then Create: I search "My checklist item" have "<headline>"

    Examples:
      | departureStation | arrivalStation | flightNumber | aircraftType | headline        |
      | AMS              | MAA            | KL9999       | A333         | E2E test header |
