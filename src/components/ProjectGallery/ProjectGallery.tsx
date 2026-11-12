import { useState } from "react";
import { ArrowUpRight, Braces } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa6";
import { config } from "../../config";
import "./ProjectGallery.css";

export interface ProjectItem {
  id: number;
  title: string;
  category: string;
  technologies: string;
  image: string;
  link?: string;
  github?: string;
  description: string;
}
export interface ProjectGalleryProps {
  projects?: ProjectItem[];
  showFilters?: boolean;
}
const filters = ["All projects", "Full-Stack", "Agentic AI", "Tools"];
function categoryMatches(project: ProjectItem, filter: string) {
  if (filter === "All projects") return true;
  const category = project.category.toLowerCase();
  if (filter === "Full-Stack") return category.includes("full-stack");
  if (filter === "Agentic AI") return /\bai\b/.test(category);
  return /tool|script|seo/.test(category);
}
function ProjectCard({
  project,
  index,
}: {
  project: ProjectItem;
  index: number;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <article className={`project-card project-${project.id}`}>
      <a
        className="project-preview"
        href={project.link || project.github || config.contact.github}
        target="_blank"
        rel="noreferrer"
        aria-label={`Explore ${project.title}${project.link ? " live website" : " on GitHub"}`}
      >
        <div className="project-preview-top">
          <span>PROJECT / {String(index + 1).padStart(2, "0")}</span>
          <span>
            {project.link ? "LIVE WEBSITE" : "GITHUB"}{" "}
            <ArrowUpRight size={11} />
          </span>
        </div>
        <div className="project-image-frame">
          {imageFailed ? (
            <div className="project-image-fallback">
              <Braces size={40} />
              <span>{project.title}</span>
            </div>
          ) : (
            <img
              src={project.image}
              alt={`${project.title} interface preview`}
              loading="lazy"
              width={1000}
              height={625}
              onError={() => setImageFailed(true)}
            />
          )}
        </div>
        <span className="project-open" aria-hidden="true">
          <ArrowUpRight size={22} />
        </span>
      </a>
      <div className="project-card-content">
        <div className="project-title-row">
          <div>
            <span className="project-category">{project.category}</span>
            <h3>{project.title}</h3>
          </div>
          <a
            href={project.github || config.contact.github}
            target="_blank"
            rel="noreferrer"
            className="project-github icon-button"
            aria-label={`${project.github && project.github !== config.contact.github ? project.title + " source code" : "Nouman's profile"} on GitHub`}
          >
            <Github size={18} />
          </a>
        </div>
        <p>{project.description}</p>
        <div className="tech-list">
          {project.technologies.split(",").map((tech) => (
            <span key={tech}>{tech.trim()}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
export default function ProjectGallery({
  projects = config.projects,
  showFilters = true,
}: ProjectGalleryProps) {
  const [filter, setFilter] = useState("All projects");
  const visible = projects.filter((project) =>
    categoryMatches(project, filter),
  );
  return (
    <div className="project-gallery">
      {showFilters && (
        <div className="gallery-toolbar">
          <div
            className="gallery-filters"
            role="group"
            aria-label="Filter projects"
          >
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
              >
                {item}
                {item === "All projects" && (
                  <span>{String(projects.length).padStart(2, "0")}</span>
                )}
              </button>
            ))}
          </div>
          <span className="gallery-count" role="status">
            {String(visible.length).padStart(2, "0")} PROJECTS
          </span>
        </div>
      )}
      <div className="project-grid">
        {visible.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
      {!visible.length && (
        <p className="gallery-empty">No projects in this category yet.</p>
      )}
    </div>
  );
}
