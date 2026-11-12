import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import ProjectGallery from "../components/ProjectGallery/ProjectGallery";

export default function MyWorks() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="portfolio" id="top">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <main className="wrap archive-main" id="main-content">
        <Link className="text-link" to="/">
          ← Back to home
        </Link>
        <h1>Projects</h1>
        <p className="archive-description">
          Web applications, AI workflows, and tools I’ve built.
        </p>
        <ProjectGallery />
      </main>
      <SiteFooter />
    </div>
  );
}
