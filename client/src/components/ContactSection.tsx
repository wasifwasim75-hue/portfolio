import React, { useState } from 'react';
import { contactAPI } from '../services/api';
import { ContactFormData } from '../types';
import { useProfile } from '../context/ProfileContext';

export const ContactSection: React.FC = () => {
  const { profile } = useProfile();

  const email = profile?.email || 'wasim.akram@example.com';
  const phone = profile?.phone;
  const location = profile?.location || 'San Francisco, CA (Open to Remote)';
  const availability = profile?.availabilityStatus || 'Within 24 Hours';

  const github = profile?.githubUrl;
  const linkedin = profile?.linkedinUrl;
  const instagram = profile?.instagramUrl;
  const twitter = profile?.twitterUrl;

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const response = await contactAPI.send(formData);
      setSuccessMsg(response.message || 'Thank you! Your message has been sent successfully.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to send message. Please try again.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-header fw-bold display-6">Get In Touch</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            Have a project in mind, want to collaborate, or have questions? Send a direct message below.
          </p>
        </div>

        <div className="row gy-5 justify-content-center">
          {/* Contact Information & Channels */}
          <div className="col-lg-5">
            <div className="p-4 modern-card h-100">
              <h4 className="fw-bold mb-4">Let's Connect</h4>
              <p className="text-secondary mb-4">
                I am currently open to new software engineering opportunities, contract roles, and open source collaborations.
              </p>

              <div className="d-flex flex-column gap-3 mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10 text-primary p-3">
                    <i className="bi bi-envelope fs-5"></i>
                  </div>
                  <div>
                    <span className="small text-muted d-block">Email</span>
                    <a href={`mailto:${email}`} className="fw-semibold text-decoration-none text-body">
                      {email}
                    </a>
                  </div>
                </div>

                {phone && (
                  <div className="d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10 text-primary p-3">
                      <i className="bi bi-telephone fs-5"></i>
                    </div>
                    <div>
                      <span className="small text-muted d-block">Phone</span>
                      <a href={`tel:${phone}`} className="fw-semibold text-decoration-none text-body">
                        {phone}
                      </a>
                    </div>
                  </div>
                )}

                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10 text-primary p-3">
                    <i className="bi bi-geo-alt fs-5"></i>
                  </div>
                  <div>
                    <span className="small text-muted d-block">Location</span>
                    <span className="fw-semibold">{location}</span>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10 text-primary p-3">
                    <i className="bi bi-clock-history fs-5"></i>
                  </div>
                  <div>
                    <span className="small text-muted d-block">Availability & Response</span>
                    <span className="fw-semibold">{availability}</span>
                  </div>
                </div>
              </div>

              <hr className="border-secondary border-opacity-15 my-4" />

              <h6 className="fw-bold mb-3">Professional Profiles</h6>
              <div className="d-flex flex-wrap gap-2">
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
                {profile?.otherSocialLinks &&
                  profile.otherSocialLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-btn"
                      title={link.platform}
                    >
                      <i className="bi bi-link-45deg"></i>
                    </a>
                  ))}
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="col-lg-7">
            <div className="p-4 p-md-5 modern-card">
              <h4 className="fw-bold mb-4">Send a Message</h4>

              {successMsg && (
                <div className="alert alert-success d-flex align-items-center" role="alert">
                  <i className="bi bi-check-circle-fill me-2 fs-5"></i>
                  <div>{successMsg}</div>
                </div>
              )}

              {errorMsg && (
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
                  <div>{errorMsg}</div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-body">Your Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-body">Your Email *</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold text-body">Subject *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Job Opportunity"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-semibold text-body">Message *</label>
                  <textarea
                    className="form-control"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project, timeline, or requirements..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-gradient w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-send-fill"></i>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
