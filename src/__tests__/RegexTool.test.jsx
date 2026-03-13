import { render, screen, fireEvent } from "@testing-library/react";
import RegexTool from "../tools/RegexTool";

describe("RegexTool", () => {
  test("renders with default pattern", () => {
    render(<RegexTool />);
    expect(screen.getByDisplayValue("(\\w+)@([\\w.]+)")).toBeInTheDocument();
  });

  test("renders flags input with default 'gi'", () => {
    render(<RegexTool />);
    expect(screen.getByDisplayValue("gi")).toBeInTheDocument();
  });

  test("init prop pre-fills pattern", () => {
    render(<RegexTool init="hello" />);
    expect(screen.getByDisplayValue("hello")).toBeInTheDocument();
  });

  test("calls onInput when pattern changes", () => {
    const onInput = jest.fn();
    render(<RegexTool onInput={onInput} />);
    const patternInput = screen.getByDisplayValue("(\\w+)@([\\w.]+)");
    fireEvent.change(patternInput, { target: { value: "\\d+" } });
    expect(onInput).toHaveBeenCalled();
  });

  test("shows 2 matches for default pattern and text", () => {
    render(<RegexTool />);
    fireEvent.click(screen.getByText("[ test ]"));
    expect(screen.getByText(/matches \(2\)/)).toBeInTheDocument();
  });

  test("renders match entry with #1 label", () => {
    render(<RegexTool />);
    fireEvent.click(screen.getByText("[ test ]"));
    expect(screen.getByText("#1")).toBeInTheDocument();
  });

  test("shows 'no matches' span when pattern has no matches", () => {
    render(<RegexTool init="ZZZZZNOTMATCH" />);
    fireEvent.click(screen.getByText("[ test ]"));
    expect(screen.getByText("no matches")).toBeInTheDocument();
  });

  test("shows error for invalid regex pattern", () => {
    render(<RegexTool init="[" />);
    fireEvent.click(screen.getByText("[ test ]"));
    expect(document.querySelector(".text-red-400")).toBeInTheDocument();
  });
});
