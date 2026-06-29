import { useState, useEffect } from 'react';
import { Heart, Send, Users } from 'lucide-react';

/**
 * COMMUNITY PRAYER & INTENTION BOARD
 * Users post what they are believing God for in this niche
 * Before-its-time feature — community platforms will charge for this by 2028
 * Uses localStorage for persistence (buyer can upgrade to database later)
 */
export default function CommunityBoard({ niche = 'Kingdom', placeholder = 'Share what you are believing God for...' }) {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`${niche}-community-board`);
      if (saved) setPosts(JSON.parse(saved));
      else {
        // Seed with starter posts
        const seeds = [
          { id: 1, name: 'Rachel M.', text: 'Believing God for a fruitful harvest this season — first year with raised beds!', time: '2 days ago', hearts: 12 },
          { id: 2, name: 'James K.', text: 'Praying for wisdom as we expand our homestead. Trusting Proverbs 3:5-6.', time: '5 days ago', hearts: 8 },
          { id: 3, name: 'Danielle W.', text: 'Grateful for this community. God is faithful in every season of growth.', time: '1 week ago', hearts: 21 },
        ];
        setPosts(seeds);
      }
    } catch {}
  }, [niche]);

  const save = (updated) => {
    try { localStorage.setItem(`${niche}-community-board`, JSON.stringify(updated)); } catch {}
    setPosts(updated);
  };

  const addHeart = (id) => {
    const updated = posts.map(p => p.id === id ? { ...p, hearts: (p.hearts || 0) + 1 } : p);
    save(updated);
  };

  const submit = () => {
    if (!input.trim()) return;
    const newPost = {
      id: Date.now(),
      name: name.trim() || 'Kingdom Community',
      text: input.trim(),
      time: 'Just now',
      hearts: 0,
    };
    const updated = [newPost, ...posts].slice(0, 50);
    save(updated);
    setInput('');
    setName('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="community-board">
      <div className="community-board__header">
        <Users size={20} />
        <div>
          <h3>Kingdom Community Board</h3>
          <p>Share what you are believing God for. Encourage one another.</p>
        </div>
      </div>

      <div className="community-board__form">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your first name (optional)"
          className="community-board__name"
          maxLength={30}
        />
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={placeholder}
          rows={3}
          maxLength={280}
          className="community-board__input"
        />
        <div className="community-board__form-footer">
          <span className="community-board__char">{input.length}/280</span>
          {submitted ? (
            <span className="community-board__success">✓ Posted! God sees your faith.</span>
          ) : (
            <button onClick={submit} disabled={!input.trim()} className="btn btn--primary btn--sm">
              <Send size={14} /> Post
            </button>
          )}
        </div>
      </div>

      <div className="community-board__posts">
        {posts.map(post => (
          <div key={post.id} className="community-board__post">
            <div className="community-board__post-header">
              <div className="community-board__avatar">
                {(post.name || 'K')[0].toUpperCase()}
              </div>
              <div>
                <strong>{post.name}</strong>
                <span>{post.time}</span>
              </div>
            </div>
            <p>{post.text}</p>
            <button onClick={() => addHeart(post.id)} className="community-board__heart">
              <Heart size={14} /> {post.hearts || 0}
            </button>
          </div>
        ))}
      </div>

      <p className="community-board__note">
        This is a faith community space. Posts are stored locally and visible only to you until connected to a database. 
        See README for how to connect to a real-time backend.
      </p>
    </div>
  );
}
