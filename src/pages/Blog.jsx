import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock } from 'lucide-react';
import { blogPosts, blogCategories, getPostsByCategory } from '../data/blogPosts';
import './Blog.css';
import AdSensePlaceholder from '../components/ui/AdSensePlaceholder';

export default function Blog() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = getPostsByCategory(category).filter(p =>
    search === '' ||
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.excerpt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="blog-page">
      <div className="blog-page__hero">
        <div className="container">
          <h1>Kingdom Homeschool Blog</h1>
          <p>Practical wisdom, encouragement, and real strategies for the homeschool journey.</p>
        </div>
      </div>

      <div className="container blog-page__content">
        <div className="blog-controls">
          <div className="blog-search-wrap">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="blog-search"
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

        {/* AdSense */}
        <AdSensePlaceholder slot="banner" style={{ marginBottom: '1rem' }} />

        <div className="blog-count">{filtered.length} article{filtered.length !== 1 ? 's' : ''}</div>

        {filtered.length === 0 ? (
          <div className="blog-empty">
            <p>No articles match your search.</p>
            <button onClick={() => { setSearch(''); setCategory('All'); }} className="btn btn--outline">
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
  );
}

export function BlogCard({ post }) {
  return (
    <article className="blog-article-card card">
      <div className="blog-article-card__top">
        <span className="blog-article-category">{post.category}</span>
        {post.featured && <span className="blog-article-featured">Featured</span>}
      </div>
      <Link to={`/blog/${post.slug}`}>
        <h2 className="blog-article-card__title">{post.title}</h2>
      </Link>
      <p className="blog-article-card__excerpt">{post.excerpt}</p>
      <div className="blog-article-card__footer">
        <span className="blog-article-meta"><Clock size={12} /> {post.readTime}</span>
        <Link to={`/blog/${post.slug}`} className="blog-article-link">
          Read Article →
        </Link>
      </div>
    </article>
  );
}
