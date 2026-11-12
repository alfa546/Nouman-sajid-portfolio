import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  CheckCheck,
  Copy,
  Cpu,
  Globe2,
  Layers3,
  Mail,
  MapPin,
  MoveUpRight,
  Pause,
  Play,
  Terminal,
  Workflow,
} from "lucide-react";
import { FaGithub as Github, FaLinkedinIn as Linkedin } from "react-icons/fa6";
import { config } from "../config";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import PortfolioTerminal from "../components/PortfolioTerminal";
import ProjectGallery from "../components/ProjectGallery/ProjectGallery";

function OrbitalGraphic() {
  return (
    <div className="orbital" aria-hidden="true">
      <div className="orbital-label orbital-label-top">
        <span className="live-dot" /> ENGINEERING THE NEXT
      </div>
      <svg className="orbital-svg" viewBox="0 0 560 560" fill="none">
        <defs>
          <radialGradient id="orb-glow">
            <stop stopColor="#84f5ae" stopOpacity=".16" />
            <stop offset="1" stopColor="#76e9a4" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id="orb-stroke"
            x1="100"
            y1="80"
            x2="460"
            y2="470"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#b8ffbb" />
            <stop offset=".5" stopColor="#56c888" stopOpacity=".25" />
            <stop offset="1" stopColor="#91ffc4" />
          </linearGradient>
        </defs>
        <circle cx="280" cy="280" r="270" fill="url(#orb-glow)" />
        <g stroke="#294236" strokeWidth=".7">
          <path d="M280 15v530M15 280h530" strokeDasharray="3 7" />
          <circle cx="280" cy="280" r="235" strokeDasharray="1 10" />
          <circle cx="280" cy="280" r="205" />
          <circle cx="280" cy="280" r="168" strokeDasharray="3 5" />
          <path d="M95 95l370 370M95 465L465 95" strokeDasharray="2 9" />
        </g>
        <g className="orbit-rotation" stroke="url(#orb-stroke)">
          <ellipse
            cx="280"
            cy="280"
            rx="205"
            ry="74"
            transform="rotate(-32 280 280)"
          />
          <ellipse
            cx="280"
            cy="280"
            rx="205"
            ry="74"
            transform="rotate(32 280 280)"
          />
          <ellipse cx="280" cy="280" rx="90" ry="205" />
          <circle
            cx="280"
            cy="280"
            r="205"
            strokeDasharray="90 1198"
            strokeWidth="3"
          />
          <circle cx="451" cy="167" r="5" fill="#a8ffbd" stroke="none" />
          <circle cx="103" cy="383" r="4" fill="#a8ffbd" stroke="none" />
        </g>
        <g stroke="#558367" strokeWidth="1">
          <path d="M63 170v-12h12M485 158h12v12M63 390v12h12M485 402h12v-12" />
        </g>
        <circle cx="280" cy="280" r="83" fill="#0a1711" stroke="#365a43" />
        <circle
          cx="280"
          cy="280"
          r="72"
          stroke="#88eda5"
          strokeOpacity=".2"
          strokeDasharray="2 6"
        />
        <path
          d="M248 309v-58h13l38 40v-40h13v58h-13l-38-40v40h-13Z"
          fill="#c9fbd6"
        />
        <path d="M320 303h7v7h-7z" fill="#8cf2a7" />
        <path d="M219 491h122M219 69h122" stroke="#34513f" />
        <text
          x="280"
          y="55"
          fill="#6c8d77"
          fontSize="9"
          textAnchor="middle"
          fontFamily="monospace"
          letterSpacing="3"
        >
          IDEA → SYSTEM → IMPACT
        </text>
      </svg>
      <div className="orbit-tag tag-ai">
        <Cpu size={15} />
        <span>
          Agentic AI<small>INTELLIGENT BY DESIGN</small>
        </span>
      </div>
      <div className="orbit-tag tag-code">
        <Braces size={15} />
        <span>
          Full-stack<small>BUILT TO CONNECT</small>
        </span>
      </div>
      <div className="orbital-label orbital-label-bottom">
        <span>01 / ALWAYS BUILDING</span>
        <span>∞ POSSIBILITIES</span>
      </div>
    </div>
  );
}

