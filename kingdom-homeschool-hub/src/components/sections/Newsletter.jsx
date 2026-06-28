import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import './Newsletter.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <section className="newsletter section-sm" aria-label="Newsletter">
      <div className="container">
        <div className="newsletter__inner bg-navy-gradient">
          <div className="newsletter__content">
            <div className="newsletter__icon">
              <Mail size={24} />
            </div>
            <h2 className="newsletter__title">Weekly Kingdom Wealth Wisdom</h2>
            <p className="newsletter__subtitle">
              One actionable biblical finance insight every Thursday. No spam.
              No prosperity gospel. Just truth that transforms your finances.
            </p>

            {submitted ? (
              <div className="newsletter__success">
                <CheckCircle size={24} />
                <div>
                  <strong>You're in! Check your inbox.</strong>
                  <p>Welcome to the community. Your first issue arrives Thursday.</p>
                </div>
              </div>
            ) : (
              <form className="newsletter__form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="newsletter__input"
                  required
                  aria-label="Email address for newsletter"
                />
                <button
                  type="submit"
                  className="btn btn-primary newsletter__btn"
                  disabled={loading}
                >
                  {loading ? 'Subscribing...' : 'Subscribe Free'}
                </button>
              </form>
            )}

            <p className="newsletter__note">
              Join 4,200+ believers. Unsubscribe anytime. We honor your inbox.
            </p>
          </div>

          <div className="newsletter__visual" aria-hidden="true">
            <div className="newsletter__stat">
              <span className="newsletter__stat-value">4,200+</span>
              <span className="newsletter__stat-label">Subscribers</span>
            </div>
            <div className="newsletter__stat">
              <span className="newsletter__stat-value">52+</span>
              <span className="newsletter__stat-label">Issues Published</span>
            </div>
            <div className="newsletter__stat">
              <span className="newsletter__stat-value">100%</span>
              <span className="newsletter__stat-label">Scripture-Grounded</span>
            </div>
            <blockquote className="newsletter__verse">
              "Write the vision; make it plain on tablets."
              <cite>— Habakkuk 2:2</cite>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
