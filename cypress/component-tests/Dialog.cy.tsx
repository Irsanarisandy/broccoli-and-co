import { Dialog } from ".components/Dialog";

describe("Dialog component", () => {
  it("should render correctly", () => {
    cy.mount(<Dialog>Test</Dialog>);
    cy.get("[data-testid=dialog-close]").should("exist");
    cy.get("[data-testid=dialog-container]").should("include.text", "Test");
  });

  it("should render correctly without close button", () => {
    cy.mount(<Dialog displayCloseBtn={false}>Test</Dialog>);
    cy.get("[data-testid=dialog-close]").should("not.exist");
    cy.get("[data-testid=dialog-container]").should("include.text", "Test");
  });

  it("should fire event when close button is clicked", () => {
    const onClickSpy = cy.spy().as("onClickSpy");
    cy.mount(<Dialog onBtnClick={onClickSpy}>Test</Dialog>);
    cy.get("[data-testid=dialog-close]").click({ force: true });
    cy.get("@onClickSpy").should("have.been.calledOnce");
  });
});
