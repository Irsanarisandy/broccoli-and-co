import { Given } from "@badeball/cypress-cucumber-preprocessor";

Given("user is on website", () => {
  cy.visit("http://localhost:3000/");
});
