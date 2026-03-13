import { render, screen, fireEvent, act } from "@testing-library/react";
import PemDecoderTool from "../tools/PemDecoderTool";

describe("PemDecoderTool", () => {
  test("renders with empty textarea on mount", () => {
    render(<PemDecoderTool />);
    expect(screen.getByRole("textbox")).toHaveValue("");
  });

  test("has load sample button", () => {
    render(<PemDecoderTool />);
    expect(screen.getByText("[ load sample ]")).toBeInTheDocument();
  });

  test("loads sample PEM into textarea on button click", () => {
    render(<PemDecoderTool />);
    fireEvent.click(screen.getByText("[ load sample ]"));
    expect(screen.getByRole("textbox").value).toContain("BEGIN CERTIFICATE");
  });

  test("calls onInput when textarea changes", () => {
    const onInput = jest.fn();
    render(<PemDecoderTool onInput={onInput} />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "some-pem-text" },
    });
    expect(onInput).toHaveBeenCalledWith("some-pem-text");
  });

  test("shows error for invalid PEM input", async () => {
    render(<PemDecoderTool />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "definitely-not-a-certificate" },
    });
    await act(async () => {
      fireEvent.click(screen.getByText("[ decode ]"));
    });
    expect(document.querySelector(".text-red-400")).toBeInTheDocument();
  });

  test("clicking decode with empty input shows error message", async () => {
    render(<PemDecoderTool />);
    await act(async () => {
      fireEvent.click(screen.getByText("[ decode ]"));
    });
    expect(document.querySelector(".text-red-400")).toBeInTheDocument();
  });
});
