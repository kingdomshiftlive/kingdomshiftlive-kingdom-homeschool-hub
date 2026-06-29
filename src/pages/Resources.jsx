import { ExternalLink, CheckCircle, XCircle } from 'lucide-react';
import { resources, curriculumOptions } from '../data/siteData';
import './Resources.css';

export default function Resources() {
  return (
    <div className="resources-page">
      <div className="resources-page__hero">
        <div className="container">
          <h1>Homeschool Resources</h1>
          <p>Curated tools, organizations, and curriculum providers trusted by Kingdom homeschool families.</p>
        </div>
      </div>

      <div className="container resources-page__content">
        {resources.map((section, i) => (
          <div key={i} className="resources-page__section">
            <h2 className="resources-page__section-title">{section.category}</h2>
            <div className="resources-page__grid">
              {section.items.map((item, j) => (
                <div key={j} className="card resources-page__card">
                  <div className="resources-page__card-header">
                    <h3>{item.name}</h3>
                    <span className={`resources-page__badge ${item.free ? 'resources-page__badge--free' : 'resources-page__badge--paid'}`}>
                      {item.free ? 'Free' : 'Paid'}
                    </span>
                  </div>
                  <p>{item.desc}</p>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="resources-page__link">
                    Visit Resource <ExternalLink size={13} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="resources-page__section" id="coops">
          <h2 className="resources-page__section-title">Find a Homeschool Co-op</h2>
          <div className="card resources-page__coop-card">
            <p>Homeschool co-ops meet regularly so families can share teaching, provide socialization, and build community. They range from small informal groups meeting in homes to large organizations with hundreds of students.</p>
            <div className="resources-page__coop-links">
              {[
                { name: 'HSLDA Co-op Finder', url: 'https://hslda.org/resources', desc: 'State-by-state co-op directory' },
                { name: 'Classical Conversations Locator', url: 'https://classicalconversations.com', desc: 'Find a CC community near you' },
                { name: 'Home-School.com Groups', url: 'https://www.home-school.com', desc: 'National co-op search tool' },
              ].map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="resources-page__coop-link">
                  <div>
                    <strong>{link.name}</strong>
                    <span>{link.desc}</span>
                  </div>
                  <ExternalLink size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="resources-page__affiliate-notice card">
          <p>
            <strong>Affiliate Disclosure:</strong> Some links on this page are affiliate links. 
            When you purchase through these links, KingdomShift Homeschool Hub may earn a small commission at no additional cost to you. 
            We only feature resources we genuinely believe serve homeschool families well.
          </p>
        </div>
      </div>
    </div>
  );
}
