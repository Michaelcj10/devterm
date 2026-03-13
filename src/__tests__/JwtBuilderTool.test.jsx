import { render, screen, fireEvent, act } from "@testing-library/react";
import JwtBuilderTool from "../tools/JwtBuilderTool";

describe("JwtBuilderTool", () => {
  test("renders header textarea with default HS256 header", () => {
    render(<JwtBuilderTool />);
    expect(screen.getByDisplayValue(/HS256/)).toBeInTheDocument();
  });

  test("renders payload textarea with default sub field", () => {
    render(<JwtBuilderTool />);
    expect(screen.getByDisplayValue(/1234567890/)).toBeInTheDocument();
  });

  test("renders secret input with default value", () => {
    render(<JwtBuilderTool />);
    expect(
      screen.getByDisplayValue("your-256-bit-secret")
    ).toBeInTheDocument();
  });

  test("renders sign HS256 button", () => {
    render(<JwtBuilderTool />);
    expect(screen.getByText("[ sign HS256 ]")).toBeInTheDocument();
  });

  test("shows error and no token when header JSON is invalid", async () => {
    render(<JwtBuilderTool />);
    const textareas = screen.getAllByRole("textbox");
    fireEvent.change(textareas[0], { target: { value: "not-valid-json" } });
    await act(async () => {
      fireEvent.click(screen.getByText("[ sign HS256 ]"));
    });
    expect(document.querySelector(".text-red-400")).toBeInTheDocument();
    expect(screen.queryByText("[ copy ]")).not.toBeInTheDocument();
  });
});
