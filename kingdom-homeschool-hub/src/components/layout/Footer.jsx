import { Link } from 'react-router-dom';
import { BookOpen, Heart } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <BookOpen size={22} />
            <div>
              <div className="footer__logo-name">Kingdom Homeschool Hub</div>
              <div className="footer__logo-sub">Raise World-Changers at Home</div>
            </div>
          </Link>
          <p className="footer__scripture">
            "Train up a child in the way he should go; even when he is old he will not depart from it."
            <br /><em>— Proverbs 22:6</em>
          </p>
        </div>

        <div className="footer__cols">
          <div className="footer__col">
            <h4>Tools</h4>
            <Link to="/tools">State Requirements</Link>
            <Link to="/tools#curriculum">Curriculum Comparison</Link>
            <Link to="/ai-coach">AI Lesson Planner</Link>
            <Link to="/tools#reportcard">Report Card Generator</Link>
          </div>
          <div className="footer__col">
            <h4>Learn</h4>
            <Link to="/blog">Blog</Link>
            <Link to="/resources">Resources</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/about">About</Link>
          </div>
          <div className="footer__col">
            <h4>Legal</h4>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms of Use</Link>
            <Link to="/disclaimer">Disclaimer</Link>
            <Link to="/affiliate-disclosure">Affiliate Disclosure</Link>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {year} Kingdom Homeschool Hub. Built with <Heart size={13} className="footer__heart" /> for Kingdom families.</p>
          <p className="footer__affiliate-note">
            We participate in affiliate programs. See our <Link to="/affiliate-disclosure">Affiliate Disclosure</Link>.
          </p>
        </div>
      </div>
    </footer>
  );
}
