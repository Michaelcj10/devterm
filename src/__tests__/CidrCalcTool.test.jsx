import { render, screen, fireEvent } from "@testing-library/react";
import CidrCalcTool from "../tools/CidrCalcTool";

describe("CidrCalcTool", () => {
  test("renders with default CIDR value", () => {
    render(<CidrCalcTool />);
    expect(screen.getByDisplayValue("192.168.1.0/24")).toBeInTheDocument();
  });

  test("init prop pre-fills the input", () => {
    render(<CidrCalcTool init="10.0.0.0/8" />);
    expect(screen.getByDisplayValue("10.0.0.0/8")).toBeInTheDocument();
  });

  test("calls onInput when CIDR changes", () => {
    const onInput = jest.fn();
    render(<CidrCalcTool onInput={onInput} />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "10.0.0.0/8" },
    });
    expect(onInput).toHaveBeenCalledWith("10.0.0.0/8");
  });

  test("calculates /24 network correctly", () => {
    render(<CidrCalcTool init="192.168.1.0/24" />);
    fireEvent.click(screen.getByText("[ calculate ]"));
    expect(screen.getByText("192.168.1.0")).toBeInTheDocument();
    expect(screen.getByText("192.168.1.255")).toBeInTheDocument();
    expect(screen.getByText("255.255.255.0")).toBeInTheDocument();
    expect(screen.getByText("192.168.1.1")).toBeInTheDocument();
    expect(screen.getByText("192.168.1.254")).toBeInTheDocument();
    const hostsRow = screen.getByText("usable hosts").closest("div");
    expect(hostsRow).toHaveTextContent("254");
    expect(screen.getByText("/24")).toBeInTheDocument();
  });

  test("calculates /31 correctly (hosts = 2, no subnet subtraction)", () => {
    render(<CidrCalcTool init="10.0.0.0/31" />);
    fireEvent.click(screen.getByText("[ calculate ]"));
    const hostsRow = screen.getByText("usable hosts").closest("div");
    expect(hostsRow).toHaveTextContent("2");
  });

  test("calculates /32 correctly (single host)", () => {
    render(<CidrCalcTool init="10.0.0.1/32" />);
    fireEvent.click(screen.getByText("[ calculate ]"));
    const hostsRow = screen.getByText("usable hosts").closest("div");
    expect(hostsRow).toHaveTextContent("1");
  });

  test("calculates /0 (entire internet)", () => {
    render(<CidrCalcTool init="0.0.0.0/0" />);
    fireEvent.click(screen.getByText("[ calculate ]"));
    // 0.0.0.0 appears for both network and subnet mask
    expect(screen.getAllByText("0.0.0.0").length).toBeGreaterThan(0);
    expect(screen.getByText("255.255.255.255")).toBeInTheDocument();
    expect(screen.getByText("/0")).toBeInTheDocument();
  });

  test("shows error for missing slash", () => {
    render(<CidrCalcTool init="192.168.1.0" />);
    fireEvent.click(screen.getByText("[ calculate ]"));
    expect(screen.getByText(/use CIDR notation/)).toBeInTheDocument();
  });

  test("shows error for invalid prefix > 32", () => {
    render(<CidrCalcTool init="192.168.1.0/33" />);
    fireEvent.click(screen.getByText("[ calculate ]"));
    expect(screen.getByText(/prefix must be/)).toBeInTheDocument();
  });

  test("shows error for invalid IP address", () => {
    render(<CidrCalcTool init="999.168.1.0/24" />);
    fireEvent.click(screen.getByText("[ calculate ]"));
    expect(screen.getByText(/invalid IPv4/)).toBeInTheDocument();
  });
});
