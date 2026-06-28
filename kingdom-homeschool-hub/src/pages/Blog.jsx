import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, Tag } from 'lucide-react';
import { blogPosts, blogCategories, getPostsByCategory } from '../data/blogPosts';
import SEOHead from '../components/ui/SEOHead';
import './Blog.css';

export default function Blog() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = getPostsByCategory(category).filter(p =>
    search === '' ||
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <SEOHead
        title="Biblical Finance Blog"
        description="In-depth articles connecting Scripture to practical money decisions. Debt freedom, budgeting, investing, and Kingdom wealth from a biblical perspective."
      />

      <section className="page-hero">
        <div className="container">
          <span className="section-eyebrow">The Blog</span>
          <h1 className="page-hero__title">Biblical Finance, <em>Applied</em></h1>
          <p className="page-hero__subtitle">
            Scripture and strategy. Principles and practice. Articles for believers
            who take both their faith and their finances seriously.
          </p>
        </div>
      </section>

      <div className="blog-page section">
        <div className="container">
          {/* Controls */}
          <div className="blog-controls">
            <div className="blog-search-wrap">
              <Search size={16} className="blog-search-icon" />
              <input
                type="text"
                placeholder="Search articles, topics, or scriptures..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="form-input blog-search"
                aria-label="Search articles"
              />
            </div>
            <div className="blog-categories">
              {blogCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`blog-cat-btn ${category === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="blog-count">{filtered.length} article{filtered.length !== 1 ? 's' : ''}</div>

          {filtered.length === 0 ? (
            <div className="blog-empty">
              <p>No articles match "{search}" in {category}.</p>
              <button onClick={() => { setSearch(''); setCategory('All'); }} className="btn btn-outline">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="blog-grid">
              {filtered.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export function BlogCard({ post }) {
  return (
    <article className="blog-article-card card">
      <div className="blog-article-card__top">
        <span className="badge badge-gold">{post.category}</span>
        {post.featured && <span className="badge badge-navy">Featured</span>}
      </div>
      <Link to={`/blog/${post.slug}`}>
        <h2 className="blog-article-card__title">{post.title}</h2>
      </Link>
      <p className="blog-article-card__excerpt">{post.excerpt}</p>
      <div className="blog-article-card__footer">
        <div className="blog-article-card__meta">
          <span><Clock size={12} /> {post.readTime}</span>
          <span>{post.date}</span>
        </div>
        <div className="blog-article-card__tags">
          {post.tags.slice(0, 3).map(tag => (
            <span key={tag} className="blog-tag"><Tag size={10} /> {tag}</span>
          ))}
        </div>
      </div>
      <Link to={`/blog/${post.slug}`} className="btn btn-ghost btn-sm blog-article-card__cta">
        Read Article →
      </Link>
    </article>
  );
}
