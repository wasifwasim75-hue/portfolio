import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../context/ProfileContext';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const { profile } = useProfile();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isMainPage = location.pathname === '/';
  const displayName = profile?.name || 'Wasim Akram';

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'About', href: '/#about' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Experience', href: '/#experience' },
    { name: 'Education', href: '/#education' },
    { name: 'Services', href: '/#services' },
    { name: 'Contact', href: '/#contact' },
    { name: 'Resume', href: '/resume', isRoute: true },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top glass-navbar py-3">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold fs-4 d-flex align-items-center" onClick={handleLinkClick}>
          <span className="badge bg-primary me-2 px-2 py-1 fs-6 rounded-3">
            <i className="bi bi-code-slash"></i>
          </span>
          <span className="gradient-text">{displayName}</span>
        </Link>

        {/* Mobile toggler */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <i className={`bi ${isOpen ? 'bi-x-lg' : 'bi-list'} fs-3`}></i>
        </button>

        {/* Nav items */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-1 gap-lg-2 my-3 my-lg-0">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.name}>
                {link.isRoute ? (
                  <Link
                    to={link.href}
                    className={`nav-link px-2 fw-medium ${location.pathname === link.href ? 'active text-primary fw-semibold' : ''}`}
                    onClick={handleLinkClick}
                  >
                    {link.name}
                  </Link>
                ) : isMainPage ? (
                  <a
                    href={link.href.replace('/', '')}
                    className="nav-link px-2 fw-medium"
                    onClick={handleLinkClick}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link to={link.href} className="nav-link px-2 fw-medium" onClick={handleLinkClick}>
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center gap-2 ms-lg-3 pt-2 pt-lg-0 border-top border-lg-0">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center p-2"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              style={{ width: '38px', height: '38px' }}
              aria-label="Toggle color theme"
            >
              <i className={`bi ${theme === 'dark' ? 'bi-sun-fill text-warning' : 'bi-moon-stars-fill text-primary'} fs-6`}></i>
            </button>

            {/* Admin Portal Link */}
            {isAuthenticated ? (
              <div className="d-flex align-items-center gap-2">
                <Link
                  to="/admin"
                  className="btn btn-sm btn-outline-primary fw-medium px-3"
                  onClick={handleLinkClick}
                >
                  <i className="bi bi-speedometer2 me-1"></i> Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="btn btn-sm btn-outline-danger px-2"
                  title="Logout Admin"
                >
                  <i className="bi bi-box-arrow-right"></i>
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                className="btn btn-sm btn-outline-secondary fw-medium px-2 py-1"
                title="Admin Login"
                onClick={handleLinkClick}
              >
                <i className="bi bi-lock me-1"></i> Admin
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
