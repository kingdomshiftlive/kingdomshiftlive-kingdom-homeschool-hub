import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Shield, BookOpen } from 'lucide-react';
import './Hero.css';

const stats = [
  { value: '6', label: 'Free Calculators', icon: TrendingUp },
  { value: '50+', label: 'Biblical Articles', icon: BookOpen },
  { value: '4,200+', label: 'Subscribers', icon: Shield },
];

export default function Hero() {
  return (
    <section className="hero" aria-label="Hero">
      {/* Background elements */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__bg-gradient" />
        <div className="hero__bg-grid" />
        <div className="hero__bg-orb hero__bg-orb--1" />
        <div className="hero__bg-orb hero__bg-orb--2" />
      </div>

      <div className="container hero__container">
        <div className="hero__content">
          {/* Eyebrow */}
          <div className="hero__eyebrow">
            <span className="badge badge-gold">✦ Kingdom Financial Education</span>
          </div>

          {/* Headline */}
          <h1 className="hero__title">
            Build Wealth With{' '}
            <em className="hero__title-accent">Biblical</em>{' '}
            Wisdom & Modern Strategy
          </h1>

          {/* Subhead */}
          <p className="hero__subtitle">
            KingdomShift Homeschool Hub bridges Scripture and personal finance — giving you
            the tools, principles, and guidance to steward money with purpose, eliminate
            debt, and build lasting Kingdom wealth.
          </p>

          {/* Scripture */}
          <blockquote className="hero__scripture">
            <p>"But seek first his kingdom and his righteousness, and all these things will be given to you as well."</p>
            <cite>Matthew 6:33 (NIV)</cite>
          </blockquote>

          {/* CTA Buttons */}
          <div className="hero__actions">
            <Link to="/tools" className="btn btn-primary btn-lg">
              Start With Free Tools <ArrowRight size={18} />
            </Link>
            <Link to="/blog" className="btn btn-outline btn-lg">
              Read the Blog
            </Link>
          </div>

          {/* Stats */}
          <div className="hero__stats">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="hero__stat">
                <Icon size={18} className="hero__stat-icon" />
                <div>
                  <span className="hero__stat-value">{value}</span>
                  <span className="hero__stat-label">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Card Panel */}
        <div className="hero__visual" aria-hidden="true">
          <div className="hero__card hero__card--main">
            <div className="hero__card-header">
              <div className="hero__card-dot hero__card-dot--1" />
              <div className="hero__card-dot hero__card-dot--2" />
              <div className="hero__card-dot hero__card-dot--3" />
              <span className="hero__card-title">Kingdom Budget Overview</span>
            </div>
            <div className="hero__card-content">
              <div className="hero__budget-row">
                <span>Tithes & Giving</span>
                <span className="hero__budget-pct hero__budget-pct--give">10%</span>
                <div className="hero__budget-bar">
                  <div className="hero__budget-fill" style={{ width: '10%', background: '#5d9170' }} />
                </div>
              </div>
              <div className="hero__budget-row">
                <span>Savings & Investing</span>
                <span className="hero__budget-pct hero__budget-pct--save">20%</span>
                <div className="hero__budget-bar">
                  <div className="hero__budget-fill" style={{ width: '20%', background: '#C9A84C' }} />
                </div>
              </div>
              <div className="hero__budget-row">
                <span>Living Expenses</span>
                <span className="hero__budget-pct">70%</span>
                <div className="hero__budget-bar">
                  <div className="hero__budget-fill" style={{ width: '70%', background: '#1B2E5A' }} />
                </div>
              </div>
              <div className="hero__income-display">
                <span>Monthly Income</span>
                <strong>$5,000</strong>
              </div>
            </div>
          </div>

          {/* Floating accent cards */}
          <div className="hero__card hero__card--float hero__card--float-1">
            <div className="hero__mini-icon">🎯</div>
            <div>
              <div className="hero__mini-value">Debt-Free</div>
              <div className="hero__mini-label">in 3.5 years</div>
            </div>
          </div>

          <div className="hero__card hero__card--float hero__card--float-2">
            <div className="hero__mini-icon">📖</div>
            <div>
              <div className="hero__mini-value">800+ Verses</div>
              <div className="hero__mini-label">on money & stewardship</div>
            </div>
          </div>

          <div className="hero__card hero__card--float hero__card--float-3">
            <div className="hero__mini-icon">✅</div>
            <div>
              <div className="hero__mini-value">Emergency Fund</div>
              <div className="hero__mini-label">$4,200 saved</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
