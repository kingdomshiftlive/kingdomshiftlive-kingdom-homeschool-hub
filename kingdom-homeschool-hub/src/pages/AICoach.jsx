import { useState, useRef, useEffect } from 'react';
import { Send, BookOpen, Sparkles, RefreshCw } from 'lucide-react';
import './AICoach.css';

const SYSTEM_PROMPT = `You are the KingdomShift KingdomShift KingdomShift Homeschool Hub AI Lesson Planner — a warm, knowledgeable assistant for Christian homeschool families.

Your purpose is to help parents:
1. Create complete, faith-integrated lesson plans for any subject and grade level
2. Suggest curriculum approaches tailored to a child's learning style
3. Answer questions about homeschool methods, scheduling, and state requirements
4. Generate scripture memory activities, Bible integration ideas, and character education moments
5. Help parents troubleshoot challenges in their homeschool

YOUR TONE:
- Warm and encouraging — like a wise homeschool mentor
- Practical and specific — give real, usable lesson plans, not vague ideas
- Faith-centered without being preachy — weave scripture and God naturally

WHEN GENERATING LESSON PLANS:
Always include:
- Day-by-day breakdown (Mon-Fri)
- Bible/scripture connection for each day
- Hands-on or kinesthetic activity
- Learning objectives
- Materials needed
- Assessment idea

Ask clarifying questions if the parent hasn't provided: grade level, learning style, subject focus, or time available.

You are not a licensed educator or lawyer. Always recommend verifying legal requirements with HSLDA or a local homeschool organization.`;

const starterPrompts = [
  { label: '📚 Plan a Week of Lessons', prompt: 'I need a full week lesson plan. My child is in 4th grade. We\'re studying multiplication and the story of Joseph this week. My child is a hands-on learner.' },
  { label: '🌍 History + Bible Integration', prompt: 'Help me teach American history from a biblical worldview perspective for my 8th grader. We\'re starting with the founding era.' },
  { label: '📖 Scripture Memory Activity', prompt: 'Give me a fun scripture memory system for my 6-year-old who is very energetic and loves music.' },
  { label: '⚗️ Faith-Integrated Science', prompt: 'How do I teach the solar system to my 5th grader in a way that reinforces a biblical worldview about creation?' },
  { label: '🎓 High School Planning', prompt: 'Help me build a 9th grade course list that will impress colleges. My student loves writing and history.' },
  { label: '📅 Build a Schedule', prompt: 'I work part-time in the morning. Help me build a realistic homeschool schedule for my 2nd and 5th grader around my work hours.' },
];

export default function AICoach() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Welcome to the KingdomShift KingdomShift KingdomShift Homeschool Hub AI Lesson Planner! 🌿\n\nI\'m here to help you create faith-integrated lesson plans, plan your school year, choose curriculum, build schedules, and answer your homeschool questions.\n\nTell me about your child — their grade, learning style, and what you\'re working on — and I\'ll build something practical for you. Or tap one of the prompts below to get started!',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;
    setInput('');
    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || 'I\'m having trouble responding right now. Please try again.';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry — I encountered an error. Please try again in a moment.' }]);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => setMessages([{
    role: 'assistant',
    content: 'Session reset! Tell me about your child and what you\'d like to plan today. 🌿',
  }]);

  const formatContent = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('# ')) return <h2 key={i} style={{ fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>{line.slice(2)}</h2>;
      if (line.startsWith('## ')) return <h3 key={i} style={{ fontFamily: 'var(--font-display)', marginBottom: '0.4rem', marginTop: '1rem' }}>{line.slice(3)}</h3>;
      if (line.startsWith('**') && line.endsWith('**')) return <p key={i} style={{ fontWeight: 700, marginBottom: '0.3rem' }}>{line.slice(2, -2)}</p>;
      if (line.startsWith('- ') || line.startsWith('• ')) return <li key={i} style={{ marginBottom: '0.25rem', marginLeft: '1rem' }}>{line.slice(2)}</li>;
      if (line === '') return <br key={i} />;
      return <p key={i} style={{ marginBottom: '0.4rem', lineHeight: '1.7' }}>{line}</p>;
    });
  };

  return (
    <div className="ai-coach">
      <div className="ai-coach__hero">
        <div className="container">
          <div className="ai-coach__hero-content">
            <div className="ai-coach__hero-icon">
              <Sparkles size={28} />
            </div>
            <div>
              <h1>AI Lesson Planner</h1>
              <p>Faith-integrated lesson plans, curriculum advice, and homeschool guidance — powered by AI.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container ai-coach__layout">
        {/* Sidebar */}
        <div className="ai-coach__sidebar">
          <div className="card">
            <h3 className="ai-coach__sidebar-title">Quick Start</h3>
            <div className="ai-coach__prompts">
              {starterPrompts.map((p, i) => (
                <button key={i} className="ai-coach__prompt-btn" onClick={() => send(p.prompt)}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <div className="card ai-coach__tips">
            <h3 className="ai-coach__sidebar-title">Tips for Best Results</h3>
            <ul>
              <li>Share your child's <strong>grade level</strong></li>
              <li>Mention their <strong>learning style</strong> (visual, hands-on, auditory)</li>
              <li>Tell me the <strong>subject and topic</strong></li>
              <li>Say how much <strong>time</strong> you have per day</li>
              <li>Mention any <strong>curriculum</strong> you're using</li>
            </ul>
            <p className="ai-coach__disclaimer">
              This tool provides educational planning ideas, not licensed professional advice. 
              Verify homeschool legal requirements with HSLDA or your state's homeschool organization.
            </p>
          </div>
        </div>

        {/* Chat */}
        <div className="ai-coach__chat card">
          <div className="ai-coach__chat-header">
            <div className="ai-coach__chat-title">
              <BookOpen size={18} />
              <span>Kingdom Lesson Planner</span>
            </div>
            <button className="ai-coach__reset" onClick={reset} title="Start new session">
              <RefreshCw size={15} /> New Session
            </button>
          </div>

          <div className="ai-coach__messages">
            {messages.map((m, i) => (
              <div key={i} className={`ai-coach__msg ai-coach__msg--${m.role}`}>
                {m.role === 'assistant' && (
                  <div className="ai-coach__avatar">🌿</div>
                )}
                <div className="ai-coach__bubble">
                  {m.role === 'assistant' ? formatContent(m.content) : m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="ai-coach__msg ai-coach__msg--assistant">
                <div className="ai-coach__avatar">🌿</div>
                <div className="ai-coach__bubble ai-coach__bubble--loading">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="ai-coach__input-row">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Describe your child, grade, subject, and what you need..."
              rows={3}
              disabled={loading}
            />
            <button
              className="ai-coach__send"
              onClick={() => send()}
              disabled={!input.trim() || loading}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
