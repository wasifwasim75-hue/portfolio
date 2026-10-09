import React from 'react';
import { Link } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';

export const HeroSection: React.FC = () => {
  const { profile } = useProfile();

  const greeting = profile?.heroGreeting || "Hi, I'm";
  const name = profile?.heroName || profile?.name || 'Wasim Akram';
  const title = profile?.heroTitle || profile?.shortTitle || 'Full Stack Developer & Software Architect';
  const description =
    profile?.heroDescription ||
    'I build scalable, modern and user-friendly web applications with React, TypeScript, Express, and MongoDB. Transforming complex architectures into elegant, resilient user experiences.';
  const availabilityBadge = profile?.heroAvailabilityBadge || profile?.availabilityStatus || 'Available for Senior & Full-Stack Opportunities';
  const viewProjectsText = profile?.heroViewProjectsBtnText || 'View My Work';
  const resumeBtnText = profile?.heroResumeBtnText || 'Download Resume';
  const photo =
    profile?.profilePhoto ||
    '/assets/profile.jpg';
  const yearsExp = profile?.yearsExperience || '6+';
  const projCount = profile?.projectsCount || '45+';
  const uptime = profile?.uptimeSla || '99.9%';

  const github = profile?.githubUrl || 'https://github.com';
  const linkedin = profile?.linkedinUrl || 'https://linkedin.com';
  const instagram = profile?.instagramUrl || 'https://instagram.com';
  const twitter = profile?.twitterUrl || 'https://twitter.com';
  const email = profile?.email || 'wasim.akram@example.com';

  const resumeUrl = profile?.resumeUrl || '/resume';
  const isDirectResumeFile = !!profile?.resumeUrl;

  return (
    <section id="home" className="py-5 my-lg-4">
      <div className="container">
        <div className="row align-items-center gy-5">
          <div className="col-lg-7 order-2 order-lg-1 text-center text-lg-start">
            {/* Status indicator badge */}
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 mb-3 rounded-pill modern-card border-primary border-opacity-25">
              <span className="spinner-grow spinner-grow-sm text-success" role="status" style={{ width: '8px', height: '8px' }}></span>
              <span className="small fw-medium text-body">{availabilityBadge}</span>
            </div>

            <h1 className="display-4 fw-extrabold mb-3 lh-sm">
              {greeting} <span className="gradient-text">{name}</span>
              <br />
              <span className="fw-bold fs-2 text-body-secondary d-block mt-2">
                {title}
              </span>
            </h1>

            <p className="lead text-secondary mb-4 pe-lg-4 fs-5">
              {description}
            </p>

            {/* Call to action buttons */}
            <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start mb-4">
              <a href="#projects" className="btn btn-gradient btn-lg px-4 shadow-sm">
                <i className="bi bi-briefcase me-2"></i> {viewProjectsText}
              </a>
              {isDirectResumeFile ? (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="btn btn-outline-primary btn-lg px-4 modern-card"
                >
                  <i className="bi bi-file-earmark-person me-2"></i> {resumeBtnText}
                </a>
              ) : (
                <Link to="/resume" className="btn btn-outline-primary btn-lg px-4 modern-card">
                  <i className="bi bi-file-earmark-person me-2"></i> {resumeBtnText}
                </Link>
              )}
            </div>

            {/* Social links */}
            <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-3 pt-2">
              <span className="small text-muted fw-semibold me-1">Connect:</span>
              {github && (
                <a href={github} target="_blank" rel="noopener noreferrer" className="social-btn" title="GitHub">
                  <i className="bi bi-github"></i>
                </a>
              )}
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="social-btn" title="LinkedIn">
                  <i className="bi bi-linkedin"></i>
                </a>
              )}
              {instagram && (
                <a href={instagram} target="_blank" rel="noopener noreferrer" className="social-btn" title="Instagram">
                  <i className="bi bi-instagram"></i>
                </a>
              )}
              {twitter && (
                <a href={twitter} target="_blank" rel="noopener noreferrer" className="social-btn" title="Twitter / X">
                  <i className="bi bi-twitter-x"></i>
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`} className="social-btn" title="Send a message">
                  <i className="bi bi-envelope-fill"></i>
                </a>
              )}
            </div>
          </div>

          <div className="col-lg-5 order-1 order-lg-2 text-center">
            <div className="hero-avatar-wrapper">
              <img
                src={photo}
                alt={name}
                className="hero-avatar"
                loading="eager"
              />
              <span className="pulse-badge" title="Online & Available"></span>
            </div>

            {/* Quick stats floating cards */}
            <div className="row g-2 justify-content-center mt-4">
              <div className="col-6 col-sm-4">
                <div className="p-2 p-md-3 modern-card text-center">
                  <div className="h4 fw-bold gradient-text mb-0">{yearsExp}</div>
                  <div className="text-muted small">Years Exp.</div>
                </div>
              </div>
              <div className="col-6 col-sm-4">
                <div className="p-2 p-md-3 modern-card text-center">
                  <div className="h4 fw-bold gradient-text mb-0">{projCount}</div>
                  <div className="text-muted small">Projects</div>
                </div>
              </div>
              <div className="col-6 col-sm-4">
                <div className="p-2 p-md-3 modern-card text-center">
                  <div className="h4 fw-bold gradient-text mb-0">{uptime}</div>
                  <div className="text-muted small">Uptime SLA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
