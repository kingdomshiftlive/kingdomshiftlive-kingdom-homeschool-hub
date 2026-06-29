import { useState } from 'react';
import { Search, MapPin, BookOpen, FileText, Brain, Bell, FolderOpen, Calendar, Users, Mic } from 'lucide-react';
import CommunityBoard from '../components/ui/CommunityBoard';
import KingdomDeclaration from '../components/ui/KingdomDeclaration';
import { homeschoolDeclarations } from '../data/declarationData';
import KingdomCalendar from '../components/ui/KingdomCalendar';
import { homeschoolCalendar } from '../data/calendarData';
import { stateRequirements, curriculumOptions } from '../data/siteData';
import './Tools.css';

const oversightColors = {
  'Low': '#4A7C4A',
  'Medium': '#C98A18',
  'Medium-High': '#E07050',
  'High': '#C0392B',
};

export default function Tools() {
  const [stateQuery, setStateQuery] = useState('');
  const [selectedState, setSelectedState] = useState(null);
  const [curriculumFilter, setCurriculumFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('states');

  const filtered = stateRequirements.filter(s =>
    s.state.toLowerCase().includes(stateQuery.toLowerCase())
  );

  const approaches = ['All', ...new Set(curriculumOptions.map(c => c.approach.split(' / ')[0]))];
  const filteredCurriculum = curriculumFilter === 'All'
    ? curriculumOptions
    : curriculumOptions.filter(c => c.approach.includes(curriculumFilter));

  const tabs = [
    { id: 'states', label: 'State Requirements', icon: <MapPin size={15} /> },
    { id: 'curriculum', label: 'Curriculum Comparison', icon: <BookOpen size={15} /> },
    { id: 'quiz', label: 'Learning Style Quiz', icon: <Brain size={15} /> },
    { id: 'portfolio', label: 'Portfolio Builder', icon: <FolderOpen size={15} /> },
    { id: 'templates', label: 'Printable Templates', icon: <FileText size={15} /> },
    { id: 'alerts', label: 'Law Alerts', icon: <Bell size={15} /> },
    { id: 'reportcard', label: 'Report Card', icon: <FileText size={15} /> },
    { id: 'calendar', label: 'Kingdom Calendar', icon: <Calendar size={15} /> },
    { id: 'community', label: 'Community Board', icon: <Users size={15} /> },
    { id: 'declaration', label: 'Declaration Tool', icon: <Mic size={15} /> },
  ];

  return (
    <div className="tools-page">
      <div className="tools-page__hero">
        <div className="container">
          <h1>Homeschool Tools</h1>
          <p>Everything you need to plan, track, and protect your homeschool — all in one place.</p>
        </div>
      </div>

      <div className="container">
        <div className="tools-page__tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tools-page__tab ${activeTab === tab.id ? 'tools-page__tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* STATE REQUIREMENTS */}
        {activeTab === 'states' && (
          <div className="tools-page__panel">
            <div className="tools-page__panel-header">
              <h2>All 50 State Homeschool Requirements</h2>
              <p>Click any state for details. Always verify with HSLDA or your state department of education, as laws can change.</p>
              <div className="tools-page__search">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Search states..."
                  value={stateQuery}
                  onChange={e => setStateQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="tools-page__states-grid">
              {filtered.map(s => (
                <div
                  key={s.state}
                  className={`tools-page__state-card ${selectedState?.state === s.state ? 'tools-page__state-card--active' : ''}`}
                  onClick={() => setSelectedState(selectedState?.state === s.state ? null : s)}
                >
                  <div className="tools-page__state-card-top">
                    <strong>{s.state}</strong>
                    <span className="tools-page__oversight-badge" style={{ background: oversightColors[s.oversight] + '20', color: oversightColors[s.oversight], border: `1px solid ${oversightColors[s.oversight]}40` }}>
                      {s.oversight} Oversight
                    </span>
                  </div>
                  {selectedState?.state === s.state && (
                    <div className="tools-page__state-detail">
                      <div className="tools-page__state-row"><span className="tools-page__state-label">Notice Required</span><span>{s.notice}</span></div>
                      <div className="tools-page__state-row"><span className="tools-page__state-label">Testing</span><span>{s.testing}</span></div>
                      <div className="tools-page__state-row"><span className="tools-page__state-label">Portfolio/Records</span><span>{s.portfolio}</span></div>
                      <p className="tools-page__state-notes">{s.notes}</p>
                      <a href="https://hslda.org/legal" target="_blank" rel="noopener noreferrer" className="tools-page__state-link">Verify with HSLDA →</a>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="tools-page__legend">
              <strong>Oversight Level:</strong>
              {Object.entries(oversightColors).map(([level, color]) => (
                <span key={level} style={{ color, fontWeight: 600 }}>● {level}</span>
              ))}
            </div>
          </div>
        )}

        {/* CURRICULUM */}
        {activeTab === 'curriculum' && (
          <div className="tools-page__panel">
            <div className="tools-page__panel-header">
              <h2>Curriculum Comparison Tool</h2>
              <p>Compare popular faith-based and secular-friendly homeschool curricula side by side.</p>
              <div className="tools-page__filter-row">
                {approaches.map(a => (
                  <button key={a} className={`tools-page__filter-btn ${curriculumFilter === a ? 'tools-page__filter-btn--active' : ''}`} onClick={() => setCurriculumFilter(a)}>{a}</button>
                ))}
              </div>
            </div>
            <div className="tools-page__curriculum-grid">
              {filteredCurriculum.map(c => (
                <div key={c.id} className="tools-page__curriculum-card card">
                  <div className="tools-page__curriculum-header">
                    <div><h3>{c.name}</h3><span className="tools-page__curriculum-approach">{c.approach}</span></div>
                    <span className="tools-page__price">{c.price}</span>
                  </div>
                  <div className="tools-page__curriculum-meta">
                    <span><strong>Grades:</strong> {c.grades}</span>
                    <span><strong>Style:</strong> {c.style}</span>
                  </div>
                  <div className="tools-page__curriculum-faith"><strong>Faith Integration:</strong> {c.faith}</div>
                  <div className="tools-page__curriculum-cols">
                    <div>
                      <div className="tools-page__pro-con-label tools-page__pro-con-label--pro">Strengths</div>
                      <ul>{c.pros.map((p, i) => <li key={i}>{p}</li>)}</ul>
                    </div>
                    <div>
                      <div className="tools-page__pro-con-label tools-page__pro-con-label--con">Considerations</div>
                      <ul>{c.cons.map((con, i) => <li key={i}>{con}</li>)}</ul>
                    </div>
                  </div>
                  <div className="tools-page__curriculum-best"><strong>Best for:</strong> {c.bestFor}</div>
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--sm">Visit {c.name} →</a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LEARNING STYLE QUIZ */}
        {activeTab === 'quiz' && (
          <div className="tools-page__panel">
            <LearningStyleQuiz />
          </div>
        )}

        {/* PORTFOLIO BUILDER */}
        {activeTab === 'portfolio' && (
          <div className="tools-page__panel">
            <PortfolioBuilder />
          </div>
        )}

        {/* PRINTABLE TEMPLATES */}
        {activeTab === 'templates' && (
          <div className="tools-page__panel">
            <PrintableTemplates />
          </div>
        )}

        {/* LAW ALERTS */}
        {activeTab === 'alerts' && (
          <div className="tools-page__panel">
            <LawAlerts />
          </div>
        )}

        {/* KINGDOM CALENDAR */}
        {activeTab === 'calendar' && (
          <div className="tools-page__panel">
            <div className="tools-page__panel-header">
              <h2>KingdomShift KingdomShift Homeschool Hub Calendar</h2>
              <p>Align your homeschool with God's designed seasons and rhythms. Each month carries a biblical focus, scripture, and practical actions for your family.</p>
            </div>
            <KingdomCalendar
              title="KingdomShift KingdomShift Homeschool Hub Calendar"
              seasons={homeschoolCalendar}
            />
          </div>
        )}

        {/* COMMUNITY BOARD */}
        {activeTab === 'community' && (
          <div className="tools-page__panel">
            <div className="tools-page__panel-header">
              <h2>KingdomShift KingdomShift Homeschool Hub Community</h2>
              <p>Share what you are believing God for in your homeschool journey. Encourage one another.</p>
            </div>
            <CommunityBoard
              niche="homeschool"
              placeholder="Share a prayer, a win, or what you are believing God for in your homeschool..."
            />
          </div>
        )}

        {/* DECLARATION TOOL */}
        {activeTab === 'declaration' && (
          <div className="tools-page__panel">
            <KingdomDeclaration
              niche="homeschool"
              declarations={homeschoolDeclarations}
            />
          </div>
        )}

        {/* REPORT CARD */}
        {activeTab === 'reportcard' && (
          <div className="tools-page__panel">
            <div className="tools-page__panel-header">
              <h2>Homeschool Report Card Generator</h2>
              <p>Create a professional report card for your records. Print or save as PDF.</p>
            </div>
            <ReportCardGenerator />
          </div>
        )}
      </div>
    </div>
  );
}

// ===== LEARNING STYLE QUIZ =====
function LearningStyleQuiz() {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const questions = [
    { id: 1, question: 'When your child learns something new, they do best when they:', options: [
      { label: 'Read about it or see it written out', style: 'visual' },
      { label: 'Hear it explained out loud or in a song', style: 'auditory' },
      { label: 'Touch it, build it, or do it with their hands', style: 'kinesthetic' },
      { label: 'Read it, then write notes about it', style: 'readwrite' },
    ]},
    { id: 2, question: 'During free time, your child most often:', options: [
      { label: 'Draws, doodles, or watches videos', style: 'visual' },
      { label: 'Listens to music or talks a lot', style: 'auditory' },
      { label: 'Builds things, does crafts, or plays outside', style: 'kinesthetic' },
      { label: 'Reads books or writes stories', style: 'readwrite' },
    ]},
    { id: 3, question: 'Your child remembers things best when:', options: [
      { label: 'They can picture it or see a diagram', style: 'visual' },
      { label: 'They repeat it out loud or put it to a rhythm', style: 'auditory' },
      { label: 'They physically acted it out or made something', style: 'kinesthetic' },
      { label: 'They wrote notes or made lists about it', style: 'readwrite' },
    ]},
    { id: 4, question: 'When frustrated with a lesson, it is usually because:', options: [
      { label: 'There is nothing to look at — just talking', style: 'visual' },
      { label: 'Everything is silent — no discussion', style: 'auditory' },
      { label: 'They have to sit still too long', style: 'kinesthetic' },
      { label: 'Not enough reading or writing involved', style: 'readwrite' },
    ]},
    { id: 5, question: 'Bible memory works best when you:', options: [
      { label: 'Write the verse on a card with pictures', style: 'visual' },
      { label: 'Set it to a song or say it out loud together', style: 'auditory' },
      { label: 'Act it out or use hand motions', style: 'kinesthetic' },
      { label: 'Have them write it out multiple times', style: 'readwrite' },
    ]},
  ];

  const styleProfiles = {
    visual: { title: 'Visual Learner', emoji: '👁️', description: 'Your child learns best through seeing — diagrams, charts, color-coding, videos, and written text.',
      curriculum: ['Sonlight (book-heavy, visual)', 'Teaching Textbooks (video-based math)', 'Any curriculum with strong visual materials'],
      tips: ['Use color-coded notes and highlighters', 'Draw diagrams and mind maps', 'Use timelines for history', 'Watch videos to introduce topics', 'Write Bible verses on illustrated cards'] },
    auditory: { title: 'Auditory Learner', emoji: '👂', description: 'Your child learns best through hearing — read-alouds, discussion, music, and verbal repetition.',
      curriculum: ['Classical Conversations (community discussion)', 'Sonlight (heavy read-aloud)', 'Seeds Family Worship for scripture memory'],
      tips: ['Read lessons aloud together', 'Use songs and rhymes to memorize facts', 'Have them explain concepts back verbally', 'Record notes and listen back', 'Discuss every subject — do not just read silently'] },
    kinesthetic: { title: 'Hands-On Learner', emoji: '🙌', description: 'Your child learns best through doing — movement, building, experiments, and real-world application.',
      curriculum: ['My Father\'s World (unit studies, hands-on)', 'Classical Conversations (hands-on memory work)', 'Any science curriculum with experiments'],
      tips: ['Build movement breaks into every lesson', 'Use manipulatives for math', 'Do science experiments for every concept', 'Build models or crafts for history', 'Add hand motions to Bible memory'] },
    readwrite: { title: 'Read/Write Learner', emoji: '📝', description: 'Your child learns best through reading and writing — note-taking, lists, and written summaries.',
      curriculum: ['Memoria Press (writing and Latin focused)', 'Abeka (textbook and workbook based)', 'Any classical curriculum with strong writing'],
      tips: ['Have them take notes during lessons', 'Assign written narrations', 'Use workbooks over verbal drills', 'Make lists and outlines for every subject', 'Journal responses to literature and history'] },
  };

  const handleAnswer = (qId, style) => setAnswers(prev => ({ ...prev, [qId]: style }));

  const calculateResult = () => {
    const counts = { visual: 0, auditory: 0, kinesthetic: 0, readwrite: 0 };
    Object.values(answers).forEach(style => { counts[style]++; });
    const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
    setResult(styleProfiles[winner]);
  };

  const allAnswered = Object.keys(answers).length === questions.length;

  if (result) return (
    <div className="quiz__result card">
      <div className="quiz__result-header">
        <span className="quiz__result-emoji">{result.emoji}</span>
        <div><h2>Your child is a {result.title}!</h2><p>{result.description}</p></div>
      </div>
      <div className="quiz__result-cols">
        <div className="quiz__result-section"><h3>Best Curriculum Matches</h3><ul>{result.curriculum.map((c, i) => <li key={i}>{c}</li>)}</ul></div>
        <div className="quiz__result-section"><h3>Teaching Tips</h3><ul>{result.tips.map((t, i) => <li key={i}>{t}</li>)}</ul></div>
      </div>
      <button className="btn btn--outline" onClick={() => { setResult(null); setAnswers({}); }}>Retake Quiz</button>
    </div>
  );

  return (
    <div className="quiz">
      <div className="tools-page__panel-header">
        <h2>Learning Style Quiz</h2>
        <p>Answer 5 questions to discover your child's learning style and get personalized curriculum recommendations.</p>
      </div>
      {questions.map(q => (
        <div key={q.id} className="quiz__question">
          <p className="quiz__q-text"><strong>Question {q.id}:</strong> {q.question}</p>
          <div className="quiz__options">
            {q.options.map((opt, i) => (
              <button key={i} className={`quiz__option ${answers[q.id] === opt.style ? 'quiz__option--selected' : ''}`} onClick={() => handleAnswer(q.id, opt.style)}>{opt.label}</button>
            ))}
          </div>
        </div>
      ))}
      <button className="btn btn--primary" onClick={calculateResult} disabled={!allAnswered} style={{ marginTop: '1.5rem', opacity: allAnswered ? 1 : 0.5 }}>
        {allAnswered ? 'See Results →' : `Answer all ${questions.length} questions to continue`}
      </button>
    </div>
  );
}

// ===== PORTFOLIO BUILDER =====
function PortfolioBuilder() {
  const [child, setChild] = useState({ name: '', grade: '', year: '2025-2026' });
  const [subjects, setSubjects] = useState([
    { subject: 'Bible / Scripture', curriculum: '', notes: '', samples: '' },
    { subject: 'Language Arts', curriculum: '', notes: '', samples: '' },
    { subject: 'Mathematics', curriculum: '', notes: '', samples: '' },
    { subject: 'History / Social Studies', curriculum: '', notes: '', samples: '' },
    { subject: 'Science', curriculum: '', notes: '', samples: '' },
    { subject: 'Writing / Composition', curriculum: '', notes: '', samples: '' },
  ]);
  const [milestones, setMilestones] = useState('');

  const updateSubject = (i, field, val) => {
    const updated = [...subjects];
    updated[i][field] = val;
    setSubjects(updated);
  };

  return (
    <div className="portfolio">
      <div className="tools-page__panel-header">
        <h2>Homeschool Portfolio Builder</h2>
        <p>Track your child's subjects, curriculum, progress notes, and work samples in one organized record. Print or screenshot to keep on file — required in many states.</p>
      </div>

      <div className="portfolio__child card">
        <h3>Child Information</h3>
        <div className="portfolio__child-grid">
          {[['name', 'Child\'s Name'], ['grade', 'Grade Level'], ['year', 'Academic Year']].map(([key, label]) => (
            <label key={key}>{label}<input type="text" value={child[key]} onChange={e => setChild({ ...child, [key]: e.target.value })} placeholder={label} /></label>
          ))}
        </div>
      </div>

      <div className="portfolio__subjects card">
        <h3>Subjects & Progress</h3>
        <div className="portfolio__subjects-table">
          <div className="portfolio__subjects-header">
            <span>Subject</span><span>Curriculum Used</span><span>Progress Notes</span><span>Work Samples</span>
          </div>
          {subjects.map((s, i) => (
            <div key={i} className="portfolio__subject-row">
              <input type="text" value={s.subject} onChange={e => updateSubject(i, 'subject', e.target.value)} />
              <input type="text" value={s.curriculum} onChange={e => updateSubject(i, 'curriculum', e.target.value)} placeholder="e.g. Abeka Grade 3" />
              <input type="text" value={s.notes} onChange={e => updateSubject(i, 'notes', e.target.value)} placeholder="Progress notes..." />
              <input type="text" value={s.samples} onChange={e => updateSubject(i, 'samples', e.target.value)} placeholder="What is on file..." />
            </div>
          ))}
        </div>
      </div>

      <div className="portfolio__milestones card">
        <h3>Annual Milestones & Character Growth</h3>
        <textarea value={milestones} onChange={e => setMilestones(e.target.value)} rows={5} placeholder="Note significant academic achievements, character growth, community involvement, scripture memorized, projects completed..." />
      </div>

      <div className="portfolio__actions">
        <button className="btn btn--primary" onClick={() => window.print()}>🖨️ Print Portfolio</button>
        <p className="portfolio__note">Print this page and keep it in a binder. This serves as your official homeschool portfolio record for states that require it.</p>
      </div>
    </div>
  );
}

// ===== PRINTABLE TEMPLATES =====
function PrintableTemplates() {
  const templates = [
    { title: 'Weekly Lesson Plan Template', desc: 'A blank 5-day lesson planner with subject rows and time blocks. Fill in weekly and keep on file.', icon: '📅', content: 'WEEKLY LESSON PLAN' },
    { title: 'Daily Schedule Template', desc: 'A structured daily schedule with time slots from 7am to 4pm. Customize for your family\'s rhythm.', icon: '⏰', content: 'DAILY SCHEDULE' },
    { title: 'Reading Log', desc: 'Track books read, dates, and a one-sentence summary. Great for language arts records.', icon: '📚', content: 'READING LOG' },
    { title: 'Scripture Memory Tracker', desc: 'Track verses memorized by book, reference, and date. Includes a milestone chart.', icon: '✝️', content: 'SCRIPTURE MEMORY TRACKER' },
    { title: 'Field Trip Log', desc: 'Document field trips with date, location, subjects covered, and what was learned.', icon: '🗺️', content: 'FIELD TRIP LOG' },
    { title: 'Annual Goals Worksheet', desc: 'Set academic, character, and faith goals for the year. Review at the end of the year.', icon: '🎯', content: 'ANNUAL GOALS' },
  ];

  const printTemplate = (title, content) => {
    const win = window.open('', '_blank');
    win.document.write(`
      <html><head><title>${title}</title>
      <style>
        body { font-family: Georgia, serif; padding: 40px; max-width: 800px; margin: 0 auto; }
        h1 { text-align: center; font-size: 1.5rem; margin-bottom: 0.5rem; }
        .scripture { text-align: center; font-style: italic; font-size: 0.85rem; color: #666; margin-bottom: 2rem; }
        .info-row { display: flex; gap: 2rem; margin-bottom: 1.5rem; }
        .info-field { flex: 1; border-bottom: 1px solid #333; padding-bottom: 4px; font-size: 0.9rem; }
        .info-label { font-size: 0.75rem; color: #666; }
        table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        th { background: #f0f0f0; padding: 8px; text-align: left; font-size: 0.85rem; border: 1px solid #ccc; }
        td { padding: 20px 8px; border: 1px solid #ccc; vertical-align: top; }
        @media print { @page { margin: 0.5in; } }
      </style></head><body>
      <h1>${title}</h1>
      <p class="scripture">"Train up a child in the way he should go; even when he is old he will not depart from it." — Proverbs 22:6</p>
      <div class="info-row">
        <div class="info-field"><div class="info-label">Child's Name</div>&nbsp;</div>
        <div class="info-field"><div class="info-label">Grade</div>&nbsp;</div>
        <div class="info-field"><div class="info-label">Date / Week</div>&nbsp;</div>
      </div>
      ${content === 'WEEKLY LESSON PLAN' ? `
        <table><thead><tr><th>Subject</th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th></tr></thead>
        <tbody>${['Bible','Language Arts','Math','History','Science','Writing','Other'].map(s => `<tr><td><strong>${s}</strong></td><td></td><td></td><td></td><td></td><td></td></tr>`).join('')}</tbody></table>
      ` : content === 'DAILY SCHEDULE' ? `
        <table><thead><tr><th>Time</th><th>Activity / Subject</th><th>Notes</th></tr></thead>
        <tbody>${['7:00 AM','7:30 AM','8:00 AM','8:30 AM','9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM'].map(t => `<tr><td>${t}</td><td></td><td></td></tr>`).join('')}</tbody></table>
      ` : content === 'READING LOG' ? `
        <table><thead><tr><th>Date</th><th>Book Title</th><th>Author</th><th>Pages</th><th>Summary / Thoughts</th></tr></thead>
        <tbody>${Array(15).fill('<tr><td></td><td></td><td></td><td></td><td></td></tr>').join('')}</tbody></table>
      ` : content === 'SCRIPTURE MEMORY TRACKER' ? `
        <table><thead><tr><th>Date Learned</th><th>Reference (e.g. John 3:16)</th><th>Book/Theme</th><th>Review Date</th><th>Mastered?</th></tr></thead>
        <tbody>${Array(20).fill('<tr><td></td><td></td><td></td><td></td><td></td></tr>').join('')}</tbody></table>
      ` : content === 'FIELD TRIP LOG' ? `
        <table><thead><tr><th>Date</th><th>Location</th><th>Subjects Covered</th><th>What Was Learned</th></tr></thead>
        <tbody>${Array(12).fill('<tr><td></td><td></td><td></td><td style="min-height:60px"></td></tr>').join('')}</tbody></table>
      ` : `
        <table><thead><tr><th>Area</th><th>Goal for This Year</th><th>Mid-Year Check</th><th>End of Year Result</th></tr></thead>
        <tbody>${['Academic - Reading','Academic - Math','Academic - Writing','Academic - Science','Faith - Scripture Memory','Faith - Character','Community / Service','Personal Growth'].map(a => `<tr><td>${a}</td><td></td><td></td><td></td></tr>`).join('')}</tbody></table>
      `}
      <script>window.print(); window.close();</script>
      </body></html>
    `);
    win.document.close();
  };

  return (
    <div>
      <div className="tools-page__panel-header">
        <h2>Free Printable Templates</h2>
        <p>Click any template to open a print-ready version. These are designed to serve as official homeschool records.</p>
      </div>
      <div className="templates-grid">
        {templates.map((t, i) => (
          <div key={i} className="template-card card">
            <div className="template-card__icon">{t.icon}</div>
            <h3>{t.title}</h3>
            <p>{t.desc}</p>
            <button className="btn btn--outline btn--sm" onClick={() => printTemplate(t.title, t.content)}>
              🖨️ Open & Print
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== LAW ALERTS =====
function LawAlerts() {
  const alerts = [
    { state: 'National', date: 'Ongoing', type: 'info', title: 'Homeschool laws change — here is how to stay protected', body: 'State legislatures update homeschool laws regularly. Florida, Arizona, and Virginia have all made significant changes in recent years. Never rely on a single source. Always verify your state\'s current requirements annually.' },
    { state: 'Arizona', date: '2022', type: 'positive', title: 'Arizona expanded Education Savings Accounts (ESA)', body: 'Arizona became the first state to offer universal ESA funding — homeschool families can receive up to $7,000 per child per year for educational expenses including curriculum, tutoring, and co-ops. Check empowermentscholarshipaccount.com for current eligibility.' },
    { state: 'Florida', date: '2023', type: 'positive', title: 'Florida expanded school choice funding to homeschoolers', body: 'Florida\'s Family Empowerment Scholarship now includes homeschool families in some circumstances. Check the Florida Department of Education for current program details and eligibility.' },
    { state: 'All States', date: 'Ongoing', type: 'warning', title: 'AI and online school laws are evolving rapidly', body: 'As AI tutoring tools grow, some states are beginning to regulate online and AI-based instruction. Currently no state bans AI tools for homeschooling, but buyers of this site should monitor HSLDA.org/news for any emerging regulations.' },
    { state: 'All States', date: 'Ongoing', type: 'info', title: 'Dual enrollment rights vary and are expanding', body: 'More states are passing laws giving homeschool students the right to take community college courses at reduced or no cost. Check your state\'s current dual enrollment policy — it may have improved since you last checked.' },
  ];

  const typeColors = { info: '#1B3F72', positive: '#4A7C4A', warning: '#C98A18' };
  const typeLabels = { info: 'Info', positive: 'Good News', warning: 'Watch' };

  return (
    <div>
      <div className="tools-page__panel-header">
        <h2>Homeschool Law Alerts & Updates</h2>
        <p>Laws change. This section tracks significant homeschool law developments and how to stay current. Always verify with HSLDA or your state organization.</p>
      </div>

      <div className="alerts-list">
        {alerts.map((a, i) => (
          <div key={i} className="alert-card card" style={{ borderLeft: `4px solid ${typeColors[a.type]}` }}>
            <div className="alert-card__header">
              <div>
                <span className="alert-card__state">{a.state}</span>
                <span className="alert-card__badge" style={{ background: typeColors[a.type] + '20', color: typeColors[a.type] }}>{typeLabels[a.type]}</span>
              </div>
              <span className="alert-card__date">{a.date}</span>
            </div>
            <h3 className="alert-card__title">{a.title}</h3>
            <p className="alert-card__body">{a.body}</p>
          </div>
        ))}
      </div>

      <div className="card alerts-resources">
        <h3>Stay Current — Best Sources for Law Updates</h3>
        <div className="alerts-resources__grid">
          {[
            { name: 'HSLDA News', desc: 'Best source for state law changes and legal alerts', url: 'https://hslda.org/news' },
            { name: 'Coalition for Responsible Home Education', desc: 'Independent tracking of state homeschool law changes', url: 'https://responsiblehomeschooling.org' },
            { name: 'Your State Homeschool Organization', desc: 'Search "[your state] homeschool organization" for local alerts', url: 'https://hslda.org/legal' },
            { name: 'NHERI (Research Institute)', desc: 'Research and statistics on homeschool policy trends', url: 'https://nheri.org' },
          ].map((r, i) => (
            <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="alerts-resource-link">
              <strong>{r.name}</strong>
              <span>{r.desc}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== REPORT CARD GENERATOR =====
function ReportCardGenerator() {
  const [info, setInfo] = useState({ studentName: '', grade: '', schoolName: '', parentTeacher: '', academicYear: '2025-2026' });
  const [subjects, setSubjects] = useState([
    { name: 'Bible / Scripture', grade: '', notes: '' },
    { name: 'Language Arts', grade: '', notes: '' },
    { name: 'Mathematics', grade: '', notes: '' },
    { name: 'History / Social Studies', grade: '', notes: '' },
    { name: 'Science', grade: '', notes: '' },
    { name: 'Writing / Composition', grade: '', notes: '' },
  ]);
  const [comments, setComments] = useState('');
  const gradeOptions = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F', 'Pass', 'In Progress'];
  const updateSubject = (i, field, val) => { const u = [...subjects]; u[i][field] = val; setSubjects(u); };

  return (
    <div className="report-card">
      <div className="report-card__form no-print">
        <h3>Student Information</h3>
        <div className="report-card__info-grid">
          {[['studentName','Student Name'],['grade','Grade Level'],['schoolName','School Name'],['parentTeacher','Parent/Teacher Name'],['academicYear','Academic Year']].map(([key, label]) => (
            <label key={key}>{label}<input type="text" value={info[key]} onChange={e => setInfo({ ...info, [key]: e.target.value })} placeholder={label} /></label>
          ))}
        </div>
        <h3>Subjects & Grades</h3>
        {subjects.map((s, i) => (
          <div key={i} className="report-card__subject-row">
            <input type="text" value={s.name} onChange={e => updateSubject(i, 'name', e.target.value)} className="report-card__subject-name" />
            <select value={s.grade} onChange={e => updateSubject(i, 'grade', e.target.value)}>
              <option value="">Grade</option>
              {gradeOptions.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <input type="text" value={s.notes} onChange={e => updateSubject(i, 'notes', e.target.value)} placeholder="Notes (optional)" className="report-card__subject-notes" />
          </div>
        ))}
        <label>Comments / Character Notes<textarea value={comments} onChange={e => setComments(e.target.value)} rows={4} placeholder="Overall observations, character growth, areas of excellence..." /></label>
        <button className="btn btn--primary" onClick={() => window.print()}>🖨️ Print / Save as PDF</button>
      </div>
    </div>
  );
}
