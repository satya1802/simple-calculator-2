import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Screen from "./Calculator";

function renderCalc() {
  const utils = render(<Screen />);
  const display = () => utils.container.querySelector('[data-wf="i-1-0-0"]') as HTMLElement;
  return { ...utils, display };
}

describe("Calculator screen", () => {
  it("[AC-006] tapping on-screen digit and operator buttons updates the display", () => {
    const { display } = renderCalc();
    fireEvent.click(screen.getByRole("button", { name: "Seven" }));
    expect(display()).toHaveTextContent("7");
    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    fireEvent.click(screen.getByRole("button", { name: "Three" }));
    expect(display()).toHaveTextContent("3");
  });

  it("[AC-089] each click/tap registers exactly once with no double-fire", () => {
    const { display } = renderCalc();
    const seven = screen.getByRole("button", { name: "Seven" });
    fireEvent.click(seven);
    expect(display()).toHaveTextContent("7");
    fireEvent.click(seven);
    expect(display()).toHaveTextContent("77");
  });

  it("[AC-007] pressing number and operator keys registers the same input as the on-screen buttons", () => {
    const { display } = renderCalc();
    fireEvent.keyDown(window, { key: "5" });
    expect(display()).toHaveTextContent("5");
    fireEvent.keyDown(window, { key: "+" });
    fireEvent.keyDown(window, { key: "2" });
    expect(display()).toHaveTextContent("2");
  });

  it("[AC-090] pressing Enter evaluates the current operation and shows the result", () => {
    const { display } = renderCalc();
    fireEvent.keyDown(window, { key: "5" });
    fireEvent.keyDown(window, { key: "+" });
    fireEvent.keyDown(window, { key: "2" });
    fireEvent.keyDown(window, { key: "Enter" });
    expect(display()).toHaveTextContent("7");
  });

  it("[AC-090] pressing '=' key evaluates the current operation and shows the result", () => {
    const { display } = renderCalc();
    fireEvent.keyDown(window, { key: "9" });
    fireEvent.keyDown(window, { key: "-" });
    fireEvent.keyDown(window, { key: "4" });
    fireEvent.keyDown(window, { key: "=" });
    expect(display()).toHaveTextContent("5");
  });

  it("[AC-091] each registered input updates the display to show the current entry", () => {
    const { display } = renderCalc();
    fireEvent.click(screen.getByRole("button", { name: "One" }));
    expect(display()).toHaveTextContent("1");
    fireEvent.click(screen.getByRole("button", { name: "Two" }));
    expect(display()).toHaveTextContent("12");
  });

  it("[AC-092] on equals the display shows the computed result", () => {
    const { display } = renderCalc();
    fireEvent.click(screen.getByRole("button", { name: "Three" }));
    fireEvent.click(screen.getByRole("button", { name: "Multiply" }));
    fireEvent.click(screen.getByRole("button", { name: "Four" }));
    fireEvent.click(screen.getByRole("button", { name: "Equals" }));
    expect(display()).toHaveTextContent("12");
  });

  it("[NFR-004] the display region keeps aria-live=polite and keys have accessible labels", () => {
    renderCalc();
    const statuses = screen.getAllByRole("status");
    expect(statuses[0]).toHaveAttribute("aria-live", "polite");
    expect(screen.getByRole("button", { name: "Seven" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "All clear" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Equals" })).toBeInTheDocument();
  });

  it("[NFR-002] keyboard input ignores events when focus is in a text field", () => {
    const { display } = renderCalc();
    const input = document.createElement("input");
    document.body.appendChild(input);
    input.focus();
    fireEvent.keyDown(input, { key: "7" });
    expect(display()).toHaveTextContent("0");
    document.body.removeChild(input);
  });
});
