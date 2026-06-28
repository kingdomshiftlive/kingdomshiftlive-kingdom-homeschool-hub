import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, BookOpen } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import './Navbar.css';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'State Requirements', path: '/tools' },
  { label: 'Curriculum', path: '/resources' },
  { label: 'Blog', path: '/blog' },
  { label: 'AI Planner', path: '/ai-coach' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo">
          <div className="navbar__logo-icon">
            <BookOpen size={20} />
          </div>
          <div className="navbar__logo-text">
            <span className="navbar__logo-primary">Kingdom Homeschool</span>
            <span className="navbar__logo-sub">Hub</span>
          </div>
        </Link>

        <nav className="navbar__links" aria-label="Main navigation">
          {navLinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <button
            className="navbar__theme-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <Link to="/ai-coach" className="btn btn--primary navbar__cta">
            AI Lesson Planner
          </Link>
          <button
            className="navbar__hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="navbar__mobile">
          <nav>
            {navLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/ai-coach" className="btn btn--primary" style={{ marginTop: '1rem', width: '100%', textAlign: 'center' }}>
              AI Lesson Planner — Free
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
