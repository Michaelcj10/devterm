describe("Base64 Tool", () => {
  beforeEach(() => cy.goTool("base64"));

  it("encodes text to base64", () => {
    cy.typeInTool("hello world");
    cy.clickBtn("encode");
    cy.get("textarea").last().should("have.value", "aGVsbG8gd29ybGQ=");
  });

  it("decodes base64 to text", () => {
    cy.typeInTool("aGVsbG8gd29ybGQ=");
    cy.clickBtn("decode");
    cy.get("textarea").last().should("have.value", "hello world");
  });

  it("shows error for invalid base64", () => {
    cy.typeInTool("not!!valid$$base64");
    cy.clickBtn("decode");
    cy.contains("not valid base64").should("be.visible");
  });

  it("copy button appears after encode", () => {
    cy.typeInTool("test");
    cy.clickBtn("encode");
    cy.contains("[ copy ]").should("be.visible");
  });
});

describe("URL Encode Tool", () => {
  beforeEach(() => cy.goTool("url"));

  it("encodes a URL with spaces", () => {
    cy.typeInTool("hello world");
    cy.clickBtn("encode");
    cy.get("textarea").last().should("have.value", "hello%20world");
  });

  it("decodes %20 back to space", () => {
    cy.typeInTool("hello%20world");
    cy.clickBtn("decode");
    cy.get("textarea").last().should("have.value", "hello world");
  });
});

describe("HTML Entity Tool", () => {
  beforeEach(() => cy.goTool("html-entity"));

  it("encodes HTML special chars", () => {
    cy.typeInTool("<div>");
    cy.clickBtn("encode");
    cy.get("textarea").last().should("have.value", "&lt;div&gt;");
  });

  it("decodes HTML entities", () => {
    cy.typeInTool("&lt;div&gt;");
    cy.clickBtn("decode");
    cy.get("textarea").last().should("have.value", "<div>");
  });
});

describe("String Escape Tool", () => {
  beforeEach(() => cy.goTool("string-escape"));

  it("renders input textarea", () => {
    cy.get("textarea").should("exist");
  });

  it("escapes a string with newlines", () => {
    cy.typeInTool("line1\nline2");
    cy.clickBtn("escape");
    cy.get("textarea").last().invoke("val").should("include", "\\n");
  });
});
