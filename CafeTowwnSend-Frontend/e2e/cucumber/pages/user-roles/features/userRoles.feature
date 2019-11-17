@RoleBased
Feature: Role based permission test

  Scenario Outline: I login into CMS application and check for create, view and edit permission for the user

    #  Login
    Given User Roles: I visit CMS application "/"
    When User Roles: I wait for "1" seconds
    Then User Roles: I fill "<userId>" in "New Username"
    And User Roles: I click on "Next"
    And User Roles: I wait for "1" seconds
    And User Roles: I fill "<password>" in "New Password"
    And User Roles: I click on "New login button"
    Then User Roles: I am on the "Search" page

    #  Create Permission test
    And User Roles: I see "Add Item" button and I have "<createPermission>" create permission

    #  View and Edit Permission test
    And User Roles: I wait for "1" seconds
    When User Roles: I click on "Moderator dropdown"
    And User Roles: I wait for "1" seconds
    And User Roles: I select "<moderator>" value in "Moderator"
    And User Roles: I wait for "1" seconds
    Then User Roles: I see "Search" button I have "<viewPermission>" view permission to click and check for "TACTICAL_CHECKLIST-MODERATOR"
    And User Roles: I wait for "2" seconds
    Then User Roles: I see "Edit" icon I have "<tacticalEdit>" edit permission to click and check for "TACTICAL_CHECKLIST-MODERATOR"
    And User Roles: I wait for "1" seconds
    When User Roles: I click on "Moderator dropdown"
    And User Roles: I wait for "1" seconds
    And User Roles: I select "<newModerator>" value in "Moderator"
    And User Roles: I wait for "1" seconds
    Then User Roles: I see "Search" button I have "<viewPermission>" view permission to click and check for "OPERATIONAL_CHECKLIST-MODERATOR"
    And User Roles: I wait for "2" seconds
    Then User Roles: I see "Edit" icon have "<operationalEdit>" edit permission and I check for "OPERATIONAL_CHECKLIST-MODERATOR"

    #  Logout
    And User Roles: I wait for "1" seconds
    Then User Roles: I click on "Logout"



    Examples:
      | userId  | password  | createPermission | tacticalEdit | operationalEdit | viewPermission | moderator                        | newModerator                     |
      | k900374 | pswpsw123 | Yes              | Yes          | No              | Yes            | Tactical checklist moderator     | Operational checklist moderator  |
      | k900375 | pswpsw123 | No               | No           | No              | Yes             | Tactical checklist moderator     | Operational checklist moderator  |
      | k900376 | pswpsw123 | No               | No           | No              | Yes            | Tactical checklist moderator     | Operational checklist moderator  |
      | k900377 | pswpsw123 | No               | No           | No              | Yes            | Tactical checklist moderator     | Operational checklist moderator  |
      | k900379 | pswpsw123 | No               | No           | No              | Yes            | Tactical checklist moderator     | Operational checklist moderator  |

