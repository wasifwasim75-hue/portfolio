import React from 'react';
import { useFetch } from '../hooks/useFetch';
import { experiencesAPI, educationAPI, skillsAPI } from '../services/api';
import { Experience, Education, Skill } from '../types';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useProfile } from '../context/ProfileContext';

export const ResumePage: React.FC = () => {
  const { profile } = useProfile();
  const { data: experiences, loading: expLoading } = useFetch<Experience[]>(() => experiencesAPI.getAll());
  const { data: education, loading: eduLoading } = useFetch<Education[]>(() => educationAPI.getAll());
  const { data: skills, loading: skillsLoading } = useFetch<Skill[]>(() => skillsAPI.getAll());

  const handlePrint = () => {
    window.print();
  };

  const name = profile?.name || 'Wasim Akram';
  const title = profile?.heroTitle || profile?.shortTitle || 'Senior Full Stack Engineer & Architect';
  const location = profile?.location || 'San Francisco, CA • Open to Remote';
  const email = profile?.email || 'wasim.akram@example.com';
  const github = profile?.githubUrl;
  const linkedin = profile?.linkedinUrl;
  const resumeUrl = profile?.resumeUrl;

  const aboutSummary =
    profile?.aboutDescription ||
    'Innovative and detail-oriented Full Stack Software Engineer with 6+ years of experience architecting and delivering high-performance, accessible, and scalable web solutions. Proficient across the complete JavaScript/TypeScript ecosystem (React, Next.js, Node.js, Express, MongoDB), with a strong focus on clean architecture, OWASP security, and developer ergonomics.';

  const isLoading = expLoading || eduLoading || skillsLoading;

  return (
    <div className="container py-5 my-3">
      <div className="d-flex justify-content-between align-items-center mb-4 d-print-none flex-wrap gap-2">
        <div>
          <h2 className="fw-bold mb-1">Resume / CV</h2>
          <p className="text-secondary small mb-0">Professional Summary & Curriculum Vitae</p>
        </div>
        <div className="d-flex gap-2">
          {resumeUrl && (
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" download className="btn btn-primary d-flex align-items-center gap-2">
              <i className="bi bi-file-earmark-pdf-fill"></i> Download Original PDF
            </a>
          )}
          <button onClick={handlePrint} className="btn btn-gradient d-flex align-items-center gap-2">
            <i className="bi bi-printer-fill"></i> Print / Save PDF
          </button>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner message="Generating resume preview..." />
      ) : (
        <div className="modern-card p-4 p-md-5 border">
          {/* Header */}
          <div className="border-bottom pb-4 mb-4 text-center text-md-start d-md-flex justify-content-between align-items-center">
            <div>
              <h1 className="fw-bold mb-1">{name}</h1>
              <h4 className="text-primary mb-2">{title}</h4>
              <p className="text-secondary mb-0">{location}</p>
            </div>
            <div className="mt-3 mt-md-0 text-md-end text-secondary small">
              <div><i className="bi bi-envelope me-1"></i> {email}</div>
              {profile?.phone && <div><i className="bi bi-telephone me-1"></i> {profile.phone}</div>}
              {github && <div><i className="bi bi-github me-1"></i> {github.replace('https://', '')}</div>}
              {linkedin && <div><i className="bi bi-linkedin me-1"></i> {linkedin.replace('https://', '')}</div>}
            </div>
          </div>

          {/* Summary */}
          <div className="mb-4">
            <h5 className="fw-bold text-uppercase text-primary mb-2">Professional Summary</h5>
            <p className="text-secondary">{aboutSummary}</p>
            {profile?.aboutCareerObjective && (
              <p className="text-secondary small">
                <strong>Objective:</strong> {profile.aboutCareerObjective}
              </p>
            )}
          </div>

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className="mb-4">
              <h5 className="fw-bold text-uppercase text-primary mb-2">Technical Skills</h5>
              <div className="d-flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span key={s._id} className="badge-tech">
                    {s.name} ({s.proficiency}%)
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Work Experience */}
          {experiences && experiences.length > 0 && (
            <div className="mb-4">
              <h5 className="fw-bold text-uppercase text-primary mb-3">Work Experience & Internships</h5>
              {experiences.map((exp) => (
                <div key={exp._id} className="mb-4">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="fw-bold mb-0">{exp.position}</h6>
                      <div className="text-primary small fw-semibold">{exp.company}</div>
                    </div>
                    <span className="text-muted small">
                      {exp.duration || `${exp.startDate} – ${exp.current ? 'Present' : exp.endDate || 'Present'}`}
                    </span>
                  </div>
                  <p className="text-secondary small my-2">{exp.description}</p>
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="d-flex flex-wrap gap-1">
                      {exp.technologies.map((t, i) => (
                        <span key={i} className="badge bg-secondary bg-opacity-15 text-body small">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <div>
              <h5 className="fw-bold text-uppercase text-primary mb-3">Education</h5>
              {education.map((edu) => (
                <div key={edu._id} className="mb-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="fw-bold mb-0">{edu.degree}</h6>
                      <div className="text-primary small fw-semibold">{edu.institution}</div>
                      {edu.department && <div className="text-muted small">Dept: {edu.department}</div>}
                    </div>
                    <div className="text-end">
                      <span className="text-muted small d-block">
                        {edu.year || `${edu.startYear} – ${edu.endYear || 'Present'}`}
                      </span>
                      {edu.cgpa && <span className="badge bg-primary bg-opacity-10 text-primary small">CGPA: {edu.cgpa}</span>}
                    </div>
                  </div>
                  {edu.description && <p className="text-secondary small mt-1 mb-0">{edu.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
