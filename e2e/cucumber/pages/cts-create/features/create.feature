@Create
Feature: Create - I want to create a new employee in CafeTownSend application

  @CreateScenario
  Scenario Outline: I am on CafeTownSend application and I can create a new employee
    Given Create: I am on the "MainViewEmployee" page
    When Create: I wait for "2" seconds
    And Create: I click on "Create button"
    When Create: I wait for "2" seconds
    And Create: I am on the "Create" page
    And Create: I fill "<firstName>" in "Firstname"
    And Create: I fill "<lastName>" in "Lastname"
    And Create: I fill "<startDate>" in "Startdate"
    And Create: I fill "<email>" in "Email"
    When Create: I wait for "2" seconds
    And Create: I click on "Add button"

    Examples:
      | firstName | lastName | startDate     | email          |
      | Sumana    | Bala     | 2019-04-08    | sb@gmail.com |

