import { useState, useEffect } from 'react';
import SEOHead from '../components/ui/SEOHead';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../data/siteData';
import './FAQ.css';

export default function FAQ() {
  const [open, setOpen] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const filtered = faqs.filter(f =>
    f.question.toLowerCase().includes(search.toLowerCase()) ||
    f.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <SEOHead
        title="FAQ — KingdomShift KingdomShift Homeschool Hub"
        description="Answers to the most common questions about homeschooling legally, curriculum, tools, and getting started."
        canonical="/faq"
      />
      <div className="faq-page">
        <section className="faq-hero">
          <div className="container">
            <span className="section-label">Got Questions?</span>
            <h1>Frequently Asked <span className="text-gold">Questions</span></h1>
            <p>Everything you need to know about KingdomShift KingdomShift Homeschool Hub and your homeschool journey.</p>
            <div className="faq-search">
              <input
                type="search"
                placeholder="Search questions…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="faq-main">
          <div className="container">
            {filtered.length === 0 ? (
              <div className="faq-empty">
                <p>No questions match "{search}". Try a different search or <a href="/contact">contact us</a>.</p>
              </div>
            ) : (
              <div className="accordion">
                {filtered.map((faq, i) => (
                  <div
                    className={`accordion-item ${open === i ? 'open' : ''}`}
                    key={i}
                  >
                    <button
                      className="accordion-trigger"
                      onClick={() => setOpen(open === i ? null : i)}
                      aria-expanded={open === i}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown size={18} className="accordion-icon" />
                    </button>
                    <div className="accordion-content">
                      <div className="accordion-body">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="faq-cta">
              <h3>Still have questions?</h3>
              <p>Our team is happy to help. Reach out and we'll respond within 1–2 business days.</p>
              <a href="/contact" className="btn btn-primary">Contact Us</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
