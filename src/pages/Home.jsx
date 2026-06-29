import { Link } from 'react-router-dom';
import { BookOpen, Map, Brain, Users, Star, ArrowRight, CheckCircle } from 'lucide-react';
import { testimonials } from '../data/siteData';
import { blogPosts } from '../data/blogPosts';
import './Home.css';
import AdSensePlaceholder from '../components/ui/AdSensePlaceholder';

const features = [
  {
    icon: <Map size={28} />,
    title: 'All 50 State Requirements',
    desc: 'Find your state\'s homeschool laws instantly — notice requirements, testing rules, portfolio guidance, and oversight level.',
    link: '/tools',
    cta: 'Look up your state',
  },
  {
    icon: <BookOpen size={28} />,
    title: 'Curriculum Comparison',
    desc: 'Compare Abeka, Sonlight, Classical Conversations, Teaching Textbooks, and more side-by-side by grade, approach, and price.',
    link: '/resources',
    cta: 'Compare curricula',
  },
  {
    icon: <Brain size={28} />,
    title: 'AI Lesson Planner',
    desc: 'Describe your child\'s grade, learning style, and goals — get a full week of faith-integrated lesson plans in seconds.',
    link: '/ai-coach',
    cta: 'Plan a lesson',
  },
  {
    icon: <Users size={28} />,
    title: 'Co-op & Community Finder',
    desc: 'Homeschooling doesn\'t mean homeschooling alone. Find co-ops, support groups, and community resources in your area.',
    link: '/resources#coops',
    cta: 'Find community',
  },
];

const benefits = [
  'Faith woven into every subject, not just Bible class',
  'Education customized to your child\'s pace and learning style',
  'Legal protection: know your rights in every state',
  'Curriculum that fits your budget and approach',
  'Community tools to avoid isolation',
  'High school planning for college and beyond',
];

