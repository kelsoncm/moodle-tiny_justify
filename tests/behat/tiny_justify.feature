@editor @editor_tiny @tiny_justify @javascript
Feature: Use the TinyMCE editor justify button
  In order to format text as justified
  As a teacher
  I need to be able to apply justify alignment using the TinyMCE editor

  Background:
    Given the following "users" exist:
      | username | firstname | lastname | email                 |
      | teacher1 | Teacher   | 1        | teacher1@example.com  |
    And the following "courses" exist:
      | fullname | shortname |
      | Course 1 | C1        |
    And the following "course enrolments" exist:
      | user     | course | role           |
      | teacher1 | C1     | editingteacher |

  Scenario: The justify button appears in the TinyMCE toolbar
    Given I log in as "admin"
    And I open my profile in edit mode
    Then I should see the "alignjustify" button in the editor toolbar

  Scenario: Applying justify alignment to selected text
    Given I log in as "admin"
    And I open my profile in edit mode
    And I set the field "Description" to "Hello world"
    And I select the text "Hello world" in the "Description" TinyMCE editor
    When I click on the "alignjustify" button in the editor toolbar
    Then the content of the TinyMCE editor matches "text-align: justify"
