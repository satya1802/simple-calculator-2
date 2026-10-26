import { describe, expect, it } from "vitest";

import { display, initialState, reduce, type CalcState, type Token } from "./calculator";

function run(tokens: Token[], start: CalcState = initialState): CalcState {
  return tokens.reduce((s, t) => reduce(s, t), start);
}

describe("calculator engine", () => {
  it("[AC-001] applying first operand, +, second operand, = returns the arithmetic sum", () => {
    const s = run(["2", "+", "3", "="]);
    expect(s.acc).toBe(5);
  });

  it("[AC-080] 2 + 3 = yields display value '5'", () => {
    const s = run(["2", "+", "3", "="]);
    expect(display(s).value).toBe("5");
  });

  it("[AC-002] applying first operand, −, second operand, = returns first minus second", () => {
    const s = run(["5", "−", "3", "="]);
    expect(s.acc).toBe(2);
  });

  it("[AC-081] 5 − 3 = yields display value '2'", () => {
    const s = run(["5", "−", "3", "="]);
    expect(display(s).value).toBe("2");
  });

  it("[AC-003] applying × between two operands and = returns the product", () => {
    const s = run(["4", "×", "3", "="]);
    expect(s.acc).toBe(12);
  });

  it("[AC-082] 4 × 3 = yields display value '12'", () => {
    const s = run(["4", "×", "3", "="]);
    expect(display(s).value).toBe("12");
  });

  it("[AC-004] applying ÷ between two non-zero operands and = returns the quotient", () => {
    const s = run(["1", "2", "÷", "4", "="]);
    expect(s.acc).toBe(3);
  });

  it("[AC-083] 12 ÷ 4 = yields display value '3'", () => {
    const s = run(["1", "2", "÷", "4", "="]);
    expect(display(s).value).toBe("3");
  });

  it("[AC-005] clear/reset returns state to display '0', clears pending operator and accumulator", () => {
    const mid = run(["5", "+", "3"]);
    const s = reduce(mid, "AC");
    expect(s).toEqual(initialState);
    expect(display(s).value).toBe("0");
    expect(s.op).toBeNull();
    expect(s.acc).toBeNull();
  });

  it("[AC-088] from an error state (divide by zero) AC clears the error and returns to the initial zero state accepting new input", () => {
    const errored = run(["5", "÷", "0", "="]);
    expect(display(errored).error).toBe("Cannot divide by zero — press AC to start again.");
    const cleared = reduce(errored, "AC");
    expect(cleared).toEqual(initialState);
    const next = reduce(cleared, "7");
    expect(display(next).value).toBe("7");
  });

  it("[NFR-006] error recovery is a pure state transition requiring no reload", () => {
    const errored = run(["5", "÷", "0", "="]);
    const cleared = reduce(errored, "AC");
    expect(cleared.error).toBeNull();
    expect(cleared).toEqual(initialState);
  });

  it("preserves the 12-digit limit", () => {
    const thirteen: Token[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "1", "2", "3"];
    const s = run(thirteen);
    expect(s.entry.replace(/[-.]/g, "").length).toBe(12);
    expect(s.limit).toBe(true);
  });

  it("supports a decimal point, rejecting a second one in the same entry", () => {
    const s = run(["3", ".", "1", "4"]);
    expect(s.entry).toBe("3.14");
    const s2 = reduce(s, ".");
    expect(s2.entry).toBe("3.14");
  });

  it("backspace removes the last digit and falls back to '0'", () => {
    const s = run(["1", "2", "3", "⌫", "⌫", "⌫"]);
    expect(s.entry).toBe("0");
  });

  it("percent divides the current entry by 100", () => {
    const s = run(["5", "0", "%"]);
    expect(display(s).value).toBe("0.5");
  });

  it("± toggles the sign of a nonzero entry", () => {
    const s = run(["5", "±"]);
    expect(s.entry).toBe("-5");
    const back = reduce(s, "±");
    expect(back.entry).toBe("5");
  });

  it("formats a very large result in exponential notation", () => {
    const s = run(["9", "9", "9", "9", "9", "9", "9", "9", "9", "9", "9", "9", "×", "9", "9", "9", "9", "9", "9", "9", "9", "9", "9", "9", "9", "="]);
    expect(display(s).value).toMatch(/e/);
  });

  it("chains operators: pressing another operator after a result continues from the answer", () => {
    const s = run(["2", "+", "3", "=", "+", "4", "="]);
    expect(display(s).value).toBe("9");
  });
});
