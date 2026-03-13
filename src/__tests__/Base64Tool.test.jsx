import { render, screen, fireEvent } from "@testing-library/react";
import Base64Tool from "../tools/Base64Tool";

describe("Base64Tool", () => {
  test("renders encode and decode buttons", () => {
    render(<Base64Tool />);
    expect(screen.getByText(/encode/)).toBeInTheDocument();
    expect(screen.getByText(/decode/)).toBeInTheDocument();
  });

  test("renders input textarea", () => {
    render(<Base64Tool />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("encodes plain text to base64", () => {
    render(<Base64Tool />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "hello" },
    });
    fireEvent.click(screen.getByText(/encode/));
    const textareas = screen.getAllByRole("textbox");
    expect(textareas[1]).toHaveValue("aGVsbG8=");
  });

  test("decodes base64 back to plain text", () => {
    render(<Base64Tool />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "aGVsbG8=" },
    });
    fireEvent.click(screen.getByText(/decode/));
    const textareas = screen.getAllByRole("textbox");
    expect(textareas[1]).toHaveValue("hello");
  });

  test("shows error for invalid base64 input", () => {
    render(<Base64Tool />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "!!!not-base64!!!" },
    });
    fireEvent.click(screen.getByText(/decode/));
    expect(screen.getByText(/not valid base64/i)).toBeInTheDocument();
  });

  test("encodes unicode text correctly", () => {
    render(<Base64Tool />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "test" },
    });
    fireEvent.click(screen.getByText(/encode/));
    const textareas = screen.getAllByRole("textbox");
    expect(textareas[1].value).toBeTruthy();
    expect(textareas[1].value).toMatch(/^[A-Za-z0-9+/]+=*$/);
  });

  test("init prop pre-fills the input", () => {
    render(<Base64Tool init="prefilled" />);
    expect(screen.getByRole("textbox")).toHaveValue("prefilled");
  });
});
