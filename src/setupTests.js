import "@testing-library/jest-dom";

// Clipboard API is not available in jsdom
Object.defineProperty(navigator, "clipboard", {
  value: { writeText: jest.fn(() => Promise.resolve()) },
  configurable: true,
});
