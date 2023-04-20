import {
  RequestInviteForm,
  isConfirmationEmailValid,
  isEmailValid,
  isFullNameValid,
} from ".components/CustomForm";

describe("isFullNameValid function", () => {
  it("should be false when value is less than 3 characters", () => {
    const test = "a";
    expect(isFullNameValid(test)).to.eq(false);
  });

  it("should be true when value is 3 or more characters", () => {
    const test = "aaa";
    expect(isFullNameValid(test)).to.eq(true);
  });
});

describe("isEmailValid function", () => {
  it("should be false when value is an invalid email", () => {
    const test1 = "a";
    expect(isEmailValid(test1)).to.eq(false);
    const test2 = "a@a.";
    expect(isEmailValid(test2)).to.eq(false);
    const test3 = "a@a.co.";
    expect(isEmailValid(test3)).to.eq(false);
  });

  it("should be true when value is a valid email", () => {
    const test1 = "a@a.com";
    expect(isEmailValid(test1)).to.eq(true);
    const test2 = "a@a.com.au";
    expect(isEmailValid(test2)).to.eq(true);
  });
});

describe("isConfirmationEmailValid function", () => {
  it("should be false when value is not the same as email", () => {
    const email = "a@a.com";
    const test = "a";
    expect(isConfirmationEmailValid(email, test)).to.eq(false);
  });

  it("should be true when value is the same as email", () => {
    const email = "a@a.com";
    const test = "a@a.com";
    expect(isConfirmationEmailValid(email, test)).to.eq(true);
  });
});

describe("RequestInviteForm component", () => {
  it("should render correctly", () => {
    cy.mount(<RequestInviteForm onValidSubmit={() => {}} />);
    cy.get("[data-testid=input-name]").should("exist");
    cy.get("[data-testid=error-name]").should("not.exist");
    cy.get("[data-testid=input-email]").should("exist");
    cy.get("[data-testid=error-email]").should("not.exist");
    cy.get("[data-testid=input-confirm]").should("exist");
    cy.get("[data-testid=error-confirm]").should("not.exist");
    cy.get("[data-testid=submit-button]").should("exist");
    cy.get("[data-testid=error-send]").should("not.exist");
  });

  it("should display name and email errors when not entered any input", () => {
    cy.mount(<RequestInviteForm onValidSubmit={() => {}} />);
    cy.get("[data-testid=submit-button]").click();
    cy.get("[data-testid=error-name]").should("exist");
    cy.get("[data-testid=error-email]").should("exist");
    cy.get("[data-testid=error-confirm]").should("not.exist");
  });

  it("should display all form-related errors when name and email are invalid", () => {
    cy.mount(<RequestInviteForm onValidSubmit={() => {}} />);
    cy.get("[data-testid=input-name").type("a");
    cy.get("[data-testid=input-email").type("a@a.");
    cy.get("[data-testid=submit-button]").click();
    cy.get("[data-testid=error-name]").should("exist");
    cy.get("[data-testid=error-email]").should("exist");
    cy.get("[data-testid=error-confirm]").should("exist");
  });

  it("should display confirmation email error when value is empty", () => {
    cy.mount(<RequestInviteForm onValidSubmit={() => {}} />);
    cy.get("[data-testid=input-name").type("aaa");
    cy.get("[data-testid=input-email").type("a@a.com");
    cy.get("[data-testid=submit-button]").click();
    cy.get("[data-testid=error-name]").should("not.exist");
    cy.get("[data-testid=error-email]").should("not.exist");
    cy.get("[data-testid=error-confirm]").should("exist");
  });

  it("should display confirmation email error when value is not the same as email", () => {
    cy.mount(<RequestInviteForm onValidSubmit={() => {}} />);
    cy.get("[data-testid=input-name").type("aaa");
    cy.get("[data-testid=input-email").type("a@a.com");
    cy.get("[data-testid=input-confirm").type("a@a.co");
    cy.get("[data-testid=submit-button]").click();
    cy.get("[data-testid=error-name]").should("not.exist");
    cy.get("[data-testid=error-email]").should("not.exist");
    cy.get("[data-testid=error-confirm]").should("exist");
  });

  it("should not display any form-related errors when all inputs are valid", () => {
    cy.mount(<RequestInviteForm onValidSubmit={() => {}} />);
    cy.get("[data-testid=input-name").type("aaa");
    cy.get("[data-testid=input-email").type("a@a.com");
    cy.get("[data-testid=input-confirm").type("a@a.com");
    cy.get("[data-testid=submit-button]").click();
    cy.get("[data-testid=error-name]").should("not.exist");
    cy.get("[data-testid=error-email]").should("not.exist");
    cy.get("[data-testid=error-confirm]").should("not.exist");
  });
});
