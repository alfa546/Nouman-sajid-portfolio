import { useEffect, useRef, useState, type FormEvent } from "react";
import { CornerDownLeft, Terminal } from "lucide-react";
import { config } from "../config";

const responses: Record<string, string> = {
  help: "Available commands: whoami, skills, projects, contact, education, clear. Tip: press / anywhere to focus this terminal.",
  whoami: `${config.developer.fullName}\nFull-Stack Developer & Agentic AI Engineer\n${config.social.location} · Open to remote opportunities`,
  skills:
    "frontend → React / Next.js / TypeScript\nintelligence → Python / LangChain / LangGraph / RAG\ninfrastructure → Docker / Linux / SQL / Git",
  projects: config.projects
    .map((project, i) => `0${i + 1}  ${project.title} — ${project.category}`)
    .join("\n"),
  contact: `${config.contact.email}\ngithub.com/${config.social.github}\nUse the contact section below to start a conversation.`,
  education:
    "BS Computer Science · National Textile University\n2024–2028 · Full-Stack Development & Agentic AI",
};

export default function PortfolioTerminal() {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<{ command: string; output: string }[]>(
    [],
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const focusTerminal = (event: KeyboardEvent) => {
      const element = event.target as HTMLElement;
      if (
        event.key === "/" &&
        !element.closest("input, textarea, select, [contenteditable]")
      ) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", focusTerminal);
    return () => window.removeEventListener("keydown", focusTerminal);
  }, []);
  useEffect(() => {
    if (outputRef.current)
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [history]);
  function run(value: string) {
    const normalized = value.trim().toLowerCase();
    if (!normalized) return;
    if (normalized === "clear") setHistory([]);
    else
      setHistory((previous) => [
        ...previous.slice(-19),
        {
          command: value.trim(),
          output:
            responses[normalized] ??
            `Command not found: ${value.trim()}. Type help for available commands.`,
        },
      ]);
    setCommand("");
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    run(command);
  }
  return (
    <div className="portfolio-terminal" id="terminal">
      <div className="terminal-title">
        <div className="window-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <span>
          <Terminal size={12} /> nouman@portfolio: ~
        </span>
        <span className="terminal-shell">bash</span>
      </div>
      <div
        className="terminal-output"
        ref={outputRef}
        role="log"
        aria-label="Portfolio terminal output"
        tabIndex={0}
      >
        <p className="terminal-comment">
          # A little curiosity goes a long way.
        </p>
        <p>
          <span className="terminal-prompt">➜ ~ </span>whoami
        </p>
        <p>Full-stack developer. AI engineer. Relentless builder.</p>
        {history.map((entry, i) => (
          <div key={i}>
            <p>
              <span className="terminal-prompt">➜ ~ </span>
              {entry.command}
            </p>
            <p className="terminal-response">{entry.output}</p>
          </div>
        ))}
      </div>
      <form className="terminal-form" onSubmit={submit}>
        <span className="terminal-prompt" aria-hidden="true">
          ➜ ~
        </span>
        <label className="sr-only" htmlFor="terminal-command">
          Terminal command
        </label>
        <input
          id="terminal-command"
          ref={inputRef}
          value={command}
          onChange={(event) => setCommand(event.target.value)}
          placeholder="Type help to explore…"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          maxLength={100}
        />
        <button type="submit" aria-label="Run command">
          <CornerDownLeft size={15} />
        </button>
      </form>
      <div className="terminal-shortcuts">
        <span>TRY</span>
        {["skills", "projects", "contact"].map((item) => (
          <button key={item} type="button" onClick={() => run(item)}>
            {item}
          </button>
        ))}
        <kbd>/</kbd>
      </div>
    </div>
  );
}
