import { Link } from 'react-router-dom';
import { Calculator, BookOpen, Bot, Download, TrendingUp, Heart } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Features.css';

const features = [
  {
    icon: Calculator,
    color: 'gold',
    title: '6 Financial Calculators',
    description: 'Budget, debt payoff, savings, emergency fund, net worth, and cash flow — all with real math and instant results.',
    link: '/tools',
    linkLabel: 'Use Free Tools',
  },
  {
    icon: BookOpen,
    color: 'navy',
    title: 'Biblical Finance Blog',
    description: 'Practical articles on getting started, scheduling, curriculum, faith integration, high school prep, and avoiding burnout.',
    link: '/blog',
    linkLabel: 'Read Articles',
  },
  {
    icon: Bot,
    color: 'green',
    title: 'AI Stewardship Coach',
    description: 'Generate complete faith-integrated lesson plans tailored to your child's grade and learning style.',
    link: '/ai-coach',
    linkLabel: 'Meet the Coach',
  },
  {
    icon: Download,
    color: 'gold',
    title: 'Free Resource Library',
    description: 'Download budget worksheets, debt trackers, savings planners, and curated book and tool recommendations.',
    link: '/resources',
    linkLabel: 'Get Resources',
  },
  {
    icon: TrendingUp,
    color: 'navy',
    title: 'Wealth Building Framework',
    description: 'The Kingdom 10-20-70 system: tithe first, build next, live on the rest. A framework for every income level.',
    link: '/blog',
    linkLabel: 'Learn the System',
  },
  {
    icon: Heart,
    color: 'green',
    title: 'Faith-Integrated Approach',
    description: 'No prosperity gospel. No poverty theology. Just honest, Scripture-grounded financial education for modern believers.',
    link: '/about',
    linkLabel: 'Our Approach',
  },
];

export default function Features() {
  const ref = useScrollReveal();

  return (
    <section className="features section bg-subtle" aria-label="Features">
      <div className="container">
        <div className="section-header centered text-center" ref={ref}>
          <span className="section-eyebrow">What's Inside</span>
          <h2 className="section-title">
            Everything You Need to Build <em>Kingdom Wealth</em>
          </h2>
          <p className="section-subtitle">
            Practical tools. Faith-rooted content. No fluff. KingdomShift Homeschool Hub gives you
            the complete system to transform your financial life.
          </p>
        </div>

        <div className="features__grid">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} delay={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, delay }) {
  const ref = useScrollReveal();
  const { icon: Icon, color, title, description, link, linkLabel } = feature;

  return (
    <div
      className={`feature-card card card-gold-border reveal reveal-delay-${(delay % 4) + 1}`}
      ref={ref}
    >
      <div className={`feature-card__icon feature-card__icon--${color}`}>
        <Icon size={22} />
      </div>
      <h3 className="feature-card__title">{title}</h3>
      <p className="feature-card__desc">{description}</p>
      <Link to={link} className="feature-card__link">
        {linkLabel} →
      </Link>
    </div>
  );
}
