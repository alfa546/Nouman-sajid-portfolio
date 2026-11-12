import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
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
const summaries: Record<number, string> = {
  1: "A blogging platform for technical articles, with content management, categories, and author profiles.",
  2: "A Python AI agent that parses forms and matches job application requirements.",
  3: "A conversational AI agent with video generation powered by Google Veo.",
  4: "A recruitment platform with job listings, authentication, and a responsive interface.",
  5: "An open-source SEO crawler for on-page audits, JavaScript rendering, and data exports.",
};
const filters = ["All projects", "Full-Stack", "Agentic AI", "Tools"];
function categoryMatches(project: ProjectItem, filter: string) {
  if (filter === "All projects") return true;
  const category = project.category.toLowerCase();
  if (filter === "Full-Stack") return category.includes("full-stack");
  if (filter === "Agentic AI") return /\bai\b/.test(category);
  return /tool|script|seo/.test(category);
}
function ProjectCard({ project }: { project: ProjectItem }) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasSource = project.github && project.github !== config.contact.github;
  return (
    <article className="project-card">
      <a
        className="project-preview"
        href={project.link || project.github || config.contact.github}
        target="_blank"
        rel="noreferrer"
        aria-label={`Explore ${project.title}${project.link ? " live website" : " on GitHub"}`}
      >
        {imageFailed ? (
          <div className="project-image-fallback">{project.title}</div>
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
      </a>
      <div className="project-card-content">
        <h3>{project.title}</h3>
        <p>{summaries[project.id] || project.description}</p>
        <p className="project-technologies">{project.technologies}</p>
        <a
          className="project-link"
          href={project.link || project.github || config.contact.github}
          target="_blank"
          rel="noreferrer"
        >
          {project.link
            ? "Visit website"
            : hasSource
              ? "View source"
              : "GitHub profile"}
          <ArrowUpRight size={14} />
        </a>
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
              </button>
            ))}
          </div>
          <span className="gallery-count" role="status">
            {visible.length} projects
          </span>
        </div>
      )}
      <div className="project-grid">
        {visible.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {!visible.length && (
        <p className="gallery-empty">No projects in this category yet.</p>
      )}
    </div>
  );
}
