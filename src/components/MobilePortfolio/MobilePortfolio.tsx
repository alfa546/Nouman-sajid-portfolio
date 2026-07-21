import { useState, useEffect, FormEvent } from "react";
import { config } from "../../config";
import "./MobilePortfolio.css";

const MobilePortfolio = () => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [typedText, setTypedText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // Typewriter roles
  const roles = [
    "AI & ML Specialist",
    "Full-Stack Developer",
    "Python Engineer",
    "NTU Student"
  ];

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formSent, setFormSent] = useState(false);

  // Loading screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  // Typewriter Effect
  useEffect(() => {
    if (loading) return;
    let isMounted = true;
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let timerId: any;

    const tick = () => {
      if (!isMounted) return;
      const currentRole = roles[currentRoleIndex];

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
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
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

  if (loading) {
    return (
      <div id="loading-screen">
        <div className="loading-content">
          <div className="main-icon-container animate-fall">
            <span className="code-icon">{"</>"}</span>
          </div>
          <h1 className="loading-title animate-fall-delay1">NOUMAN PORTFOLIO</h1>
          <div className="sub-icons animate-fall-delay2">
            <span className="icon-badge">Python</span>
            <span className="icon-badge">AI/ML</span>
            <span className="icon-badge">React</span>
          </div>
          <h2 className="designer-tag animate-fall-delay3">Developed by Nouman</h2>
        </div>
      </div>
    );
  }

  return (
    <div id="main-mobile-portfolio">
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
            <a href="/CV/Nouman_Sajid_Resume.pdf" className="btn-cv" download>Download CV</a>
          </div>
          <hr className="divider" />
          <div className="follow-socials">
            <span className="follow-label">Follow me:</span>
            <ul className="social-links-list">
              <li>
                <a href={config.contact.github} target="_blank" rel="noreferrer">GitHub</a>
              </li>
              <li>
                <a href={config.contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              </li>
              <li>
                <a href={`mailto:${config.contact.email}`}>Email</a>
              </li>
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
            I am a Computer Science student at National Textile University (graduating in 2028), specializing in Artificial Intelligence and Machine Learning.
          </p>
          <p>
            By bridging Python-based ML engineering with React frontend development, I build clean, high-performance web applications with smooth user experiences.
          </p>
          <div className="info-cards">
            <div className="about-card">
              <h3>🛠️ Core Skills</h3>
              <p>{config.skills.develop.tools.slice(0, 5).join(", ")}, {config.skills.design.tools.slice(0, 5).join(", ")}</p>
            </div>
            <div className="about-card">
              <h3>🎓 Education</h3>
              <p>BS Computer Science, NTU (2024-2028)</p>
            </div>
            <div className="about-card">
              <h3>📂 Projects</h3>
              <p>Developed more than {config.projects.length} AI & Web systems</p>
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
        <div className="projects-grid">
          {config.projects.map((project) => (
            <div key={project.id} className="mobile-project-card">
              <div className="project-img-wrapper">
                <img src={project.image} alt={project.title} onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500";
                }} />
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <span className="project-category">{project.category}</span>
                <p>{project.description}</p>
                <div className="project-tech-tags">
                  {project.technologies.split(",").map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech.trim()}</span>
                  ))}
                </div>
                <div className="project-card-actions">
                  <a href={config.contact.github} className="project-link-btn" target="_blank" rel="noreferrer">
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="mobile-services-section" id="services">
        <p className="section-subtitle">SERVICES</p>
        <h2 className="section-title">My Expertises</h2>
        <hr className="section-divider" />
        <div className="services-grid">
          <div className="mobile-service-card">
            <span className="service-icon">🤖</span>
            <h3>AI & ML Integration</h3>
            <p>
              Integrating modern AI pipelines and prediction models (Scikit-learn, Random Forest) with clean web dashboards.
            </p>
          </div>
          <div className="mobile-service-card">
            <span className="service-icon">💻</span>
            <h3>Web Development</h3>
            <p>
              Building responsive, high-performance, and pixel-perfect applications using React, Next.js, and modern CSS.
            </p>
          </div>
          <div className="mobile-service-card">
            <span className="service-icon">⚙️</span>
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
              <a href={`mailto:${config.contact.email}`} className="contact-value">{config.contact.email}</a>
            </div>
            <div className="contact-item">
              <span className="contact-label">Location:</span>
              <span className="contact-value">{config.social.location}</span>
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
