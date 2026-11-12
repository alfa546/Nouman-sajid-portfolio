import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import ProjectGallery from "../components/ProjectGallery/ProjectGallery";
import { config } from "../config";

export default function MyWorks() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="cyber-portfolio archive-page" id="top">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <main className="wrap archive-main" id="main-content">
        <Link className="text-link archive-back" to="/">
          <ArrowLeft size={15} /> Back to home
        </Link>
        <div className="section-index">
          <span>
            PROJECT DIRECTORY /{" "}
            {String(config.projects.length).padStart(2, "0")} ENTRIES
          </span>
          <span>BUILD. SHIP. ITERATE.</span>
        </div>
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">THE PROJECT ARCHIVE</p>
            <h1>
              Ideas into <em>execution.</em>
            </h1>
            <p className="section-description">
              Web platforms, intelligent agents, and practical tools.
              <br />
              Explore the things I’ve been building.
            </p>
          </div>
          <a
            className="text-link"
            href={config.contact.github}
            target="_blank"
            rel="noreferrer"
          >
            Find me on GitHub <ArrowUpRight size={16} />
          </a>
        </div>
        <ProjectGallery />
      </main>
      <SiteFooter />
    </div>
  );
}
