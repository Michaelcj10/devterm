describe("Accessibility (WCAG 2.x)", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.injectAxe();
  });

  it("landing page passes WCAG 2.0 AA", () => {
    cy.checkA11y(null, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] },
    });
  });

  it("base64 tool passes WCAG 2.0 AA", () => {
    cy.visit("/#/base64");
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] },
    });
  });

  it("cidr calculator passes WCAG 2.0 AA", () => {
    cy.visit("/#/cidr");
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] },
    });
  });

  it("regex tester passes WCAG 2.0 AA", () => {
    cy.visit("/#/regex");
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] },
    });
  });
});