function Contact() {
  const [copyStatus, setCopyStatus] = useState("");
  const [draftReady, setDraftReady] = useState(false);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(config.contact.email);
      setCopyStatus("Email copied");
    } catch {
      setCopyStatus(`Copy this address: ${config.contact.email}`);
    }
  }
  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `Portfolio enquiry from ${data.get("name")}`;
    const body = `Hi Nouman,\n\n${data.get("message")}\n\n${data.get("name")}\nReply to: ${data.get("email")}`;
    window.location.href = `mailto:${config.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setDraftReady(true);
  }
  return (
    <section
      className="contact-section section wrap"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="section-index">
        <span>04 / ESTABLISH CONNECTION</span>
        <span className="live-status">
          <i className="live-dot" /> OPEN TO OPPORTUNITIES
        </span>
      </div>
      <div className="contact-grid">
        <div>
          <h2 id="contact-heading">
            Great things start
            <br />
            with a <em>conversation.</em>
          </h2>
          <p className="section-description">
            Have an ambitious idea, an interesting challenge, or a role in mind?
            Let’s build something that matters.
          </p>
          <a className="contact-email" href={`mailto:${config.contact.email}`}>
            {config.contact.email}
            <ArrowUpRight size={22} />
          </a>
          <button className="copy-email" type="button" onClick={copyEmail}>
            {copyStatus === "Email copied" ? (
              <Check size={13} />
            ) : (
              <Copy size={13} />
            )}{" "}
            Copy email address
          </button>
          <p className="copy-status" role="status">
            {copyStatus}
          </p>
          <div className="contact-socials">
            <a href={config.contact.github} target="_blank" rel="noreferrer">
              <Github size={17} /> GitHub <ArrowUpRight size={13} />
            </a>
            <a href={config.contact.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={17} /> LinkedIn <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
        <form className="contact-form" onSubmit={prepareEmail}>
          <div className="form-top">
            <Mail size={16} />
            <span>LET’S TALK ABOUT YOUR NEXT PROJECT</span>
          </div>
          <div className="form-row">
            <label>
              Your name
              <input
                name="name"
                placeholder="Alex Morgan"
                autoComplete="name"
                required
                maxLength={100}
              />
            </label>
            <label>
              Email address
              <input
                name="email"
                type="email"
                placeholder="alex@company.com"
                autoComplete="email"
                required
                maxLength={254}
              />
            </label>
          </div>
          <label>
            What are you thinking?
            <textarea
              name="message"
              placeholder="A little about your project, idea, or opportunity…"
              rows={4}
              required
              maxLength={4000}
            />
          </label>
          <button className="button button-primary" type="submit">
            Let’s start a conversation <ArrowUpRight size={18} />
          </button>
          <p className="form-note" role="status">
            {draftReady
              ? "Your email draft is ready in your mail app. Send it there, or email me directly above."
              : "Opens a draft in your email app. Your message stays with you until you send it."}
          </p>
        </form>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("");
  const [motionPaused, setMotionPaused] = useState(false);
  useEffect(() => {
    const sections = document.querySelectorAll("main > section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    if (window.location.hash)
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
    return () => observer.disconnect();
  }, []);
  return (
    <div
      className={`cyber-portfolio${motionPaused ? " motion-paused" : ""}`}
      id="top"
    >
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader active={active} />
      <main id="main-content">
        <section className="hero wrap" id="home" aria-labelledby="hero-heading">
          <div className="hero-topline">
            <span>
              <span className="live-dot" /> AVAILABLE FOR REMOTE & FREELANCE
            </span>
            <span className="hero-location">
              <MapPin size={12} /> OKARA, PAKISTAN{" "}
              <span className="timezone">/ UTC +05:00</span>
            </span>
          </div>
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">
                <span>HELLO, WORLD.</span> I’M NOUMAN SAJID
              </p>
              <h1 id="hero-heading">
                I build systems.
                <br />
                <span>That think.</span>
                <br />
                And make <em>impact.</em>
              </h1>
              <p className="hero-description">
                Full-stack developer & agentic AI engineer.
                <br />
                Turning complex problems into intelligent, intuitive digital
                experiences.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projects">
                  Explore my work <ArrowUpRight size={18} />
                </a>
                <a className="button button-ghost" href="#contact">
                  Let’s connect <ArrowRight size={17} />
                </a>
              </div>
              <div className="hero-socials">
                <a
                  href={config.contact.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Nouman on GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href={config.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Nouman on LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href={`mailto:${config.contact.email}`}
                  aria-label="Email Nouman"
                >
                  <Mail size={18} />
                </a>
                <span>GOOD CODE. REAL-WORLD IMPACT.</span>
              </div>
            </div>
            <div className="hero-visual">
              <OrbitalGraphic />
              <PortfolioTerminal />
            </div>
          </div>
          <div className="hero-bottom">
            <a href="#about">
              <span className="scroll-icon">
                <ArrowDown size={13} />
              </span>{" "}
              SCROLL TO EXPLORE
            </a>
            <span>CRAFTED WITH LOGIC. DRIVEN BY CURIOSITY.</span>
            <button
              type="button"
              onClick={() => setMotionPaused(!motionPaused)}
              aria-pressed={motionPaused}
            >
              {motionPaused ? <Play size={11} /> : <Pause size={11} />}
              {motionPaused ? "RESUME MOTION" : "PAUSE MOTION"}
            </button>
          </div>
        </section>
        <div className="stack-strip">
          <div className="wrap">
            <span>MY EVERYDAY TOOLKIT</span>
            {[
              "React",
              "Next.js",
              "TypeScript",
              "Python",
              "LangChain",
              "Docker",
            ].map((tech, i) => (
              <span className="stack-item" key={tech}>
                <span aria-hidden="true">
                  {["✳", "N", "TS", "Py", "⌘", "▧"][i]}
                </span>
                {tech}
              </span>
            ))}
          </div>
        </div>
        <section
          className="section wrap about-section"
          id="about"
          aria-labelledby="about-heading"
        >
          <div className="section-index">
            <span>01 / THE PERSON BEHIND THE CODE</span>
            <span>CURIOUS BY DEFAULT</span>
          </div>
          <div className="about-grid">
            <div>
              <h2 id="about-heading">
                A builder’s mindset.
                <br />
                An engineer’s <em>precision.</em>
              </h2>
              <p className="section-description">
                I’m Nouman, a Computer Science student at National Textile
                University, connecting thoughtful interfaces with powerful
                systems.
              </p>
              <p className="about-copy">
                My work lives at the intersection of full-stack development and
                agentic AI. From responsive web platforms to autonomous
                workflows, I enjoy turning the complicated into something
                useful, clear, and a pleasure to use.
              </p>
              <a
                className="text-link"
                href="/CV/Nouman_Sajid_Resume.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Get to know my background <ArrowDownToLine size={15} />
              </a>
            </div>
            <div className="profile-file">
              <div className="profile-file-header">
                <span>
                  <Terminal size={14} /> developer.json
                </span>
                <span>PERSONAL PROFILE</span>
              </div>
              <div className="profile-code">
                <span className="code-punctuation">{"{"}</span>
                {[
                  ["name", "Nouman Sajid"],
                  ["focus", "Full-Stack + Agentic AI"],
                  ["education", "BS Computer Science · NTU"],
                  ["graduation", "2028"],
                  ["location", "Okara, Pakistan"],
                  ["mindset", "Learn. Build. Iterate."],
                ].map(([key, value], i) => (
                  <div key={key}>
                    <span className="line-number">0{i + 2}</span>
                    <span className="code-key">"{key}"</span>
                    <span>: </span>
                    <span className="code-value">"{value}"</span>
                    {i < 5 ? "," : ""}
                  </div>
                ))}
                <span className="code-punctuation">{"}"}</span>
              </div>
              <div className="profile-file-footer">
                <CheckCheck size={14} /> Always a work in progress. Always
                moving forward.
              </div>
            </div>
          </div>
        </section>
        <section
          className="section wrap projects-section"
          id="projects"
          aria-labelledby="projects-heading"
        >
          <div className="section-index">
            <span>02 / SELECTED WORK</span>
            <span>IDEAS, BROUGHT TO LIFE</span>
          </div>
          <div className="section-heading-row">
            <div>
              <h2 id="projects-heading">
                Less talk.
                <br />
                More <em>built.</em>
              </h2>
              <p className="section-description">
                A selection of things I’ve designed, engineered, and put into
                the world.
              </p>
            </div>
            <Link className="text-link" to="/myworks">
              Explore all projects <ArrowUpRight size={16} />
            </Link>
          </div>
          <ProjectGallery />
        </section>
        <section
          className="section wrap expertise-section"
          id="expertise"
          aria-labelledby="expertise-heading"
        >
          <div className="section-index">
            <span>03 / TOOLS OF THE TRADE</span>
            <span>THE RIGHT TOOL. THE RIGHT REASON.</span>
          </div>
          <div className="section-heading-row">
            <div>
              <h2 id="expertise-heading">
                Built across the stack.
                <br />
                <em>Connected by intelligence.</em>
              </h2>
            </div>
            <p className="section-description">
              From the first pixel to the last API call.
              <br />I connect the pieces that make a product work.
            </p>
          </div>
          <div className="expertise-grid">
            {[
              {
                icon: Layers3,
                number: "01",
                title: "Full-stack engineering",
                description:
                  "Fast, responsive interfaces backed by dependable APIs and thoughtfully structured data.",
                tools: [
                  "React",
                  "Next.js",
                  "TypeScript",
                  "JavaScript",
                  "SQL",
                  "Tailwind",
                ],
              },
              {
                icon: Workflow,
                number: "02",
                title: "Agentic AI & automation",
                description:
                  "Intelligent workflows that connect language models, tools, and knowledge to get things done.",
                tools: [
                  "Python",
                  "LangChain",
                  "LangGraph",
                  "RAG",
                  "Flask",
                  "Scikit-learn",
                ],
              },
              {
                icon: Globe2,
                number: "03",
                title: "Infrastructure & delivery",
                description:
                  "Practical foundations for deploying, maintaining, and evolving applications with confidence.",
                tools: [
                  "Docker",
                  "Linux",
                  "Git",
                  "GitHub",
                  "Vercel",
                  "REST APIs",
                ],
              },
            ].map((item) => (
              <article className="expertise-card" key={item.number}>
                <div className="expertise-card-top">
                  <item.icon size={27} strokeWidth={1.2} />
                  <span>/{item.number}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="tech-list">
                  {item.tools.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="experience-heading">
            <h3>
              The journey so far<span> / EXPERIENCE & EDUCATION</span>
            </h3>
          </div>
          <div className="experience-list">
            {config.experiences.map((experience, i) => (
              <article key={experience.company}>
                <span className="experience-number">0{i + 1}</span>
                <div>
                  <h4>{experience.position}</h4>
                  <p>
                    {experience.company}
                    <span> · {experience.location}</span>
                  </p>
                </div>
                <p className="experience-description">
                  {experience.description}
                </p>
                <span className="experience-period">{experience.period}</span>
              </article>
            ))}
          </div>
        </section>
        <div className="chess-callout wrap">
          <div className="chess-symbol" aria-hidden="true">
            ♞
          </div>
          <div>
            <span className="eyebrow">OFF THE CLOCK. STILL THINKING.</span>
            <h3>Your next move?</h3>
            <p>
              Good engineering takes strategy. So does a good game of chess.
            </p>
          </div>
          <Link className="button button-outline" to="/play">
            Challenge the engine <MoveUpRight size={16} />
          </Link>
        </div>
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
