import { Button } from ".components/Button";

describe("Button component", () => {
  it("should render correctly", () => {
    cy.mount(<Button>Button</Button>);
    cy.get("[data-testid=default-button]").should("have.text", "Button");

    cy.mount(<Button type="submit">Submit</Button>);
    cy.get("[data-testid=submit-button]").should("have.text", "Submit");

    cy.mount(<Button type="reset">Reset</Button>);
    cy.get("[data-testid=reset-button]").should("have.text", "Reset");
  });

  it("should fire event when button is clicked", () => {
    const onClickSpy = cy.spy().as("onClickSpy");
    cy.mount(<Button onClick={onClickSpy}>Test</Button>);
    cy.get("[data-testid=default-button]").click();
    cy.get("@onClickSpy").should("have.been.calledOnce");
  });
});
