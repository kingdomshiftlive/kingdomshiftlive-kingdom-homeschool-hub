import { Link } from 'react-router-dom';
import { Heart, BookOpen, Users, Shield } from 'lucide-react';
import './About.css';

const values = [
  {
    icon: <BookOpen size={24} />,
    title: 'Faith First',
    desc: 'Every resource we share is rooted in the belief that God designed families to raise children with purpose, wisdom, and Kingdom identity.',
  },
  {
    icon: <Heart size={24} />,
    title: 'Grace for the Journey',
    desc: 'We meet homeschool families where they are — beginners or veterans, overwhelmed or thriving. No judgment, only support.',
  },
  {
    icon: <Users size={24} />,
    title: 'Community Over Competition',
    desc: 'Homeschooling is better together. We champion co-ops, networks, and families lifting each other up.',
  },
  {
    icon: <Shield size={24} />,
    title: 'Practical & Legal',
    desc: 'We take the legal side seriously. Every family deserves to homeschool confidently and lawfully in their state.',
  },
];

const stats = [
  { num: '3.3M+', label: 'Homeschool students in the US' },
  { num: '50', label: 'States covered in our legal guide' },
  { num: '6', label: 'Original blog articles' },
  { num: '8+', label: 'Curriculum options compared' },
];

export default function About() {
  return (
    <div className="about-page">
      <div className="about-page__hero">
        <div className="container">
          <h1>About KingdomShift Homeschool Hub</h1>
          <p>Built for Kingdom families who are serious about raising the next generation with faith, excellence, and purpose.</p>
        </div>
      </div>

      <div className="container about-page__content">

        <section className="about-page__mission card">
          <div className="about-page__mission-inner">
            <div>
              <h2>Our Mission</h2>
              <p>KingdomShift Homeschool Hub exists because homeschool families deserve more than scattered Google searches and outdated PDFs. They deserve a single trusted place with accurate legal guidance, honest curriculum comparisons, practical planning tools, and encouragement for the hard days.</p>
              <p style={{ marginTop: '1rem' }}>We believe homeschooling is one of the most powerful Kingdom assignments a parent can take on. We built this to make that assignment easier — and more excellent.</p>
            </div>
            <div className="about-page__scripture">
              <blockquote>
                "Train up a child in the way he should go; even when he is old he will not depart from it."
                <cite>— Proverbs 22:6</cite>
              </blockquote>
            </div>
          </div>
        </section>

        <section className="about-page__stats">
          {stats.map((s, i) => (
            <div key={i} className="about-page__stat card">
              <div className="about-page__stat-num">{s.num}</div>
              <div className="about-page__stat-label">{s.label}</div>
            </div>
          ))}
        </section>

        <section className="about-page__values">
          <h2>What We Stand For</h2>
          <div className="about-page__values-grid">
            {values.map((v, i) => (
              <div key={i} className="about-page__value card">
                <div className="about-page__value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-page__what card">
          <h2>What You Will Find Here</h2>
          <div className="about-page__what-grid">
            {[
              { title: 'All 50 State Requirements', desc: 'Click your state and see exactly what is legally required — notice, testing, portfolio, and oversight level.' },
              { title: 'Curriculum Comparison', desc: 'Abeka, Sonlight, Classical Conversations, Teaching Textbooks, and more — compared by approach, grade, and price.' },
              { title: 'AI Lesson Planner', desc: 'Describe your child and subject — get a full week of faith-integrated lesson plans in seconds.' },
              { title: 'Report Card Generator', desc: 'Create and print a professional homeschool report card for your records.' },
              { title: '6 Original Blog Articles', desc: 'Covering getting started, schedules, faith integration, high school prep, burnout, and scripture memory.' },
              { title: 'Resource Library', desc: 'Curated links to HSLDA, co-op finders, testing providers, college prep tools, and free learning resources.' },
            ].map((item, i) => (
              <div key={i} className="about-page__what-item">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-page__cta">
          <h2>Ready to Build Your Kingdom Homeschool?</h2>
          <p>Start with your state legal requirements — then use our free tools to plan, compare curriculum, and build a homeschool your children will thank you for.</p>
          <div className="about-page__cta-btns">
            <Link to="/tools" className="btn btn--primary">Find My State Requirements</Link>
            <Link to="/ai-coach" className="btn btn--outline">Try the AI Lesson Planner</Link>
          </div>
        </section>

      </div>
    </div>
  );
}
