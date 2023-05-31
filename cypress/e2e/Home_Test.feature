Feature: Home Content

  Scenario: Closing dialog
    Given user is on website
    When user clicks the button on home page
    Then form dialog is displayed
    When user type "a" on "name" textbox
    Then "name" input should be "a"
    When user type "a@a." on "email" textbox
    Then "email" input should be "a@a."
    When user clicks on close button
    Then form dialog is closed
    When user clicks the button on home page
    Then "name" input should be "a"
    Then "email" input should be "a@a."

  Scenario: Filling in invitation form
    Given user is on website
    When user clicks the button on home page
    Then form dialog is displayed
    When user type "a" on "name" textbox
    When user type "a@a." on "email" textbox
    When user clicks the submit button
    Then error for "name" input is displayed
    Then error for "email" input is displayed
    Then the submit button is disabled
    When reset form inputs
    When user type "aaa" on "name" textbox
    Then error for "name" input is not displayed
    When user type "usedemail@airwallex.com" on "email" textbox
    Then error for "email" input is not displayed
    Then error for "confirmation email" input is displayed
    When user type "usedemail@airwallex.com" on "confirmation email" textbox
    Then the submit button is enabled
    When user clicks the submit button
    Then the submit button indicates that form is being sent
    Then error for used email is displayed
    When reset form inputs
    When user type "aaa" on "name" textbox
    When user type "a@airwallex.com" on "email" textbox
    When user type "a@airwallex.com" on "confirmation email" textbox
    When user clicks the submit button
    Then the submit button indicates that form is being sent
    Then dialog indicates that request has been successful
    When the OK button is clicked
    Then form dialog is closed
