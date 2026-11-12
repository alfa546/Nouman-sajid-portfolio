import { Link, useLocation } from "react-router-dom";

export function SiteHeader() {
  const location = useLocation();
  return (
    <header className="site-header wrap">
      <Link className="brand" to="/" onClick={() => window.scrollTo(0, 0)}>
        Nouman Sajid
      </Link>
      <nav aria-label="Main navigation">
        <a href={location.pathname === "/" ? "#projects" : "/#projects"}>
          Work
        </a>
        <a href={location.pathname === "/" ? "#about" : "/#about"}>About</a>
        <a href={location.pathname === "/" ? "#contact" : "/#contact"}>
          Contact
        </a>
        <a
          className="resume-link"
          href="/CV/Nouman_Sajid_Resume.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Résumé ↗
        </a>
      </nav>
    </header>
  );
}
export function SiteFooter() {
  return (
    <footer className="site-footer wrap">
      <p>© {new Date().getFullYear()} Nouman Sajid</p>
      <div>
        <Link to="/play">Play chess</Link>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
