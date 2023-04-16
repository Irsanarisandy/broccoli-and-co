Feature: Home Content

  Scenario: Filling in invitation form
    Given user is on website
    When user clicks the button on home page
    Then form dialog is displayed
    When user type "a" on "name" textbox
    When user type "a@a." on "email" textbox
    When user clicks the submit button
    Then error for "name" input is displayed
    Then error for "email" input is displayed
    When reset form inputs
    When user type "aaa" on "name" textbox
    When user type "usedemail@airwallex.com" on "email" textbox
    When user clicks the submit button
    Then error for "confirmation email" input is displayed
    When user type "usedemail@airwallex.com" on "confirmation email" textbox
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