export default function Home() {
  const featured = blogPosts.filter(p => p.featured).slice(0, 3);

  return (
    <div className="home">
      {/* Hero */}
      <section className="home__hero">
        <div className="container home__hero-inner">
          <div className="home__hero-content">
            <div className="home__hero-badge">
              <BookOpen size={14} /> Kingdom Education at Home
            </div>
            <h1 className="home__hero-title">
              Raise World-Changers<br />
              <span className="home__hero-title-accent">Right at Your Kitchen Table</span>
            </h1>
            <p className="home__hero-sub">
              Everything Kingdom families need to homeschool with confidence — state legal guides, curriculum tools, 
              an AI Lesson Planner, and resources to raise children who know their God-given purpose.
            </p>
            <div className="home__hero-actions">
              <Link to="/tools" className="btn btn--primary btn--lg">
                Find My State's Requirements <ArrowRight size={18} />
              </Link>
              <Link to="/ai-coach" className="btn btn--outline btn--lg">
                Try the AI Lesson Planner
              </Link>
            </div>
            <p className="home__hero-scripture">
              "Train up a child in the way he should go; even when he is old he will not depart from it." — Proverbs 22:6
            </p>
          </div>
          <div className="home__hero-visual">
            <div className="home__hero-card">
              <div className="home__hero-card-header">
                <span className="home__hero-card-dot home__hero-card-dot--green"></span>
                <span className="home__hero-card-dot home__hero-card-dot--amber"></span>
                <span className="home__hero-card-title">AI Lesson Planner</span>
              </div>
              <div className="home__hero-card-body">
                <div className="home__hero-msg home__hero-msg--user">
                  "3rd grade, loves nature, hands-on learner. This week: fractions + Genesis 1 creation."
                </div>
                <div className="home__hero-msg home__hero-msg--ai">
                  <strong>Monday:</strong> Fraction pizza — divide dough into halves, thirds, quarters while discussing God dividing light from darkness...<br/><br/>
                  <strong>Tuesday:</strong> Nature walk counting creation. Sort findings by fractions (half animals, half plants)...
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="home__stats">
        <div className="container home__stats-inner">
          {[
            { num: '3.3M+', label: 'Homeschool students in the US' },
            { num: '50', label: 'States covered in our legal guide' },
            { num: '8+', label: 'Curriculum options compared' },
            { num: '100%', label: 'Faith-integrated tools' },
          ].map((s, i) => (
            <div key={i} className="home__stat">
              <div className="home__stat-num">{s.num}</div>
              <div className="home__stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* AdSense — Banner between stats and features */}
      <div className="container" style={{ padding: '0.5rem 1.5rem' }}>
        <AdSensePlaceholder slot="banner" />
      </div>

      {/* Features */}
      <section className="home__features section">
        <div className="container">
          <div className="section-header">
            <h2>Everything You Need to Homeschool with Confidence</h2>
            <p>Free tools built specifically for Kingdom families who are serious about their children's education and faith.</p>
          </div>
          <div className="home__features-grid">
            {features.map((f, i) => (
              <div key={i} className="home__feature-card card">
                <div className="home__feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <Link to={f.link} className="home__feature-link">
                  {f.cta} <ArrowRight size={15} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why homeschool */}
      <section className="home__why section">
        <div className="container home__why-inner">
          <div className="home__why-content">
            <h2>You Were Made for This</h2>
            <p className="home__why-lead">
              Homeschooling is one of the most powerful Kingdom assignments a parent can take on. It's not easy — 
              but it's worth it. And you don't have to figure it out alone.
            </p>
            <ul className="home__benefits">
              {benefits.map((b, i) => (
                <li key={i} className="home__benefit">
                  <CheckCircle size={18} className="home__benefit-check" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <Link to="/tools" className="btn btn--primary">
              Start with My State's Laws <ArrowRight size={16} />
            </Link>
          </div>
          <div className="home__why-visual">
            <div className="home__why-quote">
              <blockquote>
                "Homeschooling is not just an educational choice. It is a Kingdom assignment — 
                to raise the next generation of world-changers, marketplace leaders, and 
                faith-filled families who transform every sphere they enter."
              </blockquote>
            </div>
            <div className="home__approaches">
              {['Classical', 'Charlotte Mason', 'Unit Studies', 'Traditional', 'Eclectic'].map(a => (
                <span key={a} className="home__approach-tag">{a}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="home__testimonials section">
        <div className="container">
          <div className="section-header">
            <h2>Kingdom Families Are Thriving</h2>
            <p>From Texas to Ohio to Georgia — real families, real results.</p>
          </div>
          <div className="home__testimonials-grid">
            {testimonials.map(t => (
              <div key={t.id} className="home__testimonial card">
                <div className="home__testimonial-stars">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="home__testimonial-quote">"{t.quote}"</p>
                <div className="home__testimonial-author">
                  <div className="home__testimonial-avatar">{t.avatar}</div>
                  <div>
                    <div className="home__testimonial-name">{t.name}</div>
                    <div className="home__testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog preview */}
      <section className="home__blog section">
        <div className="container">
          <div className="section-header">
            <h2>From the Blog</h2>
            <p>Practical wisdom for the Kingdom homeschool journey.</p>
          </div>
          <div className="home__blog-grid">
            {featured.map(post => (
              <div key={post.id} className="home__blog-card card">
                <div className="home__blog-category">{post.category}</div>
                <h3 className="home__blog-title">{post.title}</h3>
                <p className="home__blog-excerpt">{post.excerpt}</p>
                <div className="home__blog-meta">
                  <span>{post.readTime}</span>
                  <Link to={`/blog/${post.slug}`} className="home__blog-link">
                    Read article <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/blog" className="btn btn--outline">View All Articles</Link>
          </div>
        </div>
      </section>

      {/* AdSense — Banner before CTA */}
      <div className="container" style={{ padding: '0.5rem 1.5rem' }}>
        <AdSensePlaceholder slot="rectangle" />
      </div>

      {/* CTA */}
      <section className="home__cta">
        <div className="container home__cta-inner">
          <h2>Ready to Build Your Kingdom Homeschool?</h2>
          <p>Start with your state's legal requirements — then use our free tools to plan, curriculum-shop, and build a homeschool your children will thank you for.</p>
          <div className="home__cta-actions">
            <Link to="/tools" className="btn btn--primary btn--lg">Find My State's Requirements</Link>
            <Link to="/ai-coach" className="btn btn--ghost btn--lg">Try the AI Lesson Planner</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
