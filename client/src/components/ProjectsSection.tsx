import React, { useState } from 'react';
import { Project } from '../types';
import { projectsAPI } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import { LoadingSpinner } from './common/LoadingSpinner';
import { ErrorAlert } from './common/ErrorAlert';
import { EmptyState } from './common/EmptyState';
import { ProjectDetailModal } from './ProjectDetailModal';

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'featured'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { data: projects, loading, error, refetch } = useFetch<Project[]>(() => projectsAPI.getAll());

  const displayedProjects = projects
    ? filter === 'featured'
      ? projects.filter((p) => p.featured)
      : projects
    : [];

  return (
    <section id="projects" className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-header fw-bold display-6">Featured Projects</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            Real-world full-stack applications loaded dynamically from the backend REST API.
          </p>

          <div className="d-inline-flex p-1 rounded-pill modern-card mt-3">
            <button
              onClick={() => setFilter('all')}
              className={`btn btn-sm px-4 rounded-pill ${
                filter === 'all' ? 'btn-primary shadow-sm' : 'btn-link text-body text-decoration-none'
              }`}
            >
              All Projects ({projects?.length || 0})
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={`btn btn-sm px-4 rounded-pill ${
                filter === 'featured' ? 'btn-primary shadow-sm' : 'btn-link text-body text-decoration-none'
              }`}
            >
              <i className="bi bi-star-fill text-warning me-1"></i> Featured ({projects?.filter((p) => p.featured).length || 0})
            </button>
          </div>
        </div>

        {loading && <LoadingSpinner message="Fetching portfolio projects from database..." />}
        {error && <ErrorAlert message={error} onRetry={refetch} />}

        {!loading && !error && displayedProjects.length === 0 && (
          <EmptyState title="No projects found" description="No projects available in this category." />
        )}

        {!loading && !error && displayedProjects.length > 0 && (
          <div className="row g-4">
            {displayedProjects.map((project) => (
              <div className="col-md-6 col-lg-4" key={project._id}>
                <div className="card h-100 modern-card overflow-hidden border-0">
                  {/* Card Image */}
                  <div className="position-relative overflow-hidden" style={{ height: '210px' }}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-100 h-100 object-fit-cover"
                      loading="lazy"
                    />
                    {project.featured && (
                      <span className="position-absolute top-0 end-0 m-2 badge bg-warning text-dark shadow-sm">
                        <i className="bi bi-star-fill me-1"></i> Featured
                      </span>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="card-body p-4 d-flex flex-column">
                    <h5 className="card-title fw-bold mb-2">{project.title}</h5>
                    <p className="card-text text-secondary small flex-grow-1 mb-3">
                      {project.description.length > 115
                        ? `${project.description.slice(0, 115)}...`
                        : project.description}
                    </p>

                    {/* Technologies */}
                    <div className="d-flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 4).map((tech, i) => (
                        <span className="badge-tech" key={i}>
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="badge-tech">+{project.technologies.length - 4}</span>
                      )}
                    </div>

                    {/* Card Actions */}
                    <div className="d-flex align-items-center justify-content-between pt-2 border-top border-secondary border-opacity-10 mt-auto">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="btn btn-sm btn-outline-primary"
                      >
                        <i className="bi bi-info-circle me-1"></i> View Details
                      </button>

                      <div className="d-flex gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline-secondary rounded-circle"
                            title="GitHub Repository"
                            style={{ width: '32px', height: '32px', padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            <i className="bi bi-github"></i>
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline-primary rounded-circle"
                            title="Live Demo"
                            style={{ width: '32px', height: '32px', padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            <i className="bi bi-box-arrow-up-right"></i>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      </div>
    </section>
  );
};
