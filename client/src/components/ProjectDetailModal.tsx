import React from 'react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      className="modal show d-block"
      tabIndex={-1}
      style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)' }}
      onClick={onClose}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content modern-card border-0 overflow-hidden shadow-lg">
          <div className="modal-header border-bottom border-secondary border-opacity-25 pb-3">
            <div className="d-flex align-items-center gap-2">
              <h5 className="modal-title fw-bold">{project.title}</h5>
              {project.featured && (
                <span className="badge bg-warning text-dark small">
                  <i className="bi bi-star-fill me-1"></i> Featured
                </span>
              )}
            </div>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>

          <div className="modal-body p-4">
            <div className="rounded-3 overflow-hidden mb-4 border border-secondary border-opacity-25">
              <img
                src={project.image}
                alt={project.title}
                className="img-fluid w-100 object-fit-cover"
                style={{ maxHeight: '350px' }}
              />
            </div>

            <h6 className="fw-bold text-uppercase text-primary small mb-2">Project Overview</h6>
            <p className="text-secondary leading-relaxed mb-4">{project.description}</p>

            <h6 className="fw-bold text-uppercase text-primary small mb-2">Technologies Used</h6>
            <div className="d-flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, i) => (
                <span className="badge-tech" key={i}>
                  {tech}
                </span>
              ))}
            </div>

            <div className="d-flex flex-wrap gap-3 pt-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gradient"
                >
                  <i className="bi bi-box-arrow-up-right me-2"></i> Visit Live Application
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-secondary"
                >
                  <i className="bi bi-github me-2"></i> View Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
