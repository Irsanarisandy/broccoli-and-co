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
  cy.get("[data-testid=dialog-container]").should("have.attr", "open");
});

When("reset form inputs", () => {
  cy.get("[data-testid=input-name]").clear();
  cy.get("[data-testid=input-email]").clear();
  cy.get("[data-testid=input-confirm]").clear();
});

When("user clicks on close button", () => {
  cy.get("[data-testid=dialog-close]").click();
});

Then(
  "{string} input should be {string}",
  (elementName: string, value: string) => {
    cy.get(`[data-testid=input-${inputType[elementName]}]`).should(
      "have.value",
      value
    );
  }
);

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

Then("error for {string} input is not displayed", (elementName: string) => {
  cy.get(`[data-testid=error-${inputType[elementName]}]`).should("not.exist");
});

Then("the submit button is disabled", () => {
  cy.get("[data-testid=submit-button]").should("have.attr", "disabled");
});

Then("the submit button is enabled", () => {
  cy.get("[data-testid=submit-button]").should("not.have.attr", "disabled");
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
  cy.get("[data-testid=dialog-container]").should("not.have.attr", "open");
});
