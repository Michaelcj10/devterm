describe("JSON Formatter", () => {
  beforeEach(() => cy.goTool("json"));

  it("formats JSON", () => {
    cy.typeInTool('{"a":1,"b":2}');
    cy.clickBtn("format");
    cy.get("textarea").last().invoke("val").should("include", '"a": 1');
  });

  it("minifies JSON", () => {
    cy.typeInTool('{\n  "a": 1,\n  "b": 2\n}');
    cy.clickBtn("minify");
    cy.get("textarea").last().should("have.value", '{"a":1,"b":2}');
  });

  it("validates valid JSON with success message", () => {
    cy.typeInTool('{"valid":true}');
    cy.clickBtn("validate");
    cy.contains("✓ valid json").should("be.visible");
  });

  it("shows error for invalid JSON", () => {
    cy.typeInTool("{bad json}");
    cy.clickBtn("format");
    cy.get(".text-red-400, [class*=red]").should("be.visible");
  });
});

describe("JSON → TypeScript Tool", () => {
  beforeEach(() => cy.goTool("json-to-ts"));

  it("generates TypeScript interfaces", () => {
    cy.clickBtn("generate");
    cy.contains("interface").should("be.visible");
  });

  it("generates exportable interface by default", () => {
    cy.clickBtn("generate");
    cy.get("textarea")
      .last()
      .invoke("val")
      .should("include", "export interface");
  });

  it("shows error for invalid JSON", () => {
    cy.typeInTool("{bad json}");
    cy.clickBtn("generate");
    cy.get(".text-red-400, [class*=red]").should("be.visible");
  });
});

describe("Markdown Tool", () => {
  beforeEach(() => cy.goTool("markdown"));

  it("renders a preview pane", () => {
    cy.get("textarea").should("exist");
  });

  it("renders markdown headings in preview", () => {
    cy.typeInTool("# Hello World");
    cy.get("h1").contains("Hello World").should("be.visible");
  });
});

describe("Case Converter", () => {
  beforeEach(() => cy.goTool("case"));

  it("converts to camelCase", () => {
    cy.typeInTool("hello world");
    cy.contains("camelCase").parent().contains("helloWorld");
  });

  it("converts to SCREAMING_SNAKE_CASE", () => {
    cy.typeInTool("hello world");
    cy.contains("SCREAMING_SNAKE").parent().contains("HELLO_WORLD");
  });
});

describe("Text Diff Tool", () => {
  beforeEach(() => cy.goTool("diff"));

  it("renders two textareas", () => {
    cy.get("textarea").should("have.length", 2);
  });

  it("shows diff output after compare", () => {
    cy.clickBtn("compare");
    cy.contains("+").should("be.visible");
    cy.contains("-").should("be.visible");
  });

  it("same content shows no additions or removals", () => {
    cy.get("textarea").first().clear().type("same line");
    cy.get("textarea").last().clear().type("same line");
    cy.clickBtn("compare");
    cy.contains("+").should("not.exist");
    cy.contains("-").should("not.exist");
  });
});

describe("Lorem Ipsum Tool", () => {
  beforeEach(() => cy.goTool("lorem"));

  it("renders type and count selects", () => {
    cy.get("select").should("have.length.at.least", 2);
  });

  it("generates lorem text", () => {
    cy.clickBtn("generate");
    cy.get("textarea")
      .invoke("val")
      .should("match", /lorem|ipsum/i);
  });

  it("generates words when type is words", () => {
    cy.get("select").first().select("words");
    cy.clickBtn("generate");
    cy.get("textarea").invoke("val").should("not.include", "\n\n");
  });
});

describe("Log Remover Tool", () => {
  beforeEach(() => cy.goTool("log-remover"));

  it("strips console.log lines", () => {
    cy.clickBtn("strip");
    cy.get("textarea")
      .last()
      .invoke("val")
      .should("not.match", /console\./);
  });

  it("shows count of removed lines", () => {
    cy.clickBtn("strip");
    cy.contains("removed").should("be.visible");
  });

  it("preserves non-console lines", () => {
    cy.clickBtn("strip");
    cy.get("textarea")
      .last()
      .invoke("val")
      .should("include", "function fetchData");
  });
});
