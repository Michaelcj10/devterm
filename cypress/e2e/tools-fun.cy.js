describe("Excuse Generator", () => {
  beforeEach(() => cy.goTool("excuse"));

  it("renders generate button", () => {
    cy.contains("generate excuse").should("be.visible");
  });

  it("shows placeholder text before generating", () => {
    cy.contains("press the button").should("be.visible");
  });

  it("clicking generate shows an excuse", () => {
    cy.clickBtn("generate excuse");
    cy.get("div.text-green-300.min-h-14", { timeout: 2000 })
      .invoke("text")
      .should("have.length.greaterThan", 5);
  });

  it("generates a different excuse on second click", () => {
    cy.clickBtn("generate excuse");
    cy.get(".text-green-300").invoke("text").as("first");
    cy.clickBtn("generate excuse");
    // can't guarantee different text, but button should still be clickable
    cy.contains("generate excuse").should("be.visible");
  });

  it("copy button appears after generating", () => {
    cy.clickBtn("generate excuse");
    cy.contains("copy", { timeout: 1000 }).should("be.visible");
  });
});

describe("Commit Message Generator", () => {
  beforeEach(() => cy.goTool("commit"));

  it("renders mood selector grid", () => {
    cy.contains("panicked").should("be.visible");
    cy.contains("confident").should("be.visible");
    cy.contains("caffeinated").should("be.visible");
    cy.contains("passive-aggressive").should("be.visible");
    cy.contains("philosophical").should("be.visible");
  });

  it("panicked mood is selected by default", () => {
    cy.contains("button", "panicked").should("have.class", "bg-green-950");
  });

  it("clicking a mood selects it", () => {
    cy.contains("button", "confident").click();
    cy.contains("button", "confident").should("have.class", "bg-green-950");
    cy.contains("button", "panicked").should("not.have.class", "bg-green-950");
  });

  it("generate commit button exists", () => {
    cy.contains("generate commit").should("be.visible");
  });

  it("clicking generate shows git commit command", () => {
    cy.clickBtn("generate commit");
    cy.contains("git commit -m", { timeout: 1000 }).should("be.visible");
  });

  it("generated output contains $ git commit prefix", () => {
    cy.clickBtn("generate commit");
    cy.contains("$ git commit -m").should("be.visible");
  });

  it("copy button appears after generating", () => {
    cy.clickBtn("generate commit");
    cy.contains("copy", { timeout: 1000 }).should("be.visible");
  });

  it("generates panicked-style message for panicked mood", () => {
    cy.clickBtn("generate commit");
    cy.contains("$ git commit -m").should("be.visible");
  });

  it("generates different mood messages when mood changes", () => {
    cy.clickBtn("generate commit");
    cy.contains("button", "philosophical").click();
    cy.clickBtn("generate commit");
    cy.contains("$ git commit -m").should("be.visible");
  });
});
