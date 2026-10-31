import { useState, useEffect, useRef, FormEvent } from "react";
import { 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope, 
  FaXTwitter, 
  FaInstagram 
} from "react-icons/fa6";
import { Brain, MonitorSmartphone, Terminal } from "lucide-react";
import { config } from "../../config";
import ProjectGallery from "../ProjectGallery/ProjectGallery";
import "./MobilePortfolio.css";

const ROLES = [
  "Full-Stack Developer",
  "Agentic AI Engineer",
  "Python Engineer",
  "NTU Student"
];

const LOADER_STAGES = [
  "INITIALIZING QUANTUM CORE",
  "SYNCHRONIZING PYTHON & AI AGENTS",
  "COMPILING FULL-STACK ARCHITECTURE",
  "LAUNCHING NOUMAN PORTFOLIO"
];

const MobilePortfolio = () => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [typedText, setTypedText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [loaderExiting, setLoaderExiting] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [scrambledTitle, setScrambledTitle] = useState<string>("NOUMAN PORTFOLIO");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formSent, setFormSent] = useState(false);

  // High-frame-rate 3D Warp & Neural Particle Canvas + Progress Choreography
  useEffect(() => {
    if (!loading) return;

    let animationFrameId: number;
    let startTime: number | null = null;
    const duration = 2900; // 2.9s smooth build-up + 0.75s cinematic exit
    const targetTitle = "NOUMAN PORTFOLIO";
    const glyphs = "01</>A∑∆Ω#X*+";

    // Canvas setup for 3D warp starfield & neural energy lines
    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext("2d") : null;
    let width = (canvas && (canvas.width = window.innerWidth)) || window.innerWidth;
    let height = (canvas && (canvas.height = window.innerHeight)) || window.innerHeight;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    interface Star {
      x: number;
      y: number;
      z: number;
      pz: number;
      color: string;
    }

    const colors = ["#c084fc", "#38bdf8", "#f472b6", "#818cf8", "#34d399"];
    const stars: Star[] = Array.from({ length: 140 }, () => ({
      x: (Math.random() - 0.5) * width * 2,
      y: (Math.random() - 0.5) * height * 2,
      z: Math.random() * width,
      pz: 0,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const rawRatio = Math.min(elapsed / duration, 1);
      // Smooth cubic ease-in-out curve with dramatic acceleration at the end
      const eased =
        rawRatio < 0.5
          ? 4 * rawRatio * rawRatio * rawRatio
          : 1 - Math.pow(-2 * rawRatio + 2, 3) / 2;

      const currentProgress = Math.min(100, Math.floor(eased * 100));
      setProgress(currentProgress);

      // Cryptographic text decode effect for title
      const revealCount = Math.floor(rawRatio * 1.25 * targetTitle.length);
      const nextTitle = targetTitle
        .split("")
        .map((ch, idx) => {
          if (ch === " ") return " ";
          if (idx < revealCount) return ch;
          return glyphs[Math.floor((timestamp / 40 + idx * 7) % glyphs.length)];
        })
        .join("");
      setScrambledTitle(nextTitle);

      // Render 3D Warp Field on Canvas
      if (ctx && canvas) {
        ctx.fillStyle = "rgba(5, 5, 8, 0.28)";
        ctx.fillRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height / 2;
        // Warp speed accelerates exponentially as progress nears 100%
        const speed = 6 + eased * 38 + (rawRatio > 0.88 ? (rawRatio - 0.88) * 180 : 0);

        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          s.pz = s.z;
          s.z -= speed;

          if (s.z <= 1) {
            s.z = width;
            s.pz = width;
            s.x = (Math.random() - 0.5) * width * 2;
            s.y = (Math.random() - 0.5) * height * 2;
          }

          const sx = cx + (s.x / s.z) * (width * 0.55);
          const sy = cy + (s.y / s.z) * (width * 0.55);
          const px = cx + (s.x / s.pz) * (width * 0.55);
          const py = cy + (s.y / s.pz) * (width * 0.55);

          const alpha = Math.min(1, (1 - s.z / width) * 1.2);
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(sx, sy);
          ctx.strokeStyle = s.color;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = Math.max(0.8, (1 - s.z / width) * 2.8);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      if (rawRatio < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setProgress(100);
        setScrambledTitle(targetTitle);
        setLoaderExiting(true);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    const finishTimer = setTimeout(() => {
      setLoading(false);
    }, duration + 780);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(finishTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [loading]);

  // Typewriter Effect
  useEffect(() => {
    if (loading) return;
    let isMounted = true;
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let timerId: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (!isMounted) return;
      const currentRole = ROLES[currentRoleIndex];

      if (isDeleting) {
        currentCharIndex--;
      } else {
        currentCharIndex++;
      }

      setTypedText(currentRole.substring(0, currentCharIndex));

      let delay = 100;
      if (isDeleting) {
        delay /= 2;
      }

      if (!isDeleting && currentCharIndex === currentRole.length) {
        delay = 1500;
        isDeleting = true;
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % ROLES.length;
        delay = 500;
      }

      timerId = setTimeout(tick, delay);
    };

    tick();

    return () => {
      isMounted = false;
      clearTimeout(timerId);
    };
  }, [loading]);

  // Handle intersection observer for section highlighting
  useEffect(() => {
    if (loading) return;
    const sections = ["home", "about", "projects", "services", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, [loading]);

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setFormSent(true);
      setTimeout(() => {
        setName("");
        setEmail("");
        setMessage("");
        setFormSent(false);
      }, 3000);
    }
  };

  const stageIndex = Math.min(
    LOADER_STAGES.length - 1,
    Math.floor((progress / 100) * LOADER_STAGES.length)
  );

  return (
    <div id="main-mobile-portfolio">
      {loading && (
        <div
          id="loading-screen"
          className={loaderExiting ? "loader-exit-active" : ""}
          aria-label="Loading Nouman Portfolio"
        >
          {/* Shutter panels for cinematic split reveal */}
          <div className="loader-shutter loader-shutter-top" />
          <div className="loader-shutter loader-shutter-bottom" />

          {/* 60fps 3D Starfield Warp Canvas */}
          <canvas ref={canvasRef} className="loader-warp-canvas" />

          {/* Ambient aurora & cyber grid */}
          <div className="loader-cyber-grid" />
          <div className="loader-aurora-glow" />

          <div className={`loading-content ${loaderExiting ? "content-hyperjump" : ""}`}>
            {/* 3D Gyroscopic Quantum Core */}
            <div className="quantum-core-stage">
              <div className="quantum-shockwave" />
              <div className="quantum-shockwave shockwave-delay" />
              <div className="gyro-ring gyro-ring-1" />
              <div className="gyro-ring gyro-ring-2" />
              <div className="gyro-ring gyro-ring-3" />

              {/* SVG Precision Progress Ring */}
              <svg className="quantum-svg-ring" viewBox="0 0 140 140">
                <defs>
                  <linearGradient id="quantumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c084fc" />
                    <stop offset="50%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#f472b6" />
                  </linearGradient>
                </defs>
                <circle
                  className="quantum-ring-track"
                  cx="70"
                  cy="70"
                  r="58"
                />
                <circle
                  className="quantum-ring-progress"
                  cx="70"
                  cy="70"
                  r="58"
                  style={{
                    strokeDashoffset: 364.4 - (364.4 * progress) / 100
                  }}
                />
              </svg>

              {/* Glowing Center Emblem */}
              <div className="main-icon-container">
                <div className="core-inner-plasma" />
                <div className="code-icon">{"</>"}</div>
              </div>
            </div>

            {/* Live Big Telemetry Counter */}
            <div className="loader-counter-wrap">
              <span className="loader-counter-num">
                {String(progress).padStart(2, "0")}
              </span>
              <span className="loader-counter-pct">%</span>
            </div>

            {/* Cryptographic Decode Title */}
            <h1 className="loading-title" data-text={scrambledTitle}>
              {scrambledTitle}
            </h1>

            <h2 className="designer-tag">
              <span className="designer-tag-dot" />
              Developed by Nouman
            </h2>

            {/* Laser Progress Track */}
            <div className="loader-laser-bar">
              <div
                className="loader-laser-fill"
                style={{ width: `${progress}%` }}
              >
                <span className="loader-laser-spark" />
              </div>
            </div>

            <div className="loader-telemetry-status">
              {LOADER_STAGES[stageIndex]}
            </div>

            {/* Igniting Skill Badges */}
            <div className="sub-icons">
              <div className={`icon-badge ${progress >= 20 ? "badge-ignited" : ""}`}>
                <span className="badge-pulse-dot" />
                Python
              </div>
              <div className={`icon-badge ${progress >= 52 ? "badge-ignited" : ""}`}>
                <span className="badge-pulse-dot" />
                Full-Stack
              </div>
              <div className={`icon-badge ${progress >= 82 ? "badge-ignited" : ""}`}>
                <span className="badge-pulse-dot" />
                Agentic AI
              </div>
            </div>
          </div>
        </div>
      )}
      <header className="mobile-header">
        <nav className="mobile-nav">
          <ul className="mobile-nav-list">
            <li className={activeSection === "home" ? "active" : ""}>
              <button onClick={() => handleNavClick("home")}>Home</button>
            </li>
            <li className={activeSection === "about" ? "active" : ""}>
              <button onClick={() => handleNavClick("about")}>About</button>
            </li>
            <li className={activeSection === "projects" ? "active" : ""}>
              <button onClick={() => handleNavClick("projects")}>Projects</button>
            </li>
            <li className={activeSection === "services" ? "active" : ""}>
              <button onClick={() => handleNavClick("services")}>Services</button>
            </li>
            <li className={activeSection === "contact" ? "active" : ""}>
              <button onClick={() => handleNavClick("contact")}>Contact</button>
            </li>
          </ul>
        </nav>
      </header>

      {/* HOME SECTION */}
      <section className="mobile-home-section" id="home">
        <div className="status-badge">
          <span className="status-dot"></span> Available for freelance work
        </div>
        <div className="hero-text">
          <h1>Hi, I'm {config.developer.name}</h1>
          <h3 className="typewriter-container">
            {typedText}
            <span className="cursor-blink">|</span>
          </h3>
          <p className="description-para">
            {config.developer.description}
          </p>
          <div className="location-info">
            <span>📍 {config.social.location}</span>
          </div>
          <div className="button-group">
            <a href="mailto:noumansajid623@gmail.com" className="btn-hire">Hire Me</a>
            <a href="/CV/Nouman_Sajid_Resume.pdf?v=3" className="btn-cv" target="_blank" rel="noreferrer">View CV</a>
          </div>
          <hr className="divider" />
          <div className="follow-socials">
            <span className="follow-label">Follow me:</span>
            <ul className="social-links-list">
              <li>
                <a 
                  href={config.contact.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="social-btn github"
                >
                  <FaGithub className="social-btn-icon" />
                  <span className="social-btn-text">GitHub</span>
                </a>
              </li>
              <li>
                <a 
                  href={config.contact.linkedin} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="social-btn linkedin"
                >
                  <FaLinkedin className="social-btn-icon" />
                  <span className="social-btn-text">LinkedIn</span>
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${config.contact.email}`} 
                  className="social-btn email"
                >
                  <FaEnvelope className="social-btn-icon" />
                  <span className="social-btn-text">Email</span>
                </a>
              </li>
              {config.contact.twitter && (
                <li>
                  <a 
                    href={config.contact.twitter} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="social-btn twitter"
                  >
                    <FaXTwitter className="social-btn-icon" />
                    <span className="social-btn-text">Twitter</span>
                  </a>
                </li>
              )}
              {config.contact.instagram && (
                <li>
                  <a 
                    href={config.contact.instagram} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="social-btn instagram"
                  >
                    <FaInstagram className="social-btn-icon" />
                    <span className="social-btn-text">Instagram</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="mobile-about-section" id="about">
        <p className="section-subtitle">ABOUT ME</p>
        <h2 className="section-title">Building Intelligent Digital Experiences</h2>
        <hr className="section-divider" />
        <div className="about-details">
          <p>
            I am a Computer Science student at National Textile University (graduating in 2028), specializing in Full-Stack Development and Agentic AI.
          </p>
          <p>
            By bridging Python-based engineering with React frontend development, I build clean, high-performance web applications with smooth user experiences.
          </p>
          <div className="info-cards">
            <div className="about-card full-width-card">
              <h3>{config.skills.develop.title}</h3>
              <p className="about-card-desc">{config.skills.develop.description}</p>
              <div className="skill-pills">
                {config.skills.develop.tools.map((tool, idx) => (
                  <span key={idx} className="skill-pill">{tool}</span>
                ))}
              </div>
            </div>
            <div className="about-card full-width-card">
              <h3>{config.skills.design.title}</h3>
              <p className="about-card-desc">{config.skills.design.description}</p>
              <div className="skill-pills">
                {config.skills.design.tools.map((tool, idx) => (
                  <span key={idx} className="skill-pill">{tool}</span>
                ))}
              </div>
            </div>
            <div className="about-card full-width-card">
              <h3>🎓 Education</h3>
              <p className="about-card-desc">BS Computer Science, NTU (2024-2028)</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section className="mobile-projects-section" id="projects">
        <p className="section-subtitle">PROJECTS</p>
        <h2 className="section-title">Featured Work</h2>
        <hr className="section-divider" />
        <p className="projects-intro-desc">
          A showcase of my recent projects demonstrating expertise in full-stack development, modern frameworks, and artificial intelligence.
        </p>
        <ProjectGallery />
      </section>

      {/* SERVICES SECTION */}
      <section className="mobile-services-section" id="services">
        <div className="section-header">
          <p className="section-subtitle">SERVICES</p>
          <h2 className="section-title">My Expertise</h2>
          <hr className="section-divider" />
        </div>
        <div className="services-grid">
          <div className="mobile-service-card">
            <div className="service-icon"><Brain size={36} strokeWidth={1.5} /></div>
            <h3>Agentic AI Engineer</h3>
            <p>
              Designing intelligent, autonomous agents and orchestrating LLM workflows using advanced prompt engineering and tool usage.
            </p>
          </div>
          <div className="mobile-service-card">
            <div className="service-icon"><MonitorSmartphone size={36} strokeWidth={1.5} /></div>
            <h3>Full-Stack Development</h3>
            <p>
              Building responsive, high-performance, and pixel-perfect applications using React, Next.js, and modern CSS.
            </p>
          </div>
          <div className="mobile-service-card">
            <div className="service-icon"><Terminal size={36} strokeWidth={1.5} /></div>
            <h3>Automation & Scripting</h3>
            <p>
              Writing advanced Python scripts, scrapers, API pipelines, and GUI applications to automate workflows.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="mobile-contact-section" id="contact">
        <p className="section-subtitle">CONTACT</p>
        <h2 className="section-title">Get In Touch</h2>
        <hr className="section-divider" />
        <div className="contact-container">
          <div className="contact-details-box">
            <h3>Let's Collaborate</h3>
            <p>Have an exciting project or idea? Feel free to reach out. I am available for opportunities and freelance work.</p>
            <div className="contact-item">
              <span className="contact-label">Email:</span>
              <a href={`mailto:${config.contact.email}`} className="contact-value">
                <FaEnvelope style={{ marginRight: "6px", verticalAlign: "middle" }} />
                {config.contact.email}
              </a>
            </div>
            <div className="contact-item">
              <span className="contact-label">Location:</span>
              <span className="contact-value">📍 {config.social.location}</span>
            </div>
            <div className="contact-item">
              <span className="contact-label">Profiles:</span>
              <div className="contact-social-icons">
                <a href={config.contact.github} target="_blank" rel="noreferrer" className="contact-social-btn github" title="GitHub">
                  <FaGithub />
                </a>
                <a href={config.contact.linkedin} target="_blank" rel="noreferrer" className="contact-social-btn linkedin" title="LinkedIn">
                  <FaLinkedin />
                </a>
                {config.contact.twitter && (
                  <a href={config.contact.twitter} target="_blank" rel="noreferrer" className="contact-social-btn twitter" title="Twitter">
                    <FaXTwitter />
                  </a>
                )}
                {config.contact.instagram && (
                  <a href={config.contact.instagram} target="_blank" rel="noreferrer" className="contact-social-btn instagram" title="Instagram">
                    <FaInstagram />
                  </a>
                )}
              </div>
            </div>
          </div>
          <form className="mobile-contact-form" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Your Message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn-send">
              {formSent ? "Message Sent!" : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      <footer className="mobile-footer">
        <p>© {new Date().getFullYear()} Nouman Sajid. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MobilePortfolio;
