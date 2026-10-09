import React from 'react';
import { Education } from '../types';
import { educationAPI } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import { LoadingSpinner } from './common/LoadingSpinner';
import { ErrorAlert } from './common/ErrorAlert';
import { EmptyState } from './common/EmptyState';

export const EducationSection: React.FC = () => {
  const { data: educationList, loading, error, refetch } = useFetch<Education[]>(() => educationAPI.getAll());

  return (
    <section id="education" className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-header fw-bold display-6">Education & Degrees</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            Academic qualifications and computer science background.
          </p>
        </div>

        {loading && <LoadingSpinner message="Loading education records..." />}
        {error && <ErrorAlert message={error} onRetry={refetch} />}

        {!loading && !error && (!educationList || educationList.length === 0) && (
          <EmptyState title="No education history" description="Education records will be listed here." />
        )}

        {!loading && !error && educationList && educationList.length > 0 && (
          <div className="row g-4 justify-content-center">
            {educationList.map((edu) => (
              <div className="col-md-6" key={edu._id}>
                <div className="p-4 modern-card h-100 d-flex flex-column">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-inline-flex p-3 rounded-3 bg-primary bg-opacity-10 text-primary">
                      <i className="bi bi-mortarboard-fill fs-4"></i>
                    </div>
                    <span className="badge bg-secondary bg-opacity-25 text-body border border-secondary border-opacity-25 px-3 py-2 rounded-pill small">
                      {edu.year || `${edu.startYear} – ${edu.endYear || 'Present'}`}
                    </span>
                  </div>

                  <h5 className="fw-bold mb-1">{edu.degree}</h5>
                  <h6 className="text-primary fw-semibold mb-1">
                    <i className="bi bi-geo-alt-fill me-1"></i>
                    {edu.institution}
                  </h6>

                  {edu.department && (
                    <div className="text-muted small mb-2">
                      <i className="bi bi-book me-1"></i> Department: {edu.department}
                    </div>
                  )}

                  {edu.cgpa && (
                    <div className="badge bg-primary bg-opacity-10 text-primary align-self-start mb-2 px-2 py-1">
                      CGPA / Grade: {edu.cgpa}
                    </div>
                  )}

                  {edu.description && (
                    <p className="text-secondary small mb-0 mt-auto">{edu.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
