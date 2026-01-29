"use client";

import { useEffect, useRef, useState } from "react";

const DEMO_SEQUENCES = [
  {
    command: "/list-skills development",
    output: [
      "⚡ Found 25 development skills:",
      "",
      "  debug-systematic          4-phase debugging methodology",
      "  tdd-workflow              Test-Driven Development",
      "  generic-code-reviewer     Multi-stack code review",
      "  generic-react-*           React/TypeScript patterns",
      "  api-design                REST/GraphQL best practices",
      "  tech-debt-analyzer        Code health analysis",
      "  codebase-documenter       Documentation generation",
      "  ...",
    ],
  },
  {
    command: "Skill(debug-systematic)",
    output: [
      "🔧 Loading debug-systematic skill...",
      "",
      "  Phase 1: REPRODUCE the issue",
      "  Phase 2: ISOLATE the root cause",
      "  Phase 3: DIAGNOSE the failure",
      "  Phase 4: FIX and verify",
      "",
      "✅ Skill loaded. Ready to debug.",
    ],
  },
  {
    command: '/start-task "Build real-time dashboard"',
    output: [
      "📋 Routing to appropriate workflow...",
      "",
      "  Domain:    Development",
      "  Skills:    websockets-realtime, generic-react-*",
      "  Agents:    react-expert, realtime-specialist",
      "",
      "🚀 Task initialized. Ready to build.",
    ],
  },
];

export default function TerminalDemo() {
  const [seqIndex, setSeqIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [outputLines, setOutputLines] = useState<string[]>([]);
  const [phase, setPhase] = useState<"typing" | "output" | "pause">("typing");
  const termRef = useRef<HTMLDivElement>(null);

  const seq = DEMO_SEQUENCES[seqIndex];

  useEffect(() => {
    if (phase === "typing") {
      if (charIndex < seq.command.length) {
        const timer = setTimeout(
          () => setCharIndex(charIndex + 1),
          40 + Math.random() * 30,
        );
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setPhase("output"), 400);
        return () => clearTimeout(timer);
      }
    }

    if (phase === "output") {
      if (outputLines.length < seq.output.length) {
        const timer = setTimeout(
          () =>
            setOutputLines([...outputLines, seq.output[outputLines.length]]),
          80,
        );
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setPhase("pause"), 2500);
        return () => clearTimeout(timer);
      }
    }

    if (phase === "pause") {
      const next = (seqIndex + 1) % DEMO_SEQUENCES.length;
      const timer = setTimeout(() => {
        setSeqIndex(next);
        setCharIndex(0);
        setOutputLines([]);
        setPhase("typing");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [phase, charIndex, outputLines, seqIndex, seq]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Terminal window frame */}
      <div className="rounded-xl overflow-hidden border border-[var(--border)] shadow-2xl">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[var(--surface)] border-b border-[var(--border)]">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-xs text-[var(--text-muted)] font-mono">
            claude — ~/projects
          </span>
        </div>

        {/* Terminal body */}
        <div
          ref={termRef}
          className="bg-[#0d0d14] p-6 font-mono text-sm min-h-[320px]"
        >
          {/* Command line */}
          <div className="flex gap-2">
            <span className="text-[var(--accent-green)]">❯</span>
            <span className="text-[var(--text-primary)]">
              claude {seq.command.slice(0, charIndex)}
              {phase === "typing" && (
                <span className="inline-block w-2 h-4 bg-[var(--accent-purple)] animate-pulse ml-0.5 align-middle" />
              )}
            </span>
          </div>

          {/* Output */}
          <div className="mt-3 space-y-0.5">
            {outputLines.map((line, i) => (
              <div key={i} className="text-[var(--text-secondary)]">
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sequence indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {DEMO_SEQUENCES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setSeqIndex(i);
              setCharIndex(0);
              setOutputLines([]);
              setPhase("typing");
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              i === seqIndex
                ? "bg-[var(--accent-purple)] w-6"
                : "bg-[var(--border)] hover:bg-[var(--text-muted)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
