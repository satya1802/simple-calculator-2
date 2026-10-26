/**
 * Pure calculator state machine.
 *
 * No React, no DOM, no timers, no network. The screen (Calculator.tsx, refactored
 * under US-006-1) and these tests share this single source of truth for every
 * arithmetic and formatting rule the prototype implemented inline.
 */

export type Token =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "."
  | "+"
  | "−"
  | "×"
  | "÷"
  | "="
  | "AC"
  | "⌫"
  | "%"
  | "±";

export type CalcState = {
  entry: string;
  acc: number | null;
  op: Token | null;
  fresh: boolean;
  hasOperand: boolean;
  tokens: string[];
  done: boolean;
  error: string | null;
  limit: boolean;
};

export const initialState: CalcState = {
  entry: "0",
  acc: null,
  op: null,
  fresh: true,
  hasOperand: false,
  tokens: [],
  done: false,
  error: null,
  limit: false,
};

const MAX_DIGITS = 12;
const DIGIT_RE = /^[0-9]$/;
const OPERATORS: ReadonlySet<Token> = new Set(["+", "−", "×", "÷"]);

function countDigits(s: string): number {
  return s.replace(/[-.]/g, "").length;
}

function fmt(n: number): string {
  if (typeof n !== "number" || !Number.isFinite(n)) return "0";
  if (n === 0) return "0";
  const abs = Math.abs(n);
  if (abs >= 1e12 || abs < 1e-9) {
    return n
      .toExponential(5)
      .replace(/\.?0+e/, "e")
      .replace("e+", "e");
  }
  let s = String(Number(n.toPrecision(MAX_DIGITS)));
  if (countDigits(s) > MAX_DIGITS) {
    const intLen = countDigits(s.split(".")[0]);
    s = String(Number(n.toFixed(Math.max(0, MAX_DIGITS - intLen))));
  }
  return s;
}

type ComputeResult = { value: number; error?: undefined } | { value?: undefined; error: string };

function compute(a: number, b: number, operator: Token): ComputeResult {
  if (operator === "÷" && b === 0) {
    return { error: "Cannot divide by zero — press AC to start again." };
  }
  let v: number;
  if (operator === "+") v = a + b;
  else if (operator === "−") v = a - b;
  else if (operator === "×") v = a * b;
  else v = a / b;
  if (!Number.isFinite(v)) {
    return { error: "That answer is too large to show — press AC to start again." };
  }
  return { value: v };
}

export function reduce(state: CalcState, token: Token): CalcState {
  const { entry, acc, op, fresh, hasOperand, tokens, done, error } = state;
  const limit = false;

  if (token === "AC") {
    return { ...initialState };
  }

  if (error) return { ...state, limit };

  if (DIGIT_RE.test(token)) {
    if (done) {
      return { ...state, tokens: [], done: false, acc: null, op: null, entry: token, fresh: false, hasOperand: true, limit };
    }
    if (fresh) {
      return { ...state, entry: token, fresh: false, hasOperand: true, limit };
    }
    if (countDigits(entry) >= MAX_DIGITS) {
      return { ...state, limit: true };
    }
    return { ...state, entry: entry === "0" ? token : entry + token, hasOperand: true, limit };
  }

  if (token === ".") {
    if (done) {
      return { ...state, tokens: [], done: false, acc: null, op: null, entry: "0.", fresh: false, hasOperand: true, limit };
    }
    if (fresh) {
      return { ...state, entry: "0.", fresh: false, hasOperand: true, limit };
    }
    if (entry.indexOf(".") !== -1) return { ...state, limit };
    if (countDigits(entry) >= MAX_DIGITS) {
      return { ...state, limit: true };
    }
    return { ...state, entry: entry + ".", hasOperand: true, limit };
  }

  if (OPERATORS.has(token)) {
    let newAcc = acc;
    let newEntry = entry;
    let newTokens = tokens;

    if (op !== null && hasOperand && !done) {
      const r = compute(acc as number, parseFloat(entry), op);
      if (r.error) {
        return { ...state, tokens: [...tokens, entry], error: r.error, done: true, op: null, limit };
      }
      newAcc = r.value;
      newEntry = fmt(r.value as number);
      newTokens = [...tokens, entry, token];
    } else if (op !== null && !done) {
      newTokens = tokens.length ? [...tokens.slice(0, -1), token] : [fmt(parseFloat(entry)), token];
    } else {
      const base = parseFloat(entry);
      newAcc = Number.isFinite(base) ? base : 0;
      newTokens = [fmt(base), token];
    }

    return {
      ...state,
      acc: newAcc,
      entry: newEntry,
      tokens: newTokens,
      op: token,
      fresh: true,
      hasOperand: false,
      done: false,
      limit,
    };
  }

  if (token === "=") {
    if (op === null) {
      return { ...state, tokens: [fmt(parseFloat(entry))], done: true, fresh: true, hasOperand: false, limit };
    }
    const b = parseFloat(entry);
    const r = compute(acc as number, b, op);
    const newTokens = [...tokens, fmt(b)];
    if (r.error) {
      return { ...state, tokens: newTokens, op: null, done: true, fresh: true, hasOperand: false, error: r.error, limit };
    }
    return {
      ...state,
      tokens: newTokens,
      op: null,
      done: true,
      fresh: true,
      hasOperand: false,
      acc: r.value as number,
      entry: fmt(r.value as number),
      limit,
    };
  }

  if (token === "%") {
    const v = parseFloat(entry) / 100;
    if (!Number.isFinite(v)) {
      return {
        ...state,
        error: "That answer is too large to show — press AC to start again.",
        done: true,
        limit,
      };
    }
    let newTokens = tokens;
    let newDone = done;
    let newAcc = acc;
    let newOp = op;
    if (done) {
      newTokens = [];
      newDone = false;
      newAcc = null;
      newOp = null;
    }
    return {
      ...state,
      tokens: newTokens,
      done: newDone,
      acc: newAcc,
      op: newOp,
      entry: fmt(v),
      fresh: true,
      hasOperand: true,
      limit,
    };
  }

  if (token === "⌫") {
    if (fresh && !done) return { ...state, limit };
    let newTokens = tokens;
    let newDone = done;
    let newAcc = acc;
    let newOp = op;
    if (done) {
      newTokens = [];
      newDone = false;
      newAcc = null;
      newOp = null;
    }
    let s = entry.slice(0, -1);
    if (s === "" || s === "-") s = "0";
    return {
      ...state,
      tokens: newTokens,
      done: newDone,
      acc: newAcc,
      op: newOp,
      entry: s,
      fresh: s === "0",
      hasOperand: true,
      limit,
    };
  }

  if (token === "±") {
    if (entry === "0" || entry === "0.") return { ...state, limit };
    let newTokens = tokens;
    let newDone = done;
    if (done) {
      newTokens = [];
      newDone = false;
    }
    return {
      ...state,
      tokens: newTokens,
      done: newDone,
      entry: entry.charAt(0) === "-" ? entry.slice(1) : "-" + entry,
      hasOperand: true,
      limit,
    };
  }

  return state;
}

export function display(state: CalcState): { value: string; expression: string; error: string | null } {
  const value = state.error ? "Error" : state.entry;
  const liveTokens = state.hasOperand && !state.done ? [...state.tokens, state.entry] : state.tokens;
  return { value, expression: liveTokens.join(" "), error: state.error };
}
