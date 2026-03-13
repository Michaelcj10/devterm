import { render, screen } from "@testing-library/react";
import CaseTool from "../tools/CaseTool";

const DEFAULT = "the quick brown fox jumps over the lazy dog";

describe("CaseTool", () => {
  test("renders input textarea", () => {
    render(<CaseTool />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("default input is pre-filled", () => {
    render(<CaseTool />);
    expect(screen.getByRole("textbox")).toHaveValue(DEFAULT);
  });

  test("shows camelCase label", () => {
    render(<CaseTool />);
    expect(screen.getByText("camelCase")).toBeInTheDocument();
  });

  test("converts default input to camelCase", () => {
    render(<CaseTool />);
    expect(
      screen.getByText("theQuickBrownFoxJumpsOverTheLazyDog")
    ).toBeInTheDocument();
  });

  test("converts default input to PascalCase", () => {
    render(<CaseTool />);
    expect(
      screen.getByText("TheQuickBrownFoxJumpsOverTheLazyDog")
    ).toBeInTheDocument();
  });

  test("converts default input to snake_case", () => {
    render(<CaseTool />);
    expect(
      screen.getByText("the_quick_brown_fox_jumps_over_the_lazy_dog")
    ).toBeInTheDocument();
  });

  test("converts default input to SCREAMING_SNAKE", () => {
    render(<CaseTool />);
    expect(
      screen.getByText("THE_QUICK_BROWN_FOX_JUMPS_OVER_THE_LAZY_DOG")
    ).toBeInTheDocument();
  });

  test("converts default input to kebab-case", () => {
    render(<CaseTool />);
    expect(
      screen.getByText("the-quick-brown-fox-jumps-over-the-lazy-dog")
    ).toBeInTheDocument();
  });

  test("converts default input to UPPERCASE", () => {
    render(<CaseTool />);
    expect(
      screen.getByText("THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG")
    ).toBeInTheDocument();
  });

  test("init prop pre-fills the input", () => {
    render(<CaseTool init="hello world" />);
    expect(screen.getByRole("textbox")).toHaveValue("hello world");
    expect(screen.getByText("helloWorld")).toBeInTheDocument();
    expect(screen.getByText("HELLO_WORLD")).toBeInTheDocument();
  });
});
