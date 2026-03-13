import { render, screen } from "@testing-library/react";
import NumberBaseTool from "../tools/NumberBaseTool";

describe("NumberBaseTool", () => {
  test("renders value input", () => {
    render(<NumberBaseTool />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("shows all four base labels", () => {
    render(<NumberBaseTool />);
    expect(screen.getByText(/binary \(2\)/i)).toBeInTheDocument();
    expect(screen.getByText(/octal \(8\)/i)).toBeInTheDocument();
    expect(screen.getByText(/decimal \(10\)/i)).toBeInTheDocument();
    expect(screen.getByText(/hex \(16\)/i)).toBeInTheDocument();
  });

  test("converts 255 decimal to hex FF", () => {
    render(<NumberBaseTool />);
    expect(screen.getByText("FF")).toBeInTheDocument();
  });

  test("converts 255 decimal to binary 11111111", () => {
    render(<NumberBaseTool />);
    expect(screen.getByText("11111111")).toBeInTheDocument();
  });

  test("converts 255 decimal to octal 377", () => {
    render(<NumberBaseTool />);
    expect(screen.getByText("377")).toBeInTheDocument();
  });

  test("converts 255 decimal to decimal 255", () => {
    render(<NumberBaseTool />);
    expect(screen.getByText("255")).toBeInTheDocument();
  });

  test("shows invalid message for non-numeric input", () => {
    render(<NumberBaseTool init="ZZZ" />);
    expect(screen.getByText(/invalid value/i)).toBeInTheDocument();
  });

  test("init prop sets the initial value", () => {
    render(<NumberBaseTool init="10" />);
    expect(screen.getByText("A")).toBeInTheDocument(); // 10 in hex
    expect(screen.getByText("1010")).toBeInTheDocument(); // 10 in binary
  });
});
