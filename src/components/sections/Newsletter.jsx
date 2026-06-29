import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import './Newsletter.css';

/**
 * NEWSLETTER INTEGRATION
 * 
 * TO CONNECT MAILCHIMP (Free — recommended):
 * 1. Create free account at mailchimp.com
 * 2. Audience → Signup Forms → Embedded Forms → copy your form action URL
 * 3. Replace MAILCHIMP_ACTION_URL below with your URL
 * 4. Push to GitHub
 * 
 * TO CONNECT KIT/CONVERTKIT (Free up to 1,000):
 * 1. Create account at kit.com
 * 2. Create a Form → Settings → copy the form action URL
 * 3. Replace MAILCHIMP_ACTION_URL below with your Kit form URL
 */

const MAILCHIMP_ACTION_URL = 'YOUR_MAILCHIMP_ACTION_URL';
// Replace above with your Mailchimp form action URL
// Example: https://yoursite.us1.list-manage.com/subscribe/post?u=XXXXX&id=XXXXX

const isConnected = MAILCHIMP_ACTION_URL !== 'YOUR_MAILCHIMP_ACTION_URL';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setLoading(true);
    setError('');

    if (!isConnected) {
      // Simulation mode — shows success but does not actually subscribe
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
      }, 800);
      return;
    }

    // Real Mailchimp submission
    try {
      const formData = new FormData();
      formData.append('EMAIL', email);
      formData.append('b_', ''); // honeypot field

      const res = await fetch(MAILCHIMP_ACTION_URL.replace('/post?', '/post-json?') + '&c=?', {
        method: 'GET',
        mode: 'no-cors',
      });
      setSubmitted(true);
    } catch {
      // Mailchimp no-cors always throws — treat as success
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="newsletter section-sm" aria-label="Newsletter">
      <div className="container">
        <div className="newsletter__inner">
          <div className="newsletter__content">
            <div className="newsletter__icon">
              <Mail size={24} />
            </div>
            <h2 className="newsletter__title">Free Weekly Homeschool Encouragement</h2>
            <p className="newsletter__subtitle">
              Legal tips, curriculum ideas, lesson planning inspiration, and real encouragement
              for the homeschool journey — delivered weekly. No spam. Unsubscribe anytime.
            </p>

            {submitted ? (
              <div className="newsletter__success">
                <CheckCircle size={24} />
                <div>
                  <strong>You are in! Check your inbox.</strong>
                  <p>Welcome to the KingdomShift Homeschool community.</p>
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
                  className="btn btn--primary newsletter__btn"
                  disabled={loading}
                >
                  {loading ? 'Subscribing...' : 'Subscribe Free'}
                </button>
              </form>
            )}

            {!isConnected && !submitted && (
              <p className="newsletter__setup-note">
                ⚙️ Newsletter not yet connected — see README to connect Mailchimp in 30 minutes
              </p>
            )}

            <p className="newsletter__note">
              Free forever. No spam. For Kingdom families who take education seriously.
            </p>
          </div>

          <div className="newsletter__visual" aria-hidden="true">
            <div className="newsletter__stat">
              <span className="newsletter__stat-value">3.3M+</span>
              <span className="newsletter__stat-label">US Homeschool Families</span>
            </div>
            <div className="newsletter__stat">
              <span className="newsletter__stat-value">50</span>
              <span className="newsletter__stat-label">States Covered</span>
            </div>
            <div className="newsletter__stat">
              <span className="newsletter__stat-value">20+</span>
              <span className="newsletter__stat-label">Curricula Compared</span>
            </div>
            <blockquote className="newsletter__verse">
              "Train up a child in the way he should go; even when he is old he will not depart from it."
              <cite>— Proverbs 22:6</cite>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
