import React from "react";

import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { initialState, reduce, display, type Token, type CalcState } from "@/lib/calculator";

const { X } = Icons;
void X;

const SCREEN = "Calculator";

const mix = (colour: string, percent: number) => `color-mix(in srgb, ${colour} ${percent}%, transparent)`;

const OP_NAME: Record<string, string> = { "+": "add", "−": "subtract", "×": "multiply", "÷": "divide" };

type KeyKind = "digit" | "op" | "util" | "clear" | "equals";

type Key = {
  wf: string;
  label: string;
  tok: Token;
  kind: KeyKind;
  aria: string;
};

const KEYPAD: Key[][] = [
  [
    { wf: "b-3-0", label: "AC", tok: "AC", kind: "clear", aria: "All clear" },
    { wf: "b-3-1", label: "⌫", tok: "⌫", kind: "util", aria: "Delete last digit" },
    { wf: "b-3-2", label: "%", tok: "%", kind: "util", aria: "Percent" },
    { wf: "b-3-3", label: "÷", tok: "÷", kind: "op", aria: "Divide" },
  ],
  [
    { wf: "b-4-0", label: "7", tok: "7", kind: "digit", aria: "Seven" },
    { wf: "b-4-1", label: "8", tok: "8", kind: "digit", aria: "Eight" },
    { wf: "b-4-2", label: "9", tok: "9", kind: "digit", aria: "Nine" },
    { wf: "b-4-3", label: "×", tok: "×", kind: "op", aria: "Multiply" },
  ],
  [
    { wf: "b-5-0", label: "4", tok: "4", kind: "digit", aria: "Four" },
    { wf: "b-5-1", label: "5", tok: "5", kind: "digit", aria: "Five" },
    { wf: "b-5-2", label: "6", tok: "6", kind: "digit", aria: "Six" },
    { wf: "b-5-3", label: "−", tok: "−", kind: "op", aria: "Subtract" },
  ],
  [
    { wf: "b-6-0", label: "1", tok: "1", kind: "digit", aria: "One" },
    { wf: "b-6-1", label: "2", tok: "2", kind: "digit", aria: "Two" },
    { wf: "b-6-2", label: "3", tok: "3", kind: "digit", aria: "Three" },
    { wf: "b-6-3", label: "+", tok: "+", kind: "op", aria: "Add" },
  ],
  [
    { wf: "b-7-0", label: "+/−", tok: "±", kind: "util", aria: "Toggle positive or negative" },
    { wf: "b-7-1", label: "0", tok: "0", kind: "digit", aria: "Zero" },
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

function keyStyle(k: Key, state: CalcState): React.CSSProperties {
  const base: React.CSSProperties = { borderRadius: `calc(${brand.radius} - 2px)` };
  const active = k.kind === "op" && state.op === k.tok && !state.hasOperand && !state.done;
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
}

export default function Screen() {
  const AlertIcon = Icons.AlertCircle ?? (() => null);
  const OkIcon = Icons.CheckCircle ?? (() => null);

  const [state, dispatch] = React.useReducer(reduce, initialState);
  const [flash, setFlash] = React.useState<Token | null>(null);

  const flashTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const dispatchRef = React.useRef(dispatch);
  dispatchRef.current = dispatch;

  React.useEffect(() => () => clearTimeout(flashTimer.current), []);

  const glass: React.CSSProperties = {
    backgroundColor: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: brand.radius,
  };

  function press(tok: Token) {
    setFlash(tok);
    clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setFlash(null), 180);
    dispatch(tok);
  }

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      const tag = t?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || t?.isContentEditable) return;
      const k = e.key;
      let tok: Token | null = null;
      if (/^[0-9]$/.test(k)) tok = k as Token;
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
      const t2 = tok;
      setFlash(t2);
      clearTimeout(flashTimer.current);
      flashTimer.current = setTimeout(() => setFlash(null), 180);
      dispatchRef.current(t2);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const { value: shown, expression: expr, error } = display(state);
  const sizeClass =
    shown.length > 12
      ? "text-4xl sm:text-5xl"
      : shown.length > 8
        ? "text-5xl sm:text-6xl"
        : "text-6xl sm:text-7xl";

  const hint =
    state.op && !state.hasOperand
      ? `Waiting for the number to ${OP_NAME[state.op]}.`
      : state.done
        ? "Result ready — carry on with an operator, or press AC for a fresh start."
        : state.tokens.length === 0 && state.entry === "0" && state.fresh
          ? "All clear. Tap a key or type a number to begin."
          : "Keep going, then press = to calculate.";

  return (
    <div
      className="mx-auto w-full max-w-xl space-y-6"
      style={
        {
          color: "var(--brand-fg)",
          fontFamily: brand.fontBody,
          "--np-ring": brand.accentColor,
        } as React.CSSProperties
      }
    >
      <style>{CSS}</style>

      <div data-wf="b-0-0">
        <h1
          className="text-4xl font-extrabold tracking-tight"
          style={{ fontFamily: brand.fontHeading }}
        >
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
            style={{
              fontVariantNumeric: "tabular-nums",
              color: error ? brand.accentColor : "var(--brand-fg)",
            }}
          >
            {shown}
          </p>
        </div>
        <div
          aria-hidden
          key={flash ?? "idle"}
          className={`relative mt-5 h-[2px] w-full origin-left rounded-full ${flash ? "np-rail-on" : ""}`}
          style={{
            background: `linear-gradient(90deg, ${brand.primaryColor}, ${brand.accentColor})`,
            opacity: flash ? 1 : 0.35,
          }}
        />
        <div className="relative mt-3 flex items-center justify-between gap-4">
          <span className="text-xs" style={{ color: "var(--brand-fg-muted)" }}>
            {state.op ? `Pending: ${OP_NAME[state.op]}` : state.done ? "Answer" : "Entry"}
          </span>
          <span
            data-wf="i-1-0-1"
            className="text-xs font-bold tracking-wide"
            style={{
              fontVariantNumeric: "tabular-nums",
              color: state.limit ? brand.accentColor : "var(--brand-fg-muted)",
            }}
          >
            {state.limit ? "Max 12 digits — display full" : "Max 12 digits"}
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
          <AlertIcon
            aria-hidden
            className="mt-0.5 h-4 w-4 shrink-0"
            style={{ color: brand.accentColor }}
          />
        ) : (
          <OkIcon
            aria-hidden
            className="mt-0.5 h-4 w-4 shrink-0"
            style={{ color: brand.primaryColor }}
          />
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
              aria-pressed={
                k.kind === "op" ? state.op === k.tok && !state.hasOperand && !state.done : undefined
              }
              onClick={() => press(k.tok)}
              className={`np-key np-focus flex h-16 min-h-[44px] min-w-[44px] items-center justify-center text-2xl font-bold transition-all duration-150 hover:brightness-125 active:translate-y-px sm:h-[72px] ${
                flash === k.tok ? "np-flash" : ""
              }`}
              style={keyStyle(k, state)}
            >
              {k.label}
            </button>
          )),
        )}
      </div>

      <div className="space-y-3 pt-1">
        <p
          data-wf="b-8-0"
          className="text-sm leading-relaxed"
          style={{ color: "var(--brand-fg-muted)" }}
        >
          <span className="font-bold" style={{ color: "var(--brand-fg)" }}>
            Keyboard shortcuts:
          </span>{" "}
          0–9 and . for digits, + − * / for operators, % for percent, Enter or = to calculate,
          Backspace to delete, Esc to clear.
        </p>
        <div className="border-t pt-3" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
          <p
            data-wf="b-9-0"
            className="text-xs leading-relaxed"
            style={{ color: "var(--brand-fg-muted)" }}
          >
            Everything is calculated in your browser. Nothing is sent or saved — reloading starts a
            fresh calculation at 0.
          </p>
        </div>
      </div>
    </div>
  );
}
