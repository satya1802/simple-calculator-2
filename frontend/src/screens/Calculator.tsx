// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { X } = Icons;

const PRODUCT = "simple calculator-2";
const SCREEN = "Calculator";
const MAX_DIGITS = 12;
const mix = (colour, percent) => `color-mix(in srgb, ${colour} ${percent}%, transparent)`;

const OP_NAME = { "+": "add", "−": "subtract", "×": "multiply", "÷": "divide" };

const KEYPAD = [
  [
    { wf: "b-3-0", label: "AC", tok: "AC", kind: "clear", aria: "All clear" },
    { wf: "b-3-1", label: "⌫", tok: "⌫", kind: "util", aria: "Delete last digit" },
    { wf: "b-3-2", label: "%", tok: "%", kind: "util", aria: "Percent" },
    { wf: "b-3-3", label: "÷", tok: "÷", kind: "op", aria: "Divide" },
  ],
  [
    { wf: "b-4-0", label: "7", tok: "7", kind: "digit" },
    { wf: "b-4-1", label: "8", tok: "8", kind: "digit" },
    { wf: "b-4-2", label: "9", tok: "9", kind: "digit" },
    { wf: "b-4-3", label: "×", tok: "×", kind: "op", aria: "Multiply" },
  ],
  [
    { wf: "b-5-0", label: "4", tok: "4", kind: "digit" },
    { wf: "b-5-1", label: "5", tok: "5", kind: "digit" },
    { wf: "b-5-2", label: "6", tok: "6", kind: "digit" },
    { wf: "b-5-3", label: "−", tok: "−", kind: "op", aria: "Subtract" },
  ],
  [
    { wf: "b-6-0", label: "1", tok: "1", kind: "digit" },
    { wf: "b-6-1", label: "2", tok: "2", kind: "digit" },
    { wf: "b-6-2", label: "3", tok: "3", kind: "digit" },
    { wf: "b-6-3", label: "+", tok: "+", kind: "op", aria: "Add" },
  ],
  [
    { wf: "b-7-0", label: "+/−", tok: "±", kind: "util", aria: "Toggle positive or negative" },
    { wf: "b-7-1", label: "0", tok: "0", kind: "digit" },
    { wf: "b-7-2", label: ".", tok: ".", kind: "digit", aria: "Decimal point" },
    { wf: "b-7-3", label: "=", tok: "=", kind: "equals", aria: "Equals" },
  ],
];

const CSS = `
.np-focus:focus-visible{outline:2px solid var(--np-ring);outline-offset:3px;}
@keyframes np-pop{0%{transform:scale(1)}40%{transform:scale(.94)}100%{transform:scale(1)}}
.np-flash{animation:np-pop 180ms ease-out}
@keyframes np-breathe{0%,100%{opacity:.5}50%{opacity:.85}}
.np-pulse{animation:np-breathe 5s ease-in-out infinite}
@keyframes np-rail{0%{opacity:.35;transform:scaleX(.85)}100%{opacity:1;transform:scaleX(1)}}
.np-rail-on{animation:np-rail 320ms ease-out}
@media (prefers-reduced-motion: reduce){
  .np-flash,.np-pulse,.np-rail-on{animation:none!important}
  .np-key{transition:none!important}
}
`;

const countDigits = (s) => String(s).replace(/[-.]/g, "").length;

function fmt(n) {
  if (typeof n !== "number" || !Number.isFinite(n)) return "0";
  if (n === 0) return "0";
  const abs = Math.abs(n);
  if (abs >= 1e12 || abs < 1e-9) {
    return n.toExponential(5).replace(/\.?0+e/, "e").replace("e+", "e");
  }
  let s = String(Number(n.toPrecision(MAX_DIGITS)));
  if (countDigits(s) > MAX_DIGITS) {
    const intLen = countDigits(s.split(".")[0]);
    s = String(Number(n.toFixed(Math.max(0, MAX_DIGITS - intLen))));
  }
  return s;
}

function compute(a, b, operator) {
  if (operator === "÷" && b === 0) {
    return { error: "Cannot divide by zero — press AC to start again." };
  }
  let v;
  if (operator === "+") v = a + b;
  else if (operator === "−") v = a - b;
  else if (operator === "×") v = a * b;
  else v = a / b;
  if (!Number.isFinite(v)) {
    return { error: "That answer is too large to show — press AC to start again." };
  }
  return { value: v };
}

