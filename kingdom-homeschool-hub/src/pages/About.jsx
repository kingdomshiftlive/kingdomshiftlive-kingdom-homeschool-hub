import { useEffect } from 'react';
import SEOHead from '../components/ui/SEOHead';
import { BookOpen, Target, Heart, Award, Users, Lightbulb } from 'lucide-react';
import './About.css';

const values = [
  {
    icon: <BookOpen size={24} />,
    title: 'Scripture-Centered',
    desc: 'Every financial principle we share is rooted in biblical truth. We believe God\'s Word is the ultimate guide for money management.',
  },
  {
    icon: <Target size={24} />,
    title: 'Practically Actionable',
    desc: 'Faith without works is dead. We pair spiritual wisdom with real tools, calculators, and strategies you can apply today.',
  },
  {
    icon: <Heart size={24} />,
    title: 'Grace-Based',
    desc: 'We meet people where they are — no shame, no judgment. Every financial journey starts with a single step forward.',
  },
  {
    icon: <Award size={24} />,
    title: 'Integrity First',
    desc: 'We only recommend products we believe in. Our affiliate relationships are transparent and our advice is never compromised.',
  },
  {
    icon: <Users size={24} />,
    title: 'Community Driven',
    desc: 'Wealth-building is better together. We\'re building a community where believers encourage, challenge, and celebrate each other.',
  },
  {
    icon: <Lightbulb size={24} />,
    title: 'Wisdom Over Wealth',
    desc: 'We don\'t chase riches — we pursue wisdom. True financial freedom is a byproduct of honoring God with every dollar.',
  },
];

const team = [
  {
    name: 'Marcus A. Thompson',
    role: 'Founder & Lead Coach',
    bio: 'Former corporate finance director turned biblical wealth educator. Marcus spent 15 years on Wall Street before answering a call to help believers steward their resources for Kingdom impact.',
    image: null,
    initials: 'MT',
    scripture: 'Matthew 6:33',
  },
  {
    name: 'Priscilla W. James',
    role: 'Financial Strategist',
    bio: 'Certified Financial Planner with a heart for ministry. Priscilla specializes in debt elimination and family budgeting, and has helped over 400 families become debt-free.',
    image: null,
    initials: 'PJ',
    scripture: 'Proverbs 21:5',
  },
  {
    name: 'David K. Osei',
    role: 'Content & Community',
    bio: 'David brings together theology and practical economics in his writing and teaching. He holds a Master of Divinity and an MBA, and lives what he preaches.',
    image: null,
    initials: 'DO',
    scripture: 'Deuteronomy 8:18',
  },
];

const milestones = [
  { year: '2019', event: 'Faith Wealth Blueprint launched as a personal blog' },
  { year: '2020', event: 'First online course released — 500+ students enrolled in 60 days' },
  { year: '2021', event: 'Community grew to 10,000 subscribers; podcast launched' },
  { year: '2022', event: 'AI Stewardship Coach prototype developed; tools suite launched' },
  { year: '2023', event: '25,000+ community members; partnered with 3 faith-based financial nonprofits' },
  { year: '2024', event: 'Rebranded and relaunched with full digital platform' },
];

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="About Us — Faith Wealth Blueprint"
        description="Learn about our mission to help believers build wealth God's way. Meet the team, explore our values, and join a community of faithful stewards."
        canonical="/about"
      />
      <div className="about-page">
        {/* Hero */}
        <section className="about-hero">
          <div className="container">
            <span className="section-label">Our Story</span>
            <h1>
              Built on <span className="text-gold">Faith.</span><br />
              Focused on <span className="text-gold">Freedom.</span>
            </h1>
            <p>
              Faith Wealth Blueprint was born from a simple conviction: that the Bible has everything 
              we need to manage money wisely, build lasting wealth, and live generously — and that 
              most believers just need someone to show them how.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="about-mission">
          <div className="container">
            <div className="mission-grid">
              <div className="mission-text">
                <span className="section-label">Our Mission</span>
                <h2>Equipping Believers to Steward Well</h2>
                <p>
                  We exist to bridge the gap between biblical wisdom and practical financial strategy. 
                  Too many Christians feel guilty about money, confused about wealth, or disconnected 
                  from God when it comes to their finances.
                </p>
                <p>
                  We believe that changes when believers discover that God cares deeply about their 
                  financial lives — and that He's already given us everything we need to thrive.
                </p>
                <blockquote className="scripture-pull">
                  <span className="quote-mark">"</span>
                  Seek first the kingdom of God and His righteousness, and all these things 
                  will be added to you.
                  <cite>— Matthew 6:33</cite>
                </blockquote>
              </div>
              <div className="mission-stats">
                <div className="stat-card">
                  <span className="stat-number">25K+</span>
                  <span className="stat-label">Community Members</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">$4.2M</span>
                  <span className="stat-label">Debt Eliminated</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Families Coached</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">6</span>
                  <span className="stat-label">Years of Ministry</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="about-values">
          <div className="container">
            <div className="section-header text-center">
              <span className="section-label">What We Believe</span>
              <h2>Core Values That Guide Everything</h2>
              <p>These aren't statements on a wall. They're the principles that shape every article, tool, and conversation we have.</p>
            </div>
            <div className="values-grid">
              {values.map((v, i) => (
                <div className="value-card" key={i}>
                  <div className="value-icon">{v.icon}</div>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="about-team">
          <div className="container">
            <div className="section-header text-center">
              <span className="section-label">The People Behind the Platform</span>
              <h2>Meet the Team</h2>
              <p>Real people. Real faith. Real financial transformation.</p>
            </div>
            <div className="team-grid">
              {team.map((member, i) => (
                <div className="team-card" key={i}>
                  <div className="team-avatar">
                    <span>{member.initials}</span>
                  </div>
                  <h3>{member.name}</h3>
                  <span className="team-role">{member.role}</span>
                  <p>{member.bio}</p>
                  <div className="team-scripture">
                    <span>Life Verse: </span>
                    <strong>{member.scripture}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="about-timeline">
          <div className="container">
            <div className="section-header text-center">
              <span className="section-label">Our Journey</span>
              <h2>Where We've Been. Where We're Going.</h2>
            </div>
            <div className="timeline">
              {milestones.map((m, i) => (
                <div className="timeline-item" key={i}>
                  <div className="timeline-year">{m.year}</div>
                  <div className="timeline-dot" />
                  <div className="timeline-content">{m.event}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="about-cta">
          <div className="container">
            <div className="cta-card">
              <h2>Ready to Start Your Journey?</h2>
              <p>Join thousands of believers who are building wealth with wisdom, intention, and faith.</p>
              <div className="cta-buttons">
                <a href="/tools" className="btn btn-primary">Explore Our Tools</a>
                <a href="/blog" className="btn btn-outline-light">Read the Blog</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
