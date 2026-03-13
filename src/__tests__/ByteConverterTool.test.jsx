import { render, screen } from "@testing-library/react";
import ByteConverterTool from "../tools/ByteConverterTool";

describe("ByteConverterTool", () => {
  test("renders value input and unit select", () => {
    render(<ByteConverterTool />);
    expect(document.querySelector("input")).toBeInTheDocument();
    expect(document.querySelector("select")).toBeInTheDocument();
  });

  test("shows all unit labels", () => {
    render(<ByteConverterTool />);
    expect(screen.getAllByText(/\bB\b/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/\bKB\b/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/\bGB\b/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/\bTB\b/).length).toBeGreaterThan(0);
  });

  test("1 GB shows 1 GB in the GB row", () => {
    render(<ByteConverterTool />);
    // The GB result row value is "1 GB" (1e9 / 1e9 = 1)
    expect(screen.getAllByText(/\b1 GB\b/).length).toBeGreaterThan(0);
  });

  test("1 GB row shows 0.001 TB", () => {
    render(<ByteConverterTool />);
    // 1e9 / 1e12 = 0.001
    expect(screen.getByText(/0\.001 TB/)).toBeInTheDocument();
  });

  test("1 GB renders 9 unit conversion rows", () => {
    render(<ByteConverterTool />);
    // B, KB, KiB, MB, MiB, GB, GiB, TB, TiB = 9 rows
    const rows = document.querySelectorAll(".space-y-1\\.5 > div");
    expect(rows.length).toBe(9);
  });
});
