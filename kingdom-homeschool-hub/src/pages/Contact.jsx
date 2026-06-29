import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import SEOHead from '../components/ui/SEOHead';
import { Mail, MessageSquare, Clock, Send, MapPin, Phone } from 'lucide-react';
import './Contact.css';

const TOPICS = [
  'General Question',
  'Technical Support',
  'Coaching Inquiry',
  'Partnership / Collaboration',
  'Press / Media',
  'Other',
];

const validate = (fields) => {
  const errs = {};
  if (!fields.name.trim()) errs.name = 'Please enter your name.';
  if (!fields.email.trim()) errs.email = 'Please enter your email.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = 'Please enter a valid email.';
  if (!fields.topic) errs.topic = 'Please select a topic.';
  if (!fields.message.trim()) errs.message = 'Please enter a message.';
  else if (fields.message.trim().length < 20) errs.message = 'Message must be at least 20 characters.';
  return errs;
};

export default function Contact() {
  const [fields, setFields] = useState({ name: '', email: '', topic: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(e => ({ ...e, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      toast.error('Please fix the errors below.');
      return;
    }
    setLoading(true);
    // Simulate async submission (replace with real API call)
    await new Promise(res => setTimeout(res, 1600));
    setLoading(false);
    setSent(true);
    toast.success('Message sent! We\'ll be in touch within 48 hours.');
  };

  return (
    <>
      <SEOHead
        title="Contact Us — KingdomShift Homeschool Hub"
        description="Have a question about biblical financial stewardship? Reach out to the KingdomShift Homeschool Hub team. We'd love to hear from you."
        canonical="/contact"
      />
      <div className="contact-page">
        {/* Hero */}
        <section className="contact-hero">
          <div className="container">
            <span className="section-label">Get in Touch</span>
            <h1>We'd Love to <span className="text-gold">Hear From You</span></h1>
            <p>Whether you have a question, partnership idea, or just want to say hello — we read every message.</p>
          </div>
        </section>

        {/* Info + Form */}
        <section className="contact-main">
          <div className="container">
            <div className="contact-grid">
              {/* Info Sidebar */}
              <aside className="contact-info">
                <h2>Let's Connect</h2>
                <p>Our team typically responds within 1–2 business days. For faster answers, check our <a href="/faq">FAQ page</a>.</p>

                <div className="contact-item">
                  <div className="contact-icon"><Mail size={20} /></div>
                  <div>
                    <strong>Email Us</strong>
                    <span>hello@faithwealthblueprint.com</span>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon"><Clock size={20} /></div>
                  <div>
                    <strong>Response Time</strong>
                    <span>1–2 business days</span>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon"><MessageSquare size={20} /></div>
                  <div>
                    <strong>Community</strong>
                    <span>Join our free newsletter for weekly biblical finance tips</span>
                  </div>
                </div>

                <div className="contact-scripture">
                  <p>
                    "The plans of the diligent lead surely to abundance, but everyone who is hasty comes only to poverty."
                  </p>
                  <cite>— Proverbs 21:5</cite>
                </div>

                <div className="contact-social">
                  <h4>Follow Along</h4>
                  <div className="social-links">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-btn">Twitter</a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-btn">Instagram</a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-btn">YouTube</a>
                  </div>
                </div>
              </aside>

              {/* Form */}
              <div className="contact-form-wrap">
                {sent ? (
                  <div className="form-success">
                    <div className="success-icon">✓</div>
                    <h2>Message Received!</h2>
                    <p>
                      Thank you for reaching out. We'll review your message and get back to you 
                      within 1–2 business days. In the meantime, check out our{' '}
                      <a href="/blog">blog</a> or <a href="/faq">FAQ</a>.
                    </p>
                    <button className="btn btn-primary" onClick={() => { setSent(false); setFields({ name: '', email: '', topic: '', message: '' }); }}>
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form className="contact-form" onSubmit={handleSubmit} noValidate>
                    <h2>Send a Message</h2>

                    <div className="form-row">
                      <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
                        <label htmlFor="name">Full Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={fields.name}
                          onChange={handleChange}
                          placeholder="Jane Smith"
                          autoComplete="name"
                        />
                        {errors.name && <span className="field-error">{errors.name}</span>}
                      </div>
                      <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                        <label htmlFor="email">Email Address *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={fields.email}
                          onChange={handleChange}
                          placeholder="jane@example.com"
                          autoComplete="email"
                        />
                        {errors.email && <span className="field-error">{errors.email}</span>}
                      </div>
                    </div>

                    <div className={`form-group ${errors.topic ? 'has-error' : ''}`}>
                      <label htmlFor="topic">Topic *</label>
                      <select id="topic" name="topic" value={fields.topic} onChange={handleChange}>
                        <option value="">Select a topic…</option>
                        {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      {errors.topic && <span className="field-error">{errors.topic}</span>}
                    </div>

                    <div className={`form-group ${errors.message ? 'has-error' : ''}`}>
                      <label htmlFor="message">Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={fields.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help you on your stewardship journey…"
                      />
                      <span className="char-count">{fields.message.length} characters</span>
                      {errors.message && <span className="field-error">{errors.message}</span>}
                    </div>

                    <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                      {loading ? (
                        <span className="btn-loading"><span className="spinner-sm" /> Sending…</span>
                      ) : (
                        <span><Send size={16} style={{ marginRight: '0.5rem' }} />Send Message</span>
                      )}
                    </button>

                    <p className="form-note">
                      We respect your privacy. Your information is never shared with third parties.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
