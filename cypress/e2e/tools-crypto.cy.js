describe("SHA Hash Tool", () => {
  beforeEach(() => cy.goTool("hash"));

  it("renders input and generate button", () => {
    cy.get("textarea").should("exist");
    cy.contains("generate hashes").should("be.visible");
  });

  it("generate button disabled when input is empty", () => {
    cy.get("textarea").first().clear();
    cy.contains("button", "generate hashes").should("be.disabled");
  });

  it("generates all four hash algorithms", () => {
    cy.typeInTool("hello");
    cy.clickBtn("generate hashes");
    cy.contains("SHA-1").should("be.visible");
    cy.contains("SHA-256").should("be.visible");
    cy.contains("SHA-384").should("be.visible");
    cy.contains("SHA-512").should("be.visible");
  });

  it("SHA-256 of 'hello' is correct", () => {
    cy.typeInTool("hello");
    cy.clickBtn("generate hashes");
    // Known SHA-256 of "hello"
    cy.contains(
      "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
    ).should("be.visible");
  });
});

describe("UUID Tool", () => {
  beforeEach(() => cy.goTool("uuid"));

  it("generates UUIDs on load", () => {
    cy.get(".font-mono").contains(
      /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i,
    );
  });

  it("regenerates UUIDs on button click", () => {
    cy.get(".font-mono")
      .first()
      .invoke("text")
      .then((first) => {
        cy.clickBtn("generate");
        cy.get(".font-mono").first().invoke("text").should("not.eq", first);
      });
  });

  it("changes count via select", () => {
    cy.get("select").select("1");
    cy.clickBtn("generate");
    cy.get(".space-y-1 > div").should("have.length", 1);
  });
});

describe("GUID Tool", () => {
  beforeEach(() => cy.goTool("guid"));

  it("generates GUIDs with braces by default", () => {
    cy.contains(/^\{[0-9a-f-]+\}$/i).should("exist");
  });

  it("uppercase checkbox transforms output", () => {
    cy.contains("label", "UPPER").find("input[type=checkbox]").check();
    cy.clickBtn("generate");
    cy.get(".space-y-1 .font-mono")
      .first()
      .invoke("text")
      .should("match", /[A-F0-9-]/);
  });

  it("braces checkbox toggles wrapping", () => {
    cy.contains("label", "braces").find("input[type=checkbox]").uncheck();
    cy.clickBtn("generate");
    cy.get(".space-y-1 .font-mono")
      .first()
      .invoke("text")
      .should("not.include", "{");
  });
});

describe("Password Generator", () => {
  beforeEach(() => cy.goTool("password"));

  it("generates passwords on load", () => {
    cy.get(".space-y-1 .font-mono").should("have.length.at.least", 1);
  });

  it("generated password has correct length", () => {
    cy.get(".space-y-1 .font-mono")
      .first()
      .invoke("text")
      .then((pwd) => {
        expect(pwd.trim().length).to.equal(24);
      });
  });

  it("regenerates on button click", () => {
    cy.get(".space-y-1 .font-mono")
      .first()
      .invoke("text")
      .then((first) => {
        cy.clickBtn("generate");
        cy.get(".space-y-1 .font-mono")
          .first()
          .invoke("text")
          .should("not.eq", first);
      });
  });
});

describe("Random String Tool", () => {
  beforeEach(() => cy.goTool("random-string"));

  it("generates strings on load", () => {
    cy.get(".space-y-1 .font-mono, .space-y-1 div").should(
      "have.length.at.least",
      1,
    );
  });

  it("regenerates on button click", () => {
    cy.clickBtn("generate");
    cy.get(".font-mono").should("exist");
  });
});

describe("JWT Decoder", () => {
  beforeEach(() => cy.goTool("jwt"));

  it("auto-decodes the default token on load", () => {
    cy.contains("header").should("be.visible");
    cy.contains("payload").should("be.visible");
    cy.contains("signature").should("be.visible");
  });

  it("shows alg and typ in header", () => {
    cy.contains("HS256").should("be.visible");
    cy.contains("JWT").should("be.visible");
  });

  it("shows error for invalid token", () => {
    cy.typeInTool("notavalidtoken");
    cy.clickBtn("decode");
    cy.contains("invalid jwt format").should("be.visible");
  });
});

describe("JWT Builder", () => {
  beforeEach(() => cy.goTool("jwt-builder"));

  it("renders payload textarea and secret input", () => {
    cy.get("textarea").should("exist");
  });

  it("generates a token on build click", () => {
    cy.clickBtn("build");
    cy.contains(/^ey/).should("be.visible");
  });
});

describe("Password Hash (PBKDF2) Tool", () => {
  beforeEach(() => cy.goTool("password-hash"));

  it("renders password input", () => {
    cy.get('input[type="password"], input[placeholder*="password" i]').should(
      "exist",
    );
  });

  it("hashes a password and shows $pbkdf2 result", () => {
    cy.get("input").first().type("mysecret");
    cy.clickBtn("hash");
    cy.contains("$pbkdf2$", { timeout: 10000 }).should("be.visible");
  });
});

describe("PEM Cert Decoder", () => {
  beforeEach(() => cy.goTool("pem-decoder"));

  it("renders textarea for cert input", () => {
    cy.get("textarea").should("exist");
  });

  it("decodes the sample cert on button click", () => {
    cy.clickBtn("decode");
    cy.contains("subject", { timeout: 5000 }).should("be.visible");
  });
});
