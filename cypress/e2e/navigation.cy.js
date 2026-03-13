describe("App shell & navigation", () => {
  beforeEach(() => cy.goTool("json"));

  it("renders sidebar with DEVTERM logo", () => {
    cy.contains("> DEVTERM_").should("be.visible");
  });

  it("logo in sidebar navigates to landing", () => {
    cy.contains("> DEVTERM_").click();
    cy.url().should("match", /#\/?$/);
  });

  it("sidebar shows category headers", () => {
    cy.contains("ENCODING & ESCAPING").should("be.visible");
    cy.contains("CRYPTO & SECURITY").should("be.visible");
  });

  it("clicking a sidebar tool navigates to it", () => {
    cy.contains("a, button", "Base64").first().click();
    cy.url().should("include", "#/base64");
  });

  it("sidebar search filters tools", () => {
    cy.get('input[placeholder*="grep"]').type("json");
    cy.contains("JSON Formatter").should("be.visible");
    cy.contains("Chmod").should("not.exist");
  });

  it("sidebar search cleared by Escape", () => {
    cy.get('input[placeholder*="grep"]').type("json");
    cy.get("body").type("{esc}");
    cy.get('input[placeholder*="grep"]').should("have.value", "");
  });

  it("sidebar search shows no-results message", () => {
    cy.get('input[placeholder*="grep"]').type("xyznotreal");
    cy.contains("no results").should("be.visible");
  });

  it("sidebar collapses and expands", () => {
    cy.contains("button", "‹").click();
    cy.contains("ENCODING & ESCAPING").should("not.exist");
    cy.contains("button", "›").click();
    cy.contains("ENCODING & ESCAPING").should("be.visible");
  });

  it("pin button appears on hover and toggles pin", () => {
    cy.contains("button", "Base64").closest(".relative")
      .trigger("mouseover", { bubbles: true });
    cy.contains("button", "☆").click();
    cy.contains("★ PINNED").should("exist");
    // Unpin
    cy.contains("button", "★").first().click();
  });

  it("⌘K opens command palette", () => {
    cy.get("body").trigger("keydown", { key: "k", ctrlKey: true, bubbles: true });
    cy.get('.fixed input[placeholder*="search"]').should("be.visible");
  });

  it("command palette search returns results", () => {
    cy.get("body").type("{ctrl+k}");
    cy.get(".fixed input").type("base");
    cy.contains("Base64").should("be.visible");
  });

  it("command palette closes on Escape", () => {
    cy.get("body").trigger("keydown", { key: "k", ctrlKey: true, bubbles: true });
    cy.get('.fixed input[placeholder*="search"]').should("be.visible");
    cy.get("body").trigger("keydown", { key: "Escape", bubbles: true });
    cy.get('.fixed input[placeholder*="search"]').should("not.exist");
  });

  it("share button copies link", () => {
    cy.window().then((win) => {
      cy.stub(win.navigator.clipboard, "writeText").resolves();
    });
    cy.contains("[ share ]").click();
    cy.contains("✓ link copied").should("be.visible");
  });

  it("shows 404 for unknown tool", () => {
    cy.visit("/#/not-a-real-tool");
    cy.contains("404").should("be.visible");
    cy.contains("tool not found").should("be.visible");
    cy.contains("cd ..").click();
    cy.url().should("match", /#\/?$/);
  });

  it("tool breadcrumb shows category", () => {
    cy.goTool("base64");
    cy.contains("ENCODING & ESCAPING").should("be.visible");
  });
});