export default function Screen() {
  const AlertIcon = (typeof Icons !== "undefined" && Icons.AlertCircle) || (() => null);
  const OkIcon = (typeof Icons !== "undefined" && Icons.CheckCircle) || (() => null);

  const [entry, setEntry] = React.useState("0");
  const [acc, setAcc] = React.useState(null);
  const [op, setOp] = React.useState(null);
  const [fresh, setFresh] = React.useState(true);
  const [hasOperand, setHasOperand] = React.useState(false);
  const [tokens, setTokens] = React.useState([]);
  const [done, setDone] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [limit, setLimit] = React.useState(false);
  const [flash, setFlash] = React.useState(null);

  const flashTimer = React.useRef(null);
  const pressRef = React.useRef(null);

  React.useEffect(() => () => clearTimeout(flashTimer.current), []);

  const glass = {
    backgroundColor: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: brand.radius,
  };

  const resetAll = () => {
    setEntry("0");
    setAcc(null);
    setOp(null);
    setFresh(true);
    setHasOperand(false);
    setTokens([]);
    setDone(false);
    setError(null);
    setLimit(false);
  };

  function press(tok) {
    setFlash(tok);
    clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setFlash(null), 180);
    setLimit(false);

    if (tok === "AC") {
      resetAll();
      return;
    }
    if (error) return; // only AC recovers, as the message says

    // digits
    if (/^[0-9]$/.test(tok)) {
      if (done) {
        setTokens([]);
        setDone(false);
        setAcc(null);
        setOp(null);
        setEntry(tok);
        setFresh(false);
        setHasOperand(true);
        return;
      }
      if (fresh) {
        setEntry(tok);
        setFresh(false);
        setHasOperand(true);
        return;
      }
      if (countDigits(entry) >= MAX_DIGITS) {
        setLimit(true);
        return;
      }
      setEntry(entry === "0" ? tok : entry + tok);
      setHasOperand(true);
      return;
    }

    if (tok === ".") {
      if (done) {
        setTokens([]);
        setDone(false);
        setAcc(null);
        setOp(null);
        setEntry("0.");
        setFresh(false);
        setHasOperand(true);
        return;
      }
      if (fresh) {
        setEntry("0.");
        setFresh(false);
        setHasOperand(true);
        return;
      }
      if (entry.indexOf(".") !== -1) return;
      if (countDigits(entry) >= MAX_DIGITS) {
        setLimit(true);
        return;
      }
      setEntry(entry + ".");
      setHasOperand(true);
      return;
    }

    if (tok === "+" || tok === "−" || tok === "×" || tok === "÷") {
      if (op !== null && hasOperand && !done) {
        const r = compute(acc, parseFloat(entry), op);
        if (r.error) {
          setTokens([...tokens, entry]);
          setError(r.error);
          setDone(true);
          setOp(null);
          return;
        }
        setAcc(r.value);
        setEntry(fmt(r.value));
        setTokens([...tokens, entry, tok]);
      } else if (op !== null && !done) {
        setTokens(tokens.length ? [...tokens.slice(0, -1), tok] : [fmt(parseFloat(entry)), tok]);
      } else {
        const base = parseFloat(entry);
        setAcc(Number.isFinite(base) ? base : 0);
        setTokens([fmt(base), tok]);
      }
      setOp(tok);
      setFresh(true);
      setHasOperand(false);
      setDone(false);
      return;
    }

    if (tok === "=") {
      if (op === null) {
        setTokens([fmt(parseFloat(entry))]);
        setDone(true);
        setFresh(true);
        setHasOperand(false);
        return;
      }
      const b = parseFloat(entry);
      const r = compute(acc, b, op);
      setTokens([...tokens, fmt(b)]);
      setOp(null);
      setDone(true);
      setFresh(true);
      setHasOperand(false);
      if (r.error) {
        setError(r.error);
        return;
      }
      setAcc(r.value);
      setEntry(fmt(r.value));
      return;
    }

    if (tok === "%") {
      const v = parseFloat(entry) / 100;
      if (!Number.isFinite(v)) {
        setError("That answer is too large to show — press AC to start again.");
        setDone(true);
        return;
      }
      if (done) {
        setTokens([]);
        setDone(false);
        setAcc(null);
        setOp(null);
      }
      setEntry(fmt(v));
      setFresh(true);
      setHasOperand(true);
      return;
    }

    if (tok === "⌫") {
      if (fresh && !done) return;
      if (done) {
        setTokens([]);
        setDone(false);
        setAcc(null);
        setOp(null);
      }
      let s = entry.slice(0, -1);
      if (s === "" || s === "-") s = "0";
      setEntry(s);
      setFresh(s === "0");
      setHasOperand(true);
      return;
    }

    if (tok === "±") {
      if (entry === "0" || entry === "0.") return;
      if (done) {
        setTokens([]);
        setDone(false);
      }
      setEntry(entry.charAt(0) === "-" ? entry.slice(1) : "-" + entry);
      setHasOperand(true);
    }
  }

  pressRef.current = press;

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target;
      const tag = t && t.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (t && t.isContentEditable)) return;
      const k = e.key;
      let tok = null;
      if (/^[0-9]$/.test(k)) tok = k;
      else if (k === "." || k === ",") tok = ".";
      else if (k === "+") tok = "+";
      else if (k === "-") tok = "−";
      else if (k === "*" || k === "x" || k === "X") tok = "×";
      else if (k === "/") tok = "÷";
      else if (k === "%") tok = "%";
      else if (k === "Enter" || k === "=") tok = "=";
      else if (k === "Backspace") tok = "⌫";
      else if (k === "Escape") tok = "AC";
      if (!tok) return;
      if (k === "Enter" && tag === "BUTTON") return; // let the focused key handle it
      e.preventDefault();
      pressRef.current(tok);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const shown = error ? "Error" : entry;
  const sizeClass =
    shown.length > 12 ? "text-4xl sm:text-5xl" : shown.length > 8 ? "text-5xl sm:text-6xl" : "text-6xl sm:text-7xl";

  const liveTokens = hasOperand && !done ? [...tokens, entry] : tokens;
  const expr = liveTokens.join(" ");

  const hint = op && !hasOperand
    ? `Waiting for the number to ${OP_NAME[op]}.`
    : done
    ? "Result ready — carry on with an operator, or press AC for a fresh start."
    : tokens.length === 0 && entry === "0" && fresh
    ? "All clear. Tap a key or type a number to begin."
    : "Keep going, then press = to calculate.";

  const keyStyle = (k) => {
    const base = { borderRadius: `calc(${brand.radius} - 2px)` };
    const active = k.kind === "op" && op === k.tok && !hasOperand && !done;
    if (k.kind === "equals") {
      return {
        ...base,
        background: `linear-gradient(135deg, ${brand.primaryColor}, ${brand.accentColor})`,
        color: brand.backgroundColor,
        border: "1px solid rgba(255,255,255,0.22)",
        boxShadow: `0 0 44px ${mix(brand.primaryColor, 55)}`,
      };
    }
    if (k.kind === "op") {
      return active
        ? {
            ...base,
            backgroundColor: brand.primaryColor,
            color: brand.backgroundColor,
            border: `1px solid ${brand.primaryColor}`,
            boxShadow: `0 0 30px ${mix(brand.primaryColor, 55)}`,
          }
        : {
            ...base,
            backgroundColor: mix(brand.primaryColor, 14),
            color: brand.primaryColor,
            border: `1px solid ${mix(brand.primaryColor, 40)}`,
          };
    }
    if (k.kind === "clear") {
      return {
        ...base,
        backgroundColor: mix(brand.accentColor, 14),
        color: brand.accentColor,
        border: `1px solid ${mix(brand.accentColor, 42)}`,
      };
    }
    if (k.kind === "util") {
      return {
        ...base,
        backgroundColor: "rgba(255,255,255,0.05)",
        color: "var(--brand-fg)",
        border: "1px solid rgba(255,255,255,0.12)",
      };
    }
    return {
      ...base,
      backgroundColor: "rgba(255,255,255,0.09)",
      color: "var(--brand-fg)",
      border: "1px solid rgba(255,255,255,0.14)",
    };
  };

  return (
    <div
      className="mx-auto w-full max-w-xl space-y-6"
      style={{ color: "var(--brand-fg)", fontFamily: brand.fontBody, "--np-ring": brand.accentColor }}
    >
      <style>{CSS}</style>

      <div data-wf="b-0-0">
        <h1 className="text-4xl font-extrabold tracking-tight" style={{ fontFamily: brand.fontHeading }}>
          {SCREEN}
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--brand-fg-muted)" }}>
          Add, subtract, multiply, divide and take a percent — by tap or by keyboard.
        </p>
      </div>

      <div
        data-wf="b-1-0"
        className="relative overflow-hidden p-6 backdrop-blur-xl"
        style={{ ...glass, boxShadow: "0 30px 70px -35px rgba(0,0,0,0.8)" }}
      >
        <div
          aria-hidden
          className="np-pulse absolute -right-16 -top-24 h-56 w-56 rounded-full blur-[70px]"
          style={{ backgroundColor: mix(error ? brand.accentColor : brand.primaryColor, 60) }}
        />
        <div className="relative" role="status" aria-live="polite" aria-atomic="true">
          <p
            className="truncate text-sm font-semibold tracking-wide"
            style={{ color: "var(--brand-fg-muted)", fontVariantNumeric: "tabular-nums" }}
          >
            {expr || "Nothing entered yet"}
          </p>
          <p
            data-wf="i-1-0-0"
            className={`mt-3 break-all text-right font-extrabold leading-none ${sizeClass}`}
            style={{ fontVariantNumeric: "tabular-nums", color: error ? brand.accentColor : "var(--brand-fg)" }}
          >
            {shown}
          </p>
        </div>
        <div
          aria-hidden
          key={flash || "idle"}
          className={`relative mt-5 h-[2px] w-full origin-left rounded-full ${flash ? "np-rail-on" : ""}`}
          style={{
            background: `linear-gradient(90deg, ${brand.primaryColor}, ${brand.accentColor})`,
            opacity: flash ? 1 : 0.35,
          }}
        />
        <div className="relative mt-3 flex items-center justify-between gap-4">
          <span className="text-xs" style={{ color: "var(--brand-fg-muted)" }}>
            {op ? `Pending: ${OP_NAME[op]}` : done ? "Answer" : "Entry"}
          </span>
          <span
            data-wf="i-1-0-1"
            className="text-xs font-bold tracking-wide"
            style={{
              fontVariantNumeric: "tabular-nums",
              color: limit ? brand.accentColor : "var(--brand-fg-muted)",
            }}
          >
            {limit ? "Max 12 digits — display full" : "Max 12 digits"}
          </span>
        </div>
      </div>

      <div
        data-wf="b-2-0"
        role={error ? "alert" : "status"}
        className="flex items-start gap-3 px-4 py-3 transition-colors duration-200"
        style={{
          ...glass,
          backgroundColor: error ? mix(brand.accentColor, 12) : "rgba(255,255,255,0.04)",
          border: `1px solid ${error ? mix(brand.accentColor, 50) : "rgba(255,255,255,0.12)"}`,
        }}
      >
        {error ? (
          <AlertIcon aria-hidden className="mt-0.5 h-4 w-4 shrink-0" style={{ color: brand.accentColor }} />
        ) : (
          <OkIcon aria-hidden className="mt-0.5 h-4 w-4 shrink-0" style={{ color: brand.primaryColor }} />
        )}
        <p className="text-sm leading-relaxed">
          <span className="font-bold">{error ? "Error — " : ""}</span>
          {error || hint}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {KEYPAD.map((row) =>
          row.map((k) => (
            <button
              key={k.wf}
              data-wf={k.wf}
              type="button"
              aria-label={k.aria}
              aria-pressed={k.kind === "op" ? op === k.tok && !hasOperand && !done : undefined}
              onClick={() => press(k.tok)}
              className={`np-key np-focus flex h-16 items-center justify-center text-2xl font-bold transition-all duration-150 hover:brightness-125 active:translate-y-px sm:h-[72px] ${
                flash === k.tok ? "np-flash" : ""
              }`}
              style={keyStyle(k)}
            >
              {k.label}
            </button>
          ))
        )}
      </div>

      <div className="space-y-3 pt-1">
        <p data-wf="b-8-0" className="text-sm leading-relaxed" style={{ color: "var(--brand-fg-muted)" }}>
          <span className="font-bold" style={{ color: "var(--brand-fg)" }}>
            Keyboard shortcuts:
          </span>{" "}
          0–9 and . for digits, + − * / for operators, % for percent, Enter or = to calculate, Backspace to delete, Esc
          to clear.
        </p>
        <div className="border-t pt-3" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
          <p data-wf="b-9-0" className="text-xs leading-relaxed" style={{ color: "var(--brand-fg-muted)" }}>
            Everything is calculated in your browser. Nothing is sent or saved — reloading starts a fresh calculation at
            0.
          </p>
        </div>
      </div>
    </div>
  );
}
