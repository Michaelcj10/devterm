describe("Regex Tester", () => {
  beforeEach(() => cy.goTool("regex"));

  it("runs a regex and shows match count", () => {
    cy.clickBtn("test");
    cy.contains("match").should("be.visible");
  });

  it("highlights matches in test string", () => {
    cy.clickBtn("test");
    cy.contains("hello@example.com").should("be.visible");
  });

  it("shows error for invalid pattern", () => {
    cy.get("input").first().clear().type("[invalid(");
    cy.clickBtn("test");
    cy.get(".text-red-400, [class*=red]").should("be.visible");
  });
});

describe("Timestamp Tool", () => {
  beforeEach(() => cy.goTool("timestamp"));

  it("now() button fills unix timestamp", () => {
    cy.clickBtn("now");
    cy.get("input")
      .first()
      .invoke("val")
      .should("match", /^\d{10}$/);
  });

  it("converts unix timestamp to human date", () => {
    cy.get("input").first().clear().type("0");
    cy.clickBtn("→ human");
    cy.get("input").last().invoke("val").should("include", "1970");
  });

  it("converts ISO date back to unix", () => {
    cy.get("input").last().clear().type("1970-01-01T00:00:00.000Z");
    cy.clickBtn("→ unix");
    cy.get("input").first().should("have.value", "0");
  });
});

describe("Number Base Converter", () => {
  beforeEach(() => cy.goTool("number-base"));

  it("converts 255 decimal to hex FF", () => {
    cy.contains("hex (16)").parent().contains("FF");
  });

  it("converts 255 decimal to binary", () => {
    cy.contains("binary (2)").parent().contains("11111111");
  });

  it("converts 255 decimal to octal", () => {
    cy.contains("octal (8)").parent().contains("377");
  });

  it("shows error for invalid value", () => {
    cy.get("input").first().clear().type("ZZZ");
    cy.contains("invalid value").should("be.visible");
  });
});

describe("Color Converter", () => {
  beforeEach(() => cy.goTool("color"));

  it("renders colour preview swatch", () => {
    cy.get(".w-24.h-24").should("exist");
  });

  it("shows RGB, HSL, HEX output fields", () => {
    cy.contains("hex").should("be.visible");
    cy.contains("rgb").should("be.visible");
    cy.contains("hsl").should("be.visible");
  });

  it("updates output when hex value changes", () => {
    cy.get("input").first().clear().type("ff0000");
    cy.contains("255").should("be.visible");
  });
});

describe("Cron Builder", () => {
  beforeEach(() => cy.goTool("cron"));

  it("renders the cron expression input", () => {
    cy.get("input").should("exist");
  });

  it("renders 5 field breakdown boxes", () => {
    cy.get(".grid-cols-5 > div").should("have.length", 5);
  });

  it("clicking a preset fills the expression", () => {
    cy.contains("Every minute").click();
    cy.get("input").first().should("have.value", "* * * * *");
  });
});

describe("CSV Viewer", () => {
  beforeEach(() => cy.goTool("csv"));

  it("renders textarea for CSV input", () => {
    cy.get("textarea").should("exist");
  });

  it("parses and displays CSV as table", () => {
    cy.typeInTool("name,age\nAlice,30\nBob,25");
    cy.clickBtn("parse");
    cy.contains("Alice").should("be.visible");
    cy.contains("Bob").should("be.visible");
  });

  it("shows row and column count", () => {
    cy.typeInTool("name,age\nAlice,30\nBob,25");
    cy.clickBtn("parse");
    cy.contains("2 rows").should("be.visible");
  });
});

describe("Byte Converter", () => {
  beforeEach(() => cy.goTool("byte-converter"));

  it("renders value input and unit select", () => {
    cy.get("input").should("exist");
    cy.get("select").should("exist");
  });

  it("converts 1 GB to correct bytes", () => {
    cy.contains("B").parent().contains("1,000,000,000");
  });

  it("converts 1 GiB correctly", () => {
    cy.get("select").select("GiB");
    cy.contains("GiB").parent().contains("1");
    cy.get("input").first().clear().type("1");
    cy.contains("1,073,741,824").should("be.visible");
  });
});

describe("Chmod Calculator", () => {
  beforeEach(() => cy.goTool("chmod"));

  it("renders the permission grid", () => {
    cy.contains("user (owner)").should("be.visible");
    cy.contains("group").should("be.visible");
    cy.contains("other").should("be.visible");
  });

  it("shows 777 when all checkboxes checked", () => {
    cy.get('input[type="checkbox"]').check({ multiple: true });
    cy.contains("777").should("be.visible");
  });

  it("shows octal and symbolic outputs", () => {
    cy.contains("octal").should("be.visible");
    cy.contains("symbolic").should("be.visible");
  });
});

describe("CIDR Calculator", () => {
  beforeEach(() => cy.goTool("cidr"));

  it("calculates /24 network details", () => {
    cy.clickBtn("calculate");
    cy.contains("192.168.1.0").should("be.visible");
    cy.contains("192.168.1.255").should("be.visible");
  });

  it("shows host count for /24", () => {
    cy.clickBtn("calculate");
    cy.contains("254").should("be.visible");
  });

  it("shows error for invalid CIDR", () => {
    cy.get("input").clear().type("not-a-cidr");
    cy.clickBtn("calculate");
    cy.get(".text-red-400, [class*=red]").should("be.visible");
  });
});

describe("HTTP Status Codes", () => {
  beforeEach(() => cy.goTool("http-status"));

  it("renders a list of status codes", () => {
    cy.contains("200").should("be.visible");
    cy.contains("404").should("be.visible");
    cy.contains("500").should("be.visible");
  });

  it("clicking a code shows its description", () => {
    cy.contains("button", "200").click();
    cy.contains("OK").should("be.visible");
  });

  it("filter by category shows only 4xx codes", () => {
    cy.contains("4xx").click();
    cy.contains("200").should("not.exist");
    cy.contains("404").should("be.visible");
  });
});

describe("MIME Type Lookup", () => {
  beforeEach(() => cy.goTool("mime"));

  it("renders search input", () => {
    cy.get("input").should("exist");
  });

  it("looks up .json MIME type", () => {
    cy.get("input").type("json");
    cy.contains("application/json").should("be.visible");
  });

  it("shows extension column in results", () => {
    cy.get("input").type("png");
    cy.contains(".png").should("be.visible");
  });
});

describe("ASCII Table", () => {
  beforeEach(() => cy.goTool("ascii"));

  it("renders character grid", () => {
    cy.get(".grid button").should("have.length.at.least", 90);
  });

  it("filter input narrows results", () => {
    cy.get("input").type("A");
    cy.get(".grid button").should("have.length.lessThan", 20);
  });
});

describe("QR Code Generator", () => {
  beforeEach(() => cy.goTool("qr-code"));

  it("renders text area and generate button", () => {
    cy.get("textarea").should("exist");
    cy.contains("generate").should("be.visible");
  });

  it("shows QR image after generate", () => {
    cy.clickBtn("generate");
    cy.get("img[alt='QR code']", { timeout: 8000 }).should("be.visible");
  });
});
