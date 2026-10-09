import React from 'react';
import { Experience } from '../types';
import { experiencesAPI } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import { LoadingSpinner } from './common/LoadingSpinner';
import { ErrorAlert } from './common/ErrorAlert';
import { EmptyState } from './common/EmptyState';

export const ExperienceSection: React.FC = () => {
  const { data: experiences, loading, error, refetch } = useFetch<Experience[]>(() => experiencesAPI.getAll());

  return (
    <section id="experience" className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-header fw-bold display-6">Experience & Internships</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            My career track, internships, roles, and engineering accomplishments.
          </p>
        </div>

        {loading && <LoadingSpinner message="Loading work history..." />}
        {error && <ErrorAlert message={error} onRetry={refetch} />}

        {!loading && !error && (!experiences || experiences.length === 0) && (
          <EmptyState title="No experience history" description="Experience records will be listed here." />
        )}

        {!loading && !error && experiences && experiences.length > 0 && (
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="timeline">
                {experiences.map((exp) => (
                  <div className="timeline-item" key={exp._id}>
                    <div className="timeline-dot"></div>
                    <div className="modern-card p-4">
                      <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-2">
                        <div>
                          <h5 className="fw-bold mb-1">{exp.position}</h5>
                          <h6 className="text-primary fw-semibold mb-0">
                            <i className="bi bi-building me-1"></i>
                            {exp.company}
                          </h6>
                        </div>
                        <span className="badge bg-secondary bg-opacity-25 text-body border border-secondary border-opacity-25 px-3 py-2 rounded-pill small">
                          <i className="bi bi-calendar3 me-1"></i>
                          {exp.duration || `${exp.startDate} – ${exp.current ? 'Present' : exp.endDate || 'Present'}`}
                        </span>
                      </div>

                      <p className="text-secondary my-3">{exp.description}</p>

                      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-2">
                        {exp.technologies && exp.technologies.length > 0 && (
                          <div className="d-flex flex-wrap gap-1">
                            {exp.technologies.map((tech, i) => (
                              <span className="badge-tech" key={i}>
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}

                        {exp.certificateUrl && (
                          <a
                            href={exp.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1"
                          >
                            <i className="bi bi-patch-check-fill"></i> Certificate / Offer Letter
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
