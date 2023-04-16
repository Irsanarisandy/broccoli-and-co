import { Dialog } from ".components/Dialog";

describe("Dialog component", () => {
  it("should render correctly", () => {
    cy.mount(<Dialog closeDisplay={() => {}}>Test</Dialog>);
    cy.get("[data-testid=dialog-overlay]").should("exist");
    cy.get("[data-testid=dialog-container]").should("include.text", "Test");
  });

  it("should fire event when overlay is clicked", () => {
    const onClickSpy = cy.spy().as("onClickSpy");
    cy.mount(<Dialog closeDisplay={onClickSpy}>Test</Dialog>);
    cy.get("[data-testid=dialog-overlay]").click({ force: true });
    cy.get("@onClickSpy").should("have.been.calledOnce");
  });
});
