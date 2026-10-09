import React from 'react';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: 'bi-window-stack',
      title: 'Frontend Architecture',
      description:
        'Building responsive, fast, and accessible single-page and progressive web applications using React, TypeScript, Next.js, and modern CSS systems.',
    },
    {
      icon: 'bi-server',
      title: 'Backend & RESTful APIs',
      description:
        'Designing secure, high-throughput microservices and RESTful APIs using Node.js, Express, MongoDB, Swagger documentation, and JWT token authentication.',
    },
    {
      icon: 'bi-database-check',
      title: 'Database Design & Optimization',
      description:
        'Data modeling, query indexing, schema migrations, and caching strategies with MongoDB, Mongoose, and Redis for peak performance.',
    },
    {
      icon: 'bi-cloud-check',
      title: 'Cloud & DevOps Solutions',
      description:
        'CI/CD pipeline configuration, Docker containerization, AWS/Vercel/Render deployments, and system health monitoring.',
    },
    {
      icon: 'bi-shield-check',
      title: 'Code Review & Security Audits',
      description:
        'Ensuring OWASP security standards, input sanitization, rate-limiting, and code quality assessments for production-grade releases.',
    },
    {
      icon: 'bi-speedometer2',
      title: 'Performance Optimization',
      description:
        'Lighthouse 95+ score tuning, code splitting, bundle minification, and database connection pooling.',
    },
  ];

  return (
    <section id="services" className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-header fw-bold display-6">Services & Expertise</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            Specialized engineering services I provide to startups and enterprise teams.
          </p>
        </div>

        <div className="row g-4">
          {services.map((service, idx) => (
            <div className="col-md-6 col-lg-4" key={idx}>
              <div className="p-4 modern-card h-100 d-flex flex-column">
                <div className="d-inline-flex p-3 rounded-3 bg-primary bg-opacity-10 text-primary mb-3 align-self-start">
                  <i className={`bi ${service.icon} fs-4`}></i>
                </div>
                <h5 className="fw-bold mb-2">{service.title}</h5>
                <p className="text-secondary small mb-0 flex-grow-1">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
