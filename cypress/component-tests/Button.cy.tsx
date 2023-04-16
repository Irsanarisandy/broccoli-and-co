import { Button } from ".components/Button";

describe("Button component", () => {
  it("should render correctly", () => {
    cy.mount(<Button label="button" />);
    cy.get("[data-testid=default-button]").should("have.text", "button");

    cy.mount(<Button label="submit" type="submit" />);
    cy.get("[data-testid=submit-button]").should("have.text", "submit");

    cy.mount(<Button label="reset" type="reset" />);
    cy.get("[data-testid=reset-button]").should("have.text", "reset");
  });

  it("should fire event when button is clicked", () => {
    const onClickSpy = cy.spy().as("onClickSpy");
    cy.mount(<Button label="test" onClick={onClickSpy} />);
    cy.get("[data-testid=default-button]").click();
    cy.get("@onClickSpy").should("have.been.calledOnce");
  });
});
