import React from 'react';
import { Link } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { profile } = useProfile();

  const name = profile?.name || 'Wasim Akram';
  const shortTitle = profile?.shortTitle || 'Senior Full Stack Developer specializing in high-scale web applications with React, TypeScript, Node.js, and MongoDB.';
  const email = profile?.email || 'wasim.akram@example.com';
  const github = profile?.githubUrl || 'https://github.com';
  const linkedin = profile?.linkedinUrl || 'https://linkedin.com';
  const twitter = profile?.twitterUrl || 'https://twitter.com';

  return (
    <footer className="border-top py-5 mt-5" style={{ background: 'var(--card-bg)' }}>
      <div className="container">
        <div className="row gy-4 align-items-center">
          <div className="col-lg-4 text-center text-lg-start">
            <Link to="/" className="navbar-brand fw-bold fs-4 d-inline-flex align-items-center mb-2">
              <span className="badge bg-primary me-2 px-2 py-1 fs-6 rounded-3">
                <i className="bi bi-code-slash"></i>
              </span>
              <span className="gradient-text">{name}</span>
            </Link>
            <p className="text-secondary small mb-0">
              {shortTitle}
            </p>
          </div>

          <div className="col-lg-4 text-center">
            <div className="d-flex justify-content-center gap-3 mb-3">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label="GitHub Profile"
                >
                  <i className="bi bi-github"></i>
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label="LinkedIn Profile"
                >
                  <i className="bi bi-linkedin"></i>
                </a>
              )}
              {twitter && (
                <a
                  href={twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label="Twitter Profile"
                >
                  <i className="bi bi-twitter-x"></i>
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="social-btn"
                  aria-label="Email Contact"
                >
                  <i className="bi bi-envelope-fill"></i>
                </a>
              )}
            </div>
            <p className="text-muted small mb-0">
              © {currentYear} {name}. All rights reserved.
            </p>
          </div>

          <div className="col-lg-4 text-center text-lg-end">
            <span className="badge bg-secondary bg-opacity-25 text-body border border-secondary border-opacity-25 py-2 px-3 rounded-pill small">
              <i className="bi bi-check2-circle text-success me-1"></i> Production Ready Architecture
            </span>
            <div className="mt-2">
              <a href="#home" className="text-decoration-none small text-secondary hover-primary">
                Back to Top <i className="bi bi-arrow-up-short"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
