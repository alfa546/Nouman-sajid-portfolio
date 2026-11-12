import { useEffect, useState } from "react";
import { ArrowDownToLine, ArrowUpRight, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { config } from "../config";

export function SiteHeader({ active = "" }: { active?: string }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          className="brand"
          to="/"
          onClick={() => {
            setOpen(false);
            window.scrollTo(0, 0);
          }}
          aria-label="Nouman Sajid home"
        >
          <span className="brand-mark">
            n<span>.</span>
          </span>
          <span>
            Nouman Sajid<small>DEVELOPER & AI ENGINEER</small>
          </span>
        </Link>
        <button
          className="menu-toggle icon-button"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav
          id="main-navigation"
          className={open ? "main-nav is-open" : "main-nav"}
          aria-label="Main navigation"
        >
          {[
            ["projects", "Work"],
            ["about", "About"],
            ["expertise", "Expertise"],
            ["contact", "Contact"],
          ].map(([id, name]) => (
            <a
              key={id}
              href={location.pathname === "/" ? `#${id}` : `/#${id}`}
              aria-current={
                active === id ||
                (id === "projects" && location.pathname === "/myworks")
                  ? "location"
                  : undefined
              }
              onClick={() => setOpen(false)}
            >
              {name}
            </a>
          ))}
          <a
            className="resume-link"
            href="/CV/Nouman_Sajid_Resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Résumé <ArrowDownToLine size={14} />
          </a>
        </nav>
      </div>
    </header>
  );
}
export function SiteFooter() {
  return (
    <footer className="site-footer wrap">
      <Link
        className="footer-brand"
        to="/"
        onClick={() => window.scrollTo(0, 0)}
        aria-label="Nouman Sajid home"
      >
        Nouman Sajid<span>© {new Date().getFullYear()}</span>
      </Link>
      <p>Made with care. Built with intention.</p>
      <a href={config.contact.github} target="_blank" rel="noreferrer">
        GitHub <ArrowUpRight size={14} />
      </a>
      <a href="#top">Back to top ↑</a>
    </footer>
  );
}
