import { Star } from 'lucide-react';
import { testimonials } from '../../data/siteData';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Testimonials.css';

export default function Testimonials() {
  const ref = useScrollReveal();

  return (
    <section className="testimonials section" aria-label="Testimonials">
      <div className="container">
        <div className="section-header centered text-center" ref={ref}>
          <span className="section-eyebrow">Real Stories</span>
          <h2 className="section-title">
            Kingdom Wealth Being Built <em>Right Now</em>
          </h2>
          <p className="section-subtitle">
            These aren't marketing stories — they're real believers using biblical
            principles to transform their financial lives.
          </p>
        </div>

        <div className="testimonials__grid">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} delay={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, delay }) {
  const ref = useScrollReveal();
  return (
    <div
      className={`testimonial-card card reveal reveal-delay-${(delay % 4) + 1}`}
      ref={ref}
    >
      {/* Stars */}
      <div className="testimonial-card__stars">
        {Array.from({ length: testimonial.stars }).map((_, i) => (
          <Star key={i} size={14} fill="currentColor" />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="testimonial-card__quote">
        "{testimonial.quote}"
      </blockquote>

      {/* Author */}
      <div className="testimonial-card__author">
        <div className="testimonial-card__avatar">{testimonial.initials}</div>
        <div>
          <div className="testimonial-card__name">{testimonial.name}</div>
          <div className="testimonial-card__meta">{testimonial.role} · {testimonial.location}</div>
        </div>
      </div>
    </div>
  );
}
