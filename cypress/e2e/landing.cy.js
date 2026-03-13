describe("Landing page", () => {
  beforeEach(() => cy.visit("/"));

  it("renders animated DEVTERM logo", () => {
    // Logo types out — eventually shows the full text
    cy.contains("DEVTERM", { timeout: 5000 }).should("be.visible");
  });

  it("shows tagline with tool count", () => {
    cy.contains("no backend").should("be.visible");
    cy.contains("no tracking").should("be.visible");
  });

  it("renders boot log terminal block", () => {
    cy.contains("booting").should("be.visible");
    cy.contains("[  OK  ]").should("be.visible");
  });

  it("OPEN TOOLBOX button navigates to a tool", () => {
    cy.contains("OPEN TOOLBOX").click();
    cy.url().should("include", "#/");
  });

  it("renders all category headers", () => {
    cy.contains("ENCODING & ESCAPING").should("be.visible");
    cy.contains("CRYPTO & SECURITY").should("be.visible");
    cy.contains("TEXT & FORMATTING").should("be.visible");
    cy.contains("DEV UTILITIES").should("be.visible");
    cy.contains("ACTUALLY USELESS").should("be.visible");
  });

  it("renders tool cards with icons and descriptions", () => {
    cy.contains("Base64").should("be.visible");
    cy.contains("JSON Formatter").should("be.visible");
  });

  it("clicking a tool card navigates to it", () => {
    cy.contains("Base64").click();
    cy.url().should("include", "#/base64");
  });

  it("opens settings modal", () => {
    cy.contains("[ settings ]").click();
    cy.contains("keyboard shortcuts").should("be.visible");
    cy.contains("saved data").should("be.visible");
  });

  it("closes settings modal on backdrop click", () => {
    cy.contains("[ settings ]").click();
    cy.contains("keyboard shortcuts").should("be.visible");
    cy.get("body").click(10, 10);
    cy.contains("keyboard shortcuts").should("not.exist");
  });

  it("header becomes visible on scroll", () => {
    cy.scrollTo(0, 300);
    cy.get("header").should("be.visible");
  });

  it("header logo click scrolls to top", () => {
    cy.scrollTo(0, 500);
    cy.get("header").contains("DEVTERM_").click();
    cy.window().its("scrollY").should("equal", 0);
  });
});
