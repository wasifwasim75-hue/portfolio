import React from 'react';
import { Link } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';

export const AboutSection: React.FC = () => {
  const { profile } = useProfile();

  const heading = profile?.aboutHeading || 'About Me';
  const description =
    profile?.aboutDescription ||
    'I am a Full Stack Software Engineer with over 6 years of experience building production web applications from ground zero to scale. My expertise spans both frontend interactive architectures with React and TypeScript, as well as robust backend systems using Node.js, Express, and MongoDB.';
  const personalInfo =
    profile?.aboutPersonalInfo ||
    'Throughout my career, I have collaborated with cross-functional product teams, architected RESTful and GraphQL APIs, designed scalable database schemas, and championed automated testing and CI/CD best practices.';
  const careerObjective = profile?.aboutCareerObjective;

  const resumeUrl = profile?.resumeUrl || '/resume';
  const isDirectResumeFile = !!profile?.resumeUrl;

  const strengths = [
    {
      icon: 'bi-lightning-charge-fill',
      title: 'High Performance & Scale',
      description: 'Optimized frontends with sub-second LCP and backend microservices handling high concurrency with MongoDB & Redis.',
    },
    {
      icon: 'bi-shield-check',
      title: 'Robust Security',
      description: 'Adhering to OWASP security principles, JWT authentication, bcrypt password hashing, input sanitization, and CORS/Helmet safeguards.',
    },
    {
      icon: 'bi-code-square',
      title: 'Type-Safe Architecture',
      description: 'End-to-end TypeScript enforcement across frontends, Express controllers, services, and Mongoose schemas.',
    },
    {
      icon: 'bi-puzzle-fill',
      title: 'Clean Modular Design',
      description: 'Composability, separation of concerns, thin controllers, centralized error handling, and reusable component libraries.',
    },
  ];

  return (
    <section id="about" className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-header fw-bold display-6">{heading}</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            Get to know more about my engineering background, technical philosophy, and what drives my work.
          </p>
        </div>

        <div className="row gy-4 align-items-center mb-5">
          <div className="col-lg-6">
            <h3 className="fw-bold mb-3">
              Passionate Software Engineer Crafting <span className="gradient-text">Exceptional Web Experiences</span>
            </h3>
            <p className="text-secondary">{description}</p>
            <p className="text-secondary">{personalInfo}</p>
            {careerObjective && (
              <div className="p-3 modern-card border-start border-primary border-3 mb-3">
                <span className="fw-semibold small d-block text-primary mb-1">
                  <i className="bi bi-compass-fill me-1"></i> Career Objective:
                </span>
                <p className="text-secondary small mb-0">{careerObjective}</p>
              </div>
            )}

            <div className="d-flex flex-wrap gap-2 pt-2">
              {isDirectResumeFile ? (
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer" download className="btn btn-gradient">
                  <i className="bi bi-download me-2"></i> Download Full Resume
                </a>
              ) : (
                <Link to="/resume" className="btn btn-gradient">
                  <i className="bi bi-download me-2"></i> Download Full Resume
                </Link>
              )}
              <a href="#contact" className="btn btn-outline-secondary">
                <i className="bi bi-chat-dots me-2"></i> Get in Touch
              </a>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="row g-3">
              {strengths.map((item, idx) => (
                <div className="col-sm-6" key={idx}>
                  <div className="p-4 modern-card h-100">
                    <div className="d-inline-flex p-3 rounded-3 bg-primary bg-opacity-10 text-primary mb-3">
                      <i className={`bi ${item.icon} fs-4`}></i>
                    </div>
                    <h5 className="fw-semibold mb-2">{item.title}</h5>
                    <p className="text-secondary small mb-0">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
