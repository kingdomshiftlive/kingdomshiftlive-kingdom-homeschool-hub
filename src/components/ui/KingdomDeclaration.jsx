import { useState } from 'react';
import { Sparkles, Copy, CheckCircle, RefreshCw } from 'lucide-react';

/**
 * KINGDOM DECLARATION TOOL
 * 
 * Based on Proverbs 18:21 — "Death and life are in the power of the tongue"
 * Mark 11:23 — "He will have whatever he says"
 * Proverbs 23:7 — "As a man thinks in his heart, so is he"
 * 
 * Users select their situation, receive a personalized faith declaration,
 * speak it daily, and return to the site regularly.
 * 
 * BEFORE ITS TIME: No faith-based niche site has this tool in 2026.
 * Drives daily return visits. Increases newsletter conversion.
 * Creates emotional attachment to the platform.
 */

export default function KingdomDeclaration({ niche = 'kingdom', declarations }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [copied, setCopied] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const copy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const nextDeclaration = () => {
    if (!selectedCategory) return;
    const decls = declarations[selectedCategory].declarations;
    setCurrentIndex(i => (i + 1) % decls.length);
  };

  const currentDeclaration = selectedCategory
    ? declarations[selectedCategory].declarations[currentIndex]
    : null;

  return (
    <div className="kingdom-declaration">
      <div className="kingdom-declaration__header">
        <Sparkles size={20} />
        <div>
          <h3>Kingdom Declaration Tool</h3>
          <p>
            "Death and life are in the power of the tongue." — Proverbs 18:21<br />
            Choose your situation. Receive your declaration. Speak it daily.
          </p>
        </div>
      </div>

      <div className="kingdom-declaration__intro">
        <p>
          God spoke creation into existence. You are made in His image. 
          The words you speak consistently shape your reality — this is both 
          biblical truth (Mark 11:23) and confirmed by neuroscience (neuroplasticity). 
          What you declare with conviction, your mind, body, and spirit begin to pursue.
        </p>
      </div>

      <div className="kingdom-declaration__categories">
        <p className="kingdom-declaration__prompt">What are you believing God for today?</p>
        <div className="kingdom-declaration__category-grid">
          {Object.entries(declarations).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => { setSelectedCategory(key); setCurrentIndex(0); }}
              className={`kingdom-declaration__category ${selectedCategory === key ? 'kingdom-declaration__category--active' : ''}`}
            >
              <span className="kingdom-declaration__category-icon">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {selectedCategory && currentDeclaration && (
        <div className="kingdom-declaration__result">
          <div className="kingdom-declaration__scripture">
            <span className="kingdom-declaration__scripture-ref">{currentDeclaration.reference}</span>
            <blockquote>{currentDeclaration.verse}</blockquote>
          </div>

          <div className="kingdom-declaration__text">
            <div className="kingdom-declaration__label">Your Declaration</div>
            <p>{currentDeclaration.declaration}</p>
          </div>

          <div className="kingdom-declaration__instruction">
            <strong>How to use this:</strong> Speak this declaration out loud, 
            with faith, every morning for 30 days. Not as a magic formula — 
            as an alignment of your words with what God has already declared over you.
            What you consistently speak, you consistently become.
          </div>

          <div className="kingdom-declaration__actions">
            <button
              onClick={() => copy(currentDeclaration.declaration)}
              className="btn btn--outline btn--sm"
            >
              {copied ? <><CheckCircle size={14} /> Copied!</> : <><Copy size={14} /> Copy Declaration</>}
            </button>
            {declarations[selectedCategory].declarations.length > 1 && (
              <button onClick={nextDeclaration} className="btn btn--ghost btn--sm">
                <RefreshCw size={14} /> Different Declaration
              </button>
            )}
          </div>
        </div>
      )}

      <div className="kingdom-declaration__footer">
        <p>
          <strong>The science behind this:</strong> Neuroscience confirms that 
          repeated declarations rewire neural pathways through neuroplasticity. 
          What you speak consistently, your brain begins to believe and pursue. 
          God designed this before science named it.
        </p>
      </div>
    </div>
  );
}
