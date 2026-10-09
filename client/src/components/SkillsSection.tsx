import React, { useState } from 'react';
import { Skill, SkillCategory } from '../types';
import { skillsAPI } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import { LoadingSpinner } from './common/LoadingSpinner';
import { ErrorAlert } from './common/ErrorAlert';
import { EmptyState } from './common/EmptyState';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const { data: skills, loading, error, refetch } = useFetch<Skill[]>(() => skillsAPI.getAll());

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools'];

  const filteredSkills = skills
    ? activeCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === activeCategory)
    : [];

  return (
    <section id="skills" className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-header fw-bold display-6">Technical Skills</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            Dynamic proficiencies and technologies loaded directly from the database API.
          </p>

          {/* Category Filter Pills */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`btn btn-sm px-3 py-2 rounded-pill fw-medium transition ${
                  activeCategory === cat
                    ? 'btn-primary shadow-sm'
                    : 'btn-outline-secondary modern-card'
                }`}
              >
                {cat}
                {skills && (
                  <span className="badge bg-secondary bg-opacity-25 ms-2 rounded-pill">
                    {cat === 'All' ? skills.length : skills.filter((s) => s.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {loading && <LoadingSpinner message="Fetching skills from database..." />}
        {error && <ErrorAlert message={error} onRetry={refetch} />}

        {!loading && !error && filteredSkills.length === 0 && (
          <EmptyState title="No skills found" description="No skills match the selected category." />
        )}

        {!loading && !error && filteredSkills.length > 0 && (
          <div className="row g-4">
            {filteredSkills.map((skill) => (
              <div className="col-md-6 col-lg-4" key={skill._id}>
                <div className="p-3 p-md-4 modern-card h-100">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="d-flex align-items-center gap-2">
                      <div className="d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10 text-primary p-2">
                        <i className={`bi ${skill.icon || 'bi-code-slash'} fs-5`}></i>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-0">{skill.name}</h6>
                        <span className="badge bg-secondary bg-opacity-10 text-body-secondary small">
                          {skill.category}
                        </span>
                      </div>
                    </div>
                    <span className="fw-bold text-primary font-monospace">{skill.proficiency}%</span>
                  </div>

                  {/* Proficiency Progress Bar */}
                  <div className="custom-progress mt-3">
                    <div
                      className="custom-progress-bar h-100"
                      role="progressbar"
                      style={{ width: `${skill.proficiency}%` }}
                      aria-valuenow={skill.proficiency}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
