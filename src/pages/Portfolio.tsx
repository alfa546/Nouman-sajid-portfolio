import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { FaGithub as Github, FaLinkedinIn as Linkedin } from "react-icons/fa6";
import { config } from "../config";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import ProjectGallery from "../components/ProjectGallery/ProjectGallery";

export default function Portfolio() {
  const [copyStatus, setCopyStatus] = useState("");
  useEffect(() => {
    if (window.location.hash)
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
  }, []);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(config.contact.email);
      setCopyStatus("Email copied");
    } catch {
      setCopyStatus(`Copy this address: ${config.contact.email}`);
    }
  }
  return (
    <div className="portfolio" id="top">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <main className="wrap" id="main-content">
        <section className="intro" aria-labelledby="intro-heading">
          <p className="intro-location">
            Okara, Pakistan · Open to remote opportunities
          </p>
          <h1 id="intro-heading">Hi, I’m Nouman.</h1>
          <p className="intro-role">
            Full-stack developer & agentic AI engineer.
          </p>
          <p className="intro-description">
            I build web applications and intelligent AI workflows. I enjoy
            solving practical problems and making software simple to use.
          </p>
          <div className="intro-links">
            <a href={config.contact.github} target="_blank" rel="noreferrer">
              <Github size={16} /> GitHub
            </a>
            <a href={config.contact.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={16} /> LinkedIn
            </a>
            <a href={`mailto:${config.contact.email}`}>
              <Mail size={16} /> Email
            </a>
          </div>
        </section>
        <section
          className="section"
          id="projects"
          aria-labelledby="projects-heading"
        >
          <div className="section-heading-row">
            <h2 id="projects-heading">Selected work</h2>
            <Link className="text-link" to="/myworks">
              All projects <ArrowUpRight size={14} />
            </Link>
          </div>
          <ProjectGallery
            projects={config.projects.slice(0, 4)}
            showFilters={false}
          />
        </section>
        <section
          className="section about-section"
          id="about"
          aria-labelledby="about-heading"
        >
          <h2 id="about-heading">About</h2>
          <div className="about-copy">
            <p>
              I’m a Computer Science student at National Textile University,
              graduating in 2028. My focus is full-stack development and agentic
              AI.
            </p>
            <p>
              I work with React, Next.js, and Python to build responsive
              applications and useful automation. I’m interested in
              opportunities where I can contribute, learn, and build alongside a
              thoughtful team.
            </p>
          </div>
        </section>
        <section
          className="section"
          id="expertise"
          aria-labelledby="skills-heading"
        >
          <h2 id="skills-heading">Skills</h2>
          <dl className="skills-list">
            <div>
              <dt>Web development</dt>
              <dd>React, Next.js, TypeScript, JavaScript, Tailwind CSS</dd>
            </div>
            <div>
              <dt>AI & backend</dt>
              <dd>Python, LangChain, LangGraph, RAG, Flask, SQL</dd>
            </div>
            <div>
              <dt>Tools</dt>
              <dd>Git, GitHub, Docker, Linux, Vercel</dd>
            </div>
          </dl>
        </section>
        <section className="section" aria-labelledby="experience-heading">
          <h2 id="experience-heading">Experience & education</h2>
          <div className="experience-list">
            {config.experiences.map((experience) => (
              <article key={experience.company}>
                <div className="experience-heading">
                  <h3>{experience.position}</h3>
                  <span>{experience.period}</span>
                </div>
                <p className="experience-company">{experience.company}</p>
                <p>{experience.description.split(/(?<=[.!?])\s/)[0]}</p>
              </article>
            ))}
          </div>
        </section>
        <section
          className="section contact-section"
          id="contact"
          aria-labelledby="contact-heading"
        >
          <h2 id="contact-heading">Get in touch</h2>
          <p>
            Have a project or opportunity in mind? I’d love to hear about it.
          </p>
          <div className="contact-actions">
            <a
              className="contact-email"
              href={`mailto:${config.contact.email}`}
            >
              {config.contact.email}
              <ArrowUpRight size={16} />
            </a>
            <button
              type="button"
              className="copy-email"
              onClick={copyEmail}
              aria-label="Copy email address"
            >
              {copyStatus === "Email copied" ? (
                <Check size={16} />
              ) : (
                <Copy size={16} />
              )}
            </button>
          </div>
          <p className="copy-status" role="status">
            {copyStatus}
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
