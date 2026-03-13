import { render, screen, fireEvent } from "@testing-library/react";
import LogRemoverTool from "../tools/LogRemoverTool";

describe("LogRemoverTool", () => {
  test("renders strip button", () => {
    render(<LogRemoverTool />);
    expect(screen.getByText(/strip console/)).toBeInTheDocument();
  });

  test("renders input textarea with default code", () => {
    render(<LogRemoverTool />);
    const textarea = screen.getAllByRole("textbox")[0];
    expect(textarea.value).toContain("console.log");
  });

  test("strips console.log lines from default code", () => {
    render(<LogRemoverTool />);
    fireEvent.click(screen.getByText(/strip console/));
    const textareas = screen.getAllByRole("textbox");
    expect(textareas[1].value).not.toMatch(/console\.log/);
    expect(textareas[1].value).not.toMatch(/console\.error/);
    expect(textareas[1].value).not.toMatch(/console\.warn/);
  });

  test("preserves non-console lines", () => {
    render(<LogRemoverTool />);
    fireEvent.click(screen.getByText(/strip console/));
    const textareas = screen.getAllByRole("textbox");
    expect(textareas[1].value).toContain("function fetchData");
    expect(textareas[1].value).toContain("return result");
  });

  test("shows count of removed console calls", () => {
    render(<LogRemoverTool />);
    fireEvent.click(screen.getByText(/strip console/));
    expect(screen.getByText(/removed 4 console calls/i)).toBeInTheDocument();
  });

  test("strips custom input with one console.log", () => {
    render(<LogRemoverTool init={"const x = 1;\nconsole.log(x);\nconst y = 2;"} />);
    fireEvent.click(screen.getByText(/strip console/));
    const textareas = screen.getAllByRole("textbox");
    expect(textareas[1].value).toBe("const x = 1;\nconst y = 2;");
  });

  test("shows 'removed 1 console call' (singular) for one removal", () => {
    render(<LogRemoverTool init={"const x = 1;\nconsole.log(x);"} />);
    fireEvent.click(screen.getByText(/strip console/));
    expect(screen.getByText(/removed 1 console call\b(?!s)/i)).toBeInTheDocument();
  });

  test("does not show output section before stripping", () => {
    render(<LogRemoverTool />);
    // Only one textarea before clicking
    expect(screen.getAllByRole("textbox")).toHaveLength(1);
  });

  test("shows output section after stripping", () => {
    render(<LogRemoverTool />);
    fireEvent.click(screen.getByText(/strip console/));
    expect(screen.getAllByRole("textbox")).toHaveLength(2);
  });

  test("init prop sets the initial input", () => {
    render(<LogRemoverTool init="console.log('hi');" />);
    expect(screen.getAllByRole("textbox")[0].value).toBe("console.log('hi');");
  });
});
