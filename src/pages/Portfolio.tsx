import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Cpu,
  Globe2,
  Layers3,
  Mail,
  MapPin,
  Pause,
  Play,
  Plus,
  Terminal,
  Workflow,
} from "lucide-react";
import { FaGithub as Github, FaLinkedinIn as Linkedin } from "react-icons/fa6";
import { config } from "../config";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import PortfolioTerminal from "../components/PortfolioTerminal";
import ProjectGallery from "../components/ProjectGallery/ProjectGallery";

function SignatureArtwork() {
  return (
    <figure
      className="signature-artwork"
      aria-label="Abstract cobalt ribbon forming an infinity loop, a symbol of continuous learning"
    >
      <div className="artwork-top">
        <span>THE ART OF BUILDING</span>
        <span>NS — 01</span>
      </div>
      <svg
        className="signature-svg"
        viewBox="0 0 460 460"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="ribbon"
            x1="90"
            y1="135"
            x2="358"
            y2="317"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#8b9dfc" />
            <stop offset=".25" stopColor="#3f5fe3" />
            <stop offset=".55" stopColor="#1838b6" />
            <stop offset=".78" stopColor="#617ded" />
            <stop offset="1" stopColor="#1e3ca9" />
          </linearGradient>
          <linearGradient
            id="ribbon-light"
            x1="70"
            y1="170"
            x2="350"
            y2="240"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#c5cdff" stopOpacity=".8" />
            <stop offset=".6" stopColor="#a7b7ff" stopOpacity="0" />
            <stop offset="1" stopColor="#b3c4ff" stopOpacity=".7" />
          </linearGradient>
          <filter
            id="ribbon-shadow"
            x="-50%"
            y="-50%"
            width="200%"
            height="220%"
          >
            <feGaussianBlur stdDeviation="13" />
          </filter>
        </defs>
        <ellipse
          cx="235"
          cy="370"
          rx="118"
          ry="13"
          fill="#1e2a69"
          opacity=".13"
          filter="url(#ribbon-shadow)"
        />
        <g className="ribbon-float">
          <g transform="rotate(-34 230 225)">
            <path
              d="M136 283C47 283 47 166 132 166C198 166 261 283 325 283C410 283 410 166 325 166C260 166 199 283 136 283Z"
              stroke="#182c80"
              strokeWidth="68"
              transform="translate(0 7)"
            />
            <path
              d="M136 283C47 283 47 166 132 166C198 166 261 283 325 283C410 283 410 166 325 166C260 166 199 283 136 283Z"
              stroke="url(#ribbon)"
              strokeWidth="66"
            />
            <path
              d="M136 260C80 260 78 184 132 184C188 184 258 302 325 302C425 302 425 145 325 145"
              stroke="url(#ribbon-light)"
              strokeWidth="1.5"
            />
            <path
              d="M142 300C207 300 263 184 324 184"
              stroke="#b7c5ff"
              strokeOpacity=".5"
              strokeWidth="1"
            />
          </g>
        </g>
        <path
          d="M36 43h15M43.5 35.5v15M409 393h15M416.5 385.5v15"
          stroke="#9b9d98"
          strokeWidth=".8"
        />
      </svg>
      <figcaption>
        <span className="artwork-caption">
          Always curious.
          <br />
          <em>Never standing still.</em>
        </span>
        <span className="artwork-symbol" aria-hidden="true">
          ↗
        </span>
      </figcaption>
      <div className="artwork-note">
        <span className="note-dot" />
        <div>
          Currently exploring<small>Autonomous AI workflows</small>
        </div>
        <Cpu size={18} strokeWidth={1.3} />
      </div>
    </figure>
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
      className="contact-section"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="wrap">
        <div className="section-index">
          <span>05 / SAY HELLO</span>
          <span className="availability">
            <i className="status-dot" /> Open to opportunities
          </span>
        </div>
        <div className="contact-grid">
          <div>
            <h2 id="contact-heading">
              Let’s make
              <br />
              <em>something good.</em>
            </h2>
            <p className="contact-description">
              An interesting challenge. A new collaboration.
              <br />
              Or simply a good conversation. I’m all ears.
            </p>
            <a
              className="contact-email"
              href={`mailto:${config.contact.email}`}
            >
              {config.contact.email}
              <ArrowUpRight size={24} />
            </a>
            <button className="copy-email" type="button" onClick={copyEmail}>
              {copyStatus === "Email copied" ? (
                <Check size={14} />
              ) : (
                <Copy size={14} />
              )}{" "}
              Copy email address
            </button>
            <p className="copy-status" role="status">
              {copyStatus}
            </p>
            <div className="contact-socials">
              <a href={config.contact.github} target="_blank" rel="noreferrer">
                <Github size={17} /> GitHub <ArrowUpRight size={14} />
              </a>
              <a
                href={config.contact.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={17} /> LinkedIn <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
          <form className="contact-form" onSubmit={prepareEmail}>
            <div className="form-top">
              <Mail size={17} />
              <span>A little about your next big idea.</span>
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
              What do you have in mind?
              <textarea
                name="message"
                placeholder="Tell me a little about your project or opportunity…"
                rows={4}
                required
                maxLength={4000}
              />
            </label>
            <button className="button button-primary" type="submit">
              Start a conversation <ArrowUpRight size={19} />
            </button>
            <p className="form-note" role="status">
              {draftReady
                ? "Your draft is ready in your email app. Send it there, or use my email address above."
                : "Opens a draft in your email app. You review and send it there."}
            </p>
          </form>
        </div>
        <div className="contact-signoff">
          <span>GOOD PEOPLE. THOUGHTFUL WORK.</span>
          <span>LET’S SEE WHAT WE CAN BUILD TOGETHER.</span>
        </div>
      </div>
    </section>
  );
}

const expertise = [
  {
    icon: Layers3,
    number: "01",
    title: "Interfaces with intention.",
    subtitle: "Full-stack engineering",
    description:
      "Responsive interfaces, thoughtful interactions, and the APIs and data that bring them to life.",
    tools: ["React", "Next.js", "TypeScript", "JavaScript", "SQL", "Tailwind"],
  },
  {
    icon: Workflow,
    number: "02",
    title: "Intelligence in action.",
    subtitle: "Agentic AI & automation",
    description:
      "Connecting language models, tools, and knowledge into useful workflows that do more than just respond.",
    tools: ["Python", "LangChain", "LangGraph", "RAG", "Flask", "Scikit-learn"],
  },
  {
    icon: Globe2,
    number: "03",
    title: "Built for the real world.",
    subtitle: "Infrastructure & delivery",
    description:
      "Practical foundations for shipping, maintaining, and evolving software with confidence.",
    tools: ["Docker", "Linux", "Git", "GitHub", "Vercel", "REST APIs"],
  },
];

export default function Portfolio() {
  const [active, setActive] = useState("");
  const [motionPaused, setMotionPaused] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: 0 },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((section) => observer.observe(section));
    if (window.location.hash)
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
    return () => observer.disconnect();
  }, []);
  return (
    <div
      className={`portfolio${motionPaused ? " motion-paused" : ""}`}
      id="top"
    >
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader active={active} />
      <main id="main-content">
        <section className="hero wrap" id="home" aria-labelledby="hero-heading">
          <div className="hero-topline">
            <span className="availability">
              <i className="status-dot" /> Available for remote & freelance
            </span>
            <span>
              <MapPin size={13} /> Based in Okara, Pakistan
            </span>
          </div>
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">
                FULL-STACK DEVELOPER & AGENTIC AI ENGINEER
              </p>
              <h1 id="hero-heading">
                Nouman
                <br />
                <em>Sajid.</em>
                <span className="hero-asterisk" aria-hidden="true">
                  ✳
                </span>
              </h1>
              <p className="hero-intro">
                An engineer’s mind.
                <br />
                <span>A builder’s instinct.</span>
              </p>
              <p className="hero-description">
                I turn complex ideas into thoughtful digital experiences — from
                full-stack platforms to intelligent AI agents.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projects">
                  Explore my work <ArrowUpRight size={19} />
                </a>
                <a className="hero-contact-link" href="#contact">
                  Let’s talk <ArrowRight size={17} />
                </a>
              </div>
            </div>
            <SignatureArtwork />
          </div>
          <div className="hero-bottom">
            <a href="#projects">
              <span className="scroll-circle">
                <ArrowDown size={14} />
              </span>{" "}
              A selection of things I’ve built
            </a>
            <span>THOUGHTFUL BY DESIGN. HUMAN AT HEART.</span>
            <button
              type="button"
              onClick={() => setMotionPaused(!motionPaused)}
              aria-pressed={motionPaused}
              aria-label={motionPaused ? "Resume motion" : "Pause motion"}
            >
              {motionPaused ? <Play size={12} /> : <Pause size={12} />}{" "}
              {motionPaused ? "RESUME MOTION" : "PAUSE MOTION"}
            </button>
          </div>
        </section>
        <div className="practice-strip">
          <div className="wrap">
            <span>THE TOOLS BEHIND THE WORK</span>
            <div>
              {[
                "React",
                "Next.js",
                "TypeScript",
                "Python",
                "LangChain",
                "Docker",
              ].map((tech, i) => (
                <span key={tech}>
                  <i aria-hidden="true">
                    {["✳", "N", "TS", "Py", "⌘", "▱"][i]}
                  </i>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
        <section
          className="section wrap projects-section"
          id="projects"
          aria-labelledby="projects-heading"
        >
          <div className="section-index">
            <span>01 / SELECTED WORK</span>
            <span>FROM CONCEPT TO SOMETHING REAL</span>
          </div>
          <div className="section-heading-row">
            <div>
              <h2 id="projects-heading">
                Good ideas deserve
                <br />
                to be <em>well built.</em>
              </h2>
            </div>
            <div className="section-heading-aside">
              <p>
                Web platforms, intelligent agents, and tools
                <br />
                that make the everyday a little better.
              </p>
              <Link className="text-link" to="/myworks">
                The complete collection <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
          <ProjectGallery />
        </section>
        <section
          className="about-section"
          id="about"
          aria-labelledby="about-heading"
        >
          <div className="wrap">
            <div className="section-index">
              <span>02 / A LITTLE ABOUT ME</span>
              <span>BEHIND THE WORK</span>
            </div>
            <div className="about-grid">
              <div className="identity-card">
                <div className="identity-card-top">
                  <span>ALWAYS A STUDENT OF THE CRAFT</span>
                  <Plus size={15} />
                </div>
                <div className="identity-monogram" aria-hidden="true">
                  n<span>s.</span>
                </div>
                <div className="identity-card-bottom">
                  <span>
                    Nouman Sajid<small>Developer. Thinker. Builder.</small>
                  </span>
                  <span className="identity-stamp">
                    MADE
                    <br />
                    IN PK ↗
                  </span>
                </div>
              </div>
              <div className="about-copy">
                <p className="eyebrow">
                  CURIOUS BY NATURE. INTENTIONAL BY CHOICE.
                </p>
                <h2 id="about-heading">
                  I care about how
                  <br />
                  things <em>come together.</em>
                </h2>
                <p className="about-lead">
                  The interface people touch. The systems behind it. And all the
                  little decisions that make a product feel right.
                </p>
                <p>
                  I’m Nouman, a Computer Science student at National Textile
                  University. My work connects full-stack development with
                  agentic AI — bringing thoughtful interfaces and intelligent
                  workflows into the same conversation.
                </p>
                <p>
                  I enjoy making complex things feel simple, learning by
                  building, and giving every detail a reason to be there.
                </p>
                <div className="about-facts">
                  <div>
                    <span>BASED IN</span>
                    <p>Okara, Pakistan</p>
                  </div>
                  <div>
                    <span>EDUCATION</span>
                    <p>BS Computer Science · 2028</p>
                  </div>
                </div>
                <a
                  className="text-link"
                  href="/CV/Nouman_Sajid_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  A closer look at my résumé <ArrowDownToLine size={16} />
                </a>
              </div>
            </div>
            <details className="developer-console">
              <summary>
                <span>
                  <Terminal size={16} /> For the curious minds
                </span>
                <span>
                  Explore the interactive terminal <Plus size={15} />
                </span>
              </summary>
              <PortfolioTerminal />
            </details>
          </div>
        </section>
        <section
          className="section wrap expertise-section"
          id="expertise"
          aria-labelledby="expertise-heading"
        >
          <div className="section-index">
            <span>03 / WHAT I BRING TO THE TABLE</span>
            <span>A CONNECTED WAY OF THINKING</span>
          </div>
          <div className="section-heading-row">
            <h2 id="expertise-heading">
              From the first pixel
              <br />
              to the <em>bigger picture.</em>
            </h2>
            <p className="section-description">
              Different disciplines. One considered approach
              <br />
              to building things that work beautifully.
            </p>
          </div>
          <div className="expertise-list">
            {expertise.map((item) => (
              <article className="expertise-row" key={item.number}>
                <span className="expertise-number">{item.number}</span>
                <div className="expertise-title">
                  <item.icon size={25} strokeWidth={1.3} />
                  <div>
                    <span>{item.subtitle}</span>
                    <h3>{item.title}</h3>
                  </div>
                </div>
                <div className="expertise-detail">
                  <p>{item.description}</p>
                  <div className="tech-list">
                    {item.tools.map((tool) => (
                      <span key={tool}>{tool}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section
          className="experience-section section wrap"
          aria-labelledby="experience-heading"
        >
          <div className="experience-intro">
            <p className="section-index">04 / EXPERIENCE & EDUCATION</p>
            <h2 id="experience-heading">
              Always learning.
              <br />
              <em>Always building.</em>
            </h2>
            <p className="section-description">
              A few chapters from the journey so far.
            </p>
            <a
              className="text-link"
              href="/CV/Nouman_Sajid_Resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              View full résumé <ArrowDownToLine size={16} />
            </a>
          </div>
          <div className="experience-list">
            {config.experiences.map((experience, i) => (
              <article key={experience.company}>
                <div className="experience-top">
                  <span>{experience.company}</span>
                  <span>{experience.period}</span>
                </div>
                <h3>{experience.position}</h3>
                <p>{experience.description}</p>
                <div className="experience-bottom">
                  <span>{experience.location}</span>
                  <span>0{i + 1}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
        <div className="chess-callout wrap">
          <span className="chess-symbol" aria-hidden="true">
            ♞
          </span>
          <div>
            <p className="eyebrow">A LITTLE OFF THE CLOCK</p>
            <h3>Good thinking takes practice.</h3>
            <p>Fancy a game of chess before you go?</p>
          </div>
          <Link className="button button-outline" to="/play">
            Your move <ArrowUpRight size={18} />
          </Link>
        </div>
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
