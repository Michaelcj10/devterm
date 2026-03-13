// Custom commands for devterm tests

// Navigate to a tool by its route ID
Cypress.Commands.add("goTool", (id) => {
  cy.visit(`/#/${id}`);
  // Wait for lazy-loaded tool to render
  cy.get(".space-y-3, .space-y-4", { timeout: 8000 }).should("exist");
});

// Get the first textarea in a tool
Cypress.Commands.add("toolTextarea", () => cy.get("textarea").first());

// Clear and type into the first textarea
Cypress.Commands.add("typeInTool", (text) => {
  cy.get("textarea").first().clear().type(text, { delay: 0 });
});

// Click a button by its visible text (partial match)
Cypress.Commands.add("clickBtn", (label) => {
  cy.contains("button", label).click();
});
