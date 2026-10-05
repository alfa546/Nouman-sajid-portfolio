import React, { useState } from "react";
import { FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { config } from "../../config";
import { getFallbackImage } from "../../utils/projectImages";
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

const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  projects = config.projects,
  showFilters = true,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const filterOptions = ["All", "Full-Stack", "Agentic AI", "Tools"];

  const filteredProjects = projects.filter((project) => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "Full-Stack") {
      return (
        project.category.toLowerCase().includes("full-stack") ||
        project.category.toLowerCase().includes("platform") ||
        project.technologies.toLowerCase().includes("react") ||
        project.technologies.toLowerCase().includes("next.js")
      );
    }
    if (selectedFilter === "Agentic AI") {
      return (
        project.category.toLowerCase().includes("agent") ||
        project.category.toLowerCase().includes("ai") ||
        project.technologies.toLowerCase().includes("agent") ||
        project.technologies.toLowerCase().includes("veo")
      );
    }
    if (selectedFilter === "Tools") {
      return (
        project.category.toLowerCase().includes("tool") ||
        project.category.toLowerCase().includes("seo") ||
        project.category.toLowerCase().includes("crawler") ||
        project.category.toLowerCase().includes("script")
      );
    }
    return true;
  });

  return (
    <div className="project-gallery-component">
      {showFilters && (
        <div className="gallery-filters" role="tablist" aria-label="Project Categories">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`gallery-filter-btn ${selectedFilter === filter ? "active" : ""}`}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      )}

      <div className="project-gallery-grid">
        {filteredProjects.map((project) => {
          const techList = project.technologies
            ? project.technologies.split(",").map((t) => t.trim())
            : [];

          return (
            <div key={project.id} className="project-gallery-card">
              <div className="gallery-card-img-wrapper">
                <img
                  src={project.image}
                  alt={project.title}
                  className="gallery-card-img"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = getFallbackImage(project.id);
                  }}
                />
              </div>

              <div className="gallery-card-content">
                <h3 className="gallery-card-title">{project.title}</h3>
                {project.category && (
                  <span className="gallery-card-category">{project.category}</span>
                )}
                <p className="gallery-card-description">{project.description}</p>

                {techList.length > 0 && (
                  <div className="gallery-card-tech-stack" aria-label="Technologies used">
                    {techList.map((tech, idx) => (
                      <span key={idx} className="gallery-tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="gallery-card-actions">
                  {project.link && (
                    <a
                      href={project.link}
                      className="gallery-action-btn"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaArrowUpRightFromSquare style={{ fontSize: "11px" }} />
                      <span>Live</span>
                    </a>
                  )}
                  <a
                    href={project.github || config.contact.github}
                    className="gallery-action-btn btn-code"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaGithub style={{ fontSize: "13px" }} />
                    <span>Code</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="gallery-empty-state">
          No projects found in this category.
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;
