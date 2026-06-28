import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Clock, Tag, Share2 } from 'lucide-react';
import { getPostBySlug, getRelatedPosts } from '../data/blogPosts';
import SEOHead from '../components/ui/SEOHead';
import Newsletter from '../components/sections/Newsletter';
import './BlogPost.css';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) return <Navigate to="/blog" replace />;

  const related = getRelatedPosts(post.id, post.category);

  // Simple markdown-to-HTML (headings, paragraphs, bold, lists)
  const renderContent = (text) => {
    const lines = text.split('\n');
    const elements = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i].trim();
      if (!line) { i++; continue; }

      if (line.startsWith('## ')) {
        elements.push(<h2 key={i}>{line.slice(3)}</h2>);
      } else if (line.startsWith('**') && line.endsWith('**')) {
        elements.push(<h3 key={i}>{line.slice(2, -2)}</h3>);
      } else if (line.startsWith('- ')) {
        const items = [];
        while (i < lines.length && lines[i].startsWith('- ')) {
          items.push(<li key={i}>{lines[i].slice(2)}</li>);
          i++;
        }
        elements.push(<ul key={`ul-${i}`}>{items}</ul>);
        continue;
      } else if (line.startsWith('---')) {
        elements.push(<hr key={i} />);
      } else {
        // Parse inline bold
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        const rendered = parts.map((p, j) =>
          p.startsWith('**') ? <strong key={j}>{p.slice(2, -2)}</strong> : p
        );
        elements.push(<p key={i}>{rendered}</p>);
      }
      i++;
    }
    return elements;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      <SEOHead title={post.title} description={post.excerpt} />

      <div className="blog-post-page">
        <div className="container">
          {/* Back */}
          <div className="blog-post__back">
            <Link to="/blog" className="btn btn-ghost btn-sm">
              <ArrowLeft size={16} /> Back to Blog
            </Link>
          </div>

          {/* Article layout */}
          <div className="blog-post__layout">
            <article className="blog-post__article">
              {/* Header */}
              <header className="blog-post__header">
                <div className="blog-post__badges">
                  <span className="badge badge-gold">{post.category}</span>
                  {post.featured && <span className="badge badge-navy">Featured</span>}
                </div>
                <h1 className="blog-post__title">{post.title}</h1>
                <p className="blog-post__excerpt">{post.excerpt}</p>
                <div className="blog-post__meta">
                  <span><Clock size={14} /> {post.readTime}</span>
                  <span>Published {post.date}</span>
                  <button onClick={handleShare} className="blog-post__share">
                    <Share2 size={14} /> Share
                  </button>
                </div>
              </header>

              {/* Content */}
              <div className="blog-post__content prose">
                {renderContent(post.content)}
              </div>

              {/* Tags */}
              <div className="blog-post__tags">
                <Tag size={14} />
                {post.tags.map(tag => (
                  <span key={tag} className="blog-tag">{tag}</span>
                ))}
              </div>

              {/* Author */}
              <div className="blog-post__author">
                <div className="blog-post__author-avatar">FW</div>
                <div>
                  <div className="blog-post__author-name">{post.author}</div>
                  <div className="blog-post__author-bio">{post.authorBio}</div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="blog-post__sidebar">
              {/* CTA */}
              <div className="blog-sidebar__card">
                <h3>Free Financial Tools</h3>
                <p>Put these principles into practice with our free calculators.</p>
                <Link to="/tools" className="btn btn-primary btn-sm" style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}>
                  Try Free Tools
                </Link>
              </div>

              {/* AI Coach */}
              <div className="blog-sidebar__card">
                <h3>Ask the AI Coach</h3>
                <p>Have a specific question about this article? Our AI Stewardship Coach can help.</p>
                <Link to="/ai-coach" className="btn btn-outline btn-sm" style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}>
                  Open AI Coach
                </Link>
              </div>

              {/* Related */}
              {related.length > 0 && (
                <div className="blog-sidebar__card">
                  <h3>Related Articles</h3>
                  <div className="blog-sidebar__related">
                    {related.map(p => (
                      <Link key={p.id} to={`/blog/${p.slug}`} className="blog-sidebar__related-item">
                        <span className="blog-sidebar__related-cat">{p.category}</span>
                        <span className="blog-sidebar__related-title">{p.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>

      <Newsletter />
    </>
  );
}
