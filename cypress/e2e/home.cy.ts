import { Then, When } from "@badeball/cypress-cucumber-preprocessor";

const inputType: { [key: string]: string } = {
  name: "name",
  email: "email",
  "confirmation email": "confirm",
};

When("user clicks the button on home page", () => {
  cy.get("[data-testid=default-button]").click();
});

Then("form dialog is displayed", () => {
  cy.get("[data-testid=invite-form]").should("exist");
});

When("reset form inputs", () => {
  cy.get("[data-testid=input-name]").clear();
  cy.get("[data-testid=input-email]").clear();
  cy.get("[data-testid=input-confirm]").clear();
});

When(
  "user type {string} on {string} textbox",
  (value: string, elementName: string) => {
    cy.get(`[data-testid=input-${inputType[elementName]}]`).type(value);
  }
);

When("user clicks the submit button", () => {
  cy.get("[data-testid=submit-button]").click();
});

Then("error for {string} input is displayed", (elementName: string) => {
  cy.get(`[data-testid=error-${inputType[elementName]}]`).should("exist");
});

Then("the submit button indicates that form is being sent", () => {
  cy.get("[data-testid=submit-button]").should(
    "have.text",
    "Sending, please wait..."
  );
});

Then("error for used email is displayed", () => {
  cy.get("[data-testid=error-send]").should("exist");
});

Then("dialog indicates that request has been successful", () => {
  cy.get("[data-testid=success-message]").should("exist");
});

When("the OK button is clicked", () => {
  cy.get("[data-testid=close-dialog]").click();
});

Then("form dialog is closed", () => {
  cy.get("[data-testid=invite-form]").should("not.exist");
});
