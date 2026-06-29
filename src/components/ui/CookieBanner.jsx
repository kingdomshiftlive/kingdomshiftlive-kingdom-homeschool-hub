import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import './CookieBanner.css';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('fwb-cookies-accepted');
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('fwb-cookies-accepted', 'true');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('fwb-cookies-accepted', 'false');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      <div className="cookie-banner__icon">
        <Cookie size={20} />
      </div>
      <div className="cookie-banner__content">
        <p className="cookie-banner__text">
          We use cookies to improve your experience and analyze site usage.
          By continuing, you agree to our{' '}
          <a href="/privacy-policy">Privacy Policy</a>.
        </p>
      </div>
      <div className="cookie-banner__actions">
        <button onClick={decline} className="btn btn-ghost btn-sm">Decline</button>
        <button onClick={accept} className="btn btn-primary btn-sm">Accept</button>
      </div>
      <button onClick={decline} className="cookie-banner__close" aria-label="Close">
        <X size={16} />
      </button>
    </div>
  );
}
