import { useState } from 'react';
import { Search, MapPin, BookOpen, FileText } from 'lucide-react';
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

  return (
    <div className="tools-page">
      <div className="tools-page__hero">
        <div className="container">
          <h1>Homeschool Tools</h1>
          <p>State requirements, curriculum comparison, and planning resources — all in one place.</p>
        </div>
      </div>

      <div className="container">
        {/* Tab Nav */}
        <div className="tools-page__tabs">
          <button
            className={`tools-page__tab ${activeTab === 'states' ? 'tools-page__tab--active' : ''}`}
            onClick={() => setActiveTab('states')}
          >
            <MapPin size={16} /> State Requirements
          </button>
          <button
            className={`tools-page__tab ${activeTab === 'curriculum' ? 'tools-page__tab--active' : ''}`}
            onClick={() => setActiveTab('curriculum')}
          >
            <BookOpen size={16} /> Curriculum Comparison
          </button>
          <button
            className={`tools-page__tab ${activeTab === 'reportcard' ? 'tools-page__tab--active' : ''}`}
            onClick={() => setActiveTab('reportcard')}
          >
            <FileText size={16} /> Report Card Generator
          </button>
        </div>

        {/* PARENT DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="tools-page__panel">
            <ParentDashboard />
          </div>
        )}

        {/* STATE REQUIREMENTS */}
        {activeTab === 'states' && (
          <div className="tools-page__panel" id="states">
            <div className="tools-page__panel-header">
              <h2>All 50 State Homeschool Requirements</h2>
              <p>Click any state for details. Always verify with your state's department of education or HSLDA, as laws can change.</p>
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
                    <span
                      className="tools-page__oversight-badge"
                      style={{ background: oversightColors[s.oversight] + '20', color: oversightColors[s.oversight], border: `1px solid ${oversightColors[s.oversight]}40` }}
                    >
                      {s.oversight} Oversight
                    </span>
                  </div>
                  {selectedState?.state === s.state && (
                    <div className="tools-page__state-detail">
                      <div className="tools-page__state-row">
                        <span className="tools-page__state-label">Notice Required</span>
                        <span>{s.notice}</span>
                      </div>
                      <div className="tools-page__state-row">
                        <span className="tools-page__state-label">Testing</span>
                        <span>{s.testing}</span>
                      </div>
                      <div className="tools-page__state-row">
                        <span className="tools-page__state-label">Portfolio</span>
                        <span>{s.portfolio}</span>
                      </div>
                      <p className="tools-page__state-notes">{s.notes}</p>
                      <a
                        href="https://hslda.org/legal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tools-page__state-link"
                      >
                        Verify with HSLDA →
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="tools-page__legend">
              <strong>Oversight Level Guide:</strong>
              {Object.entries(oversightColors).map(([level, color]) => (
                <span key={level} style={{ color, fontWeight: 600 }}>● {level}</span>
              ))}
            </div>
          </div>
        )}

        {/* CURRICULUM COMPARISON */}
        {activeTab === 'curriculum' && (
          <div className="tools-page__panel" id="curriculum">
            <div className="tools-page__panel-header">
              <h2>Curriculum Comparison Tool</h2>
              <p>Compare the most popular faith-based and secular-friendly homeschool curricula side by side.</p>
              <div className="tools-page__filter-row">
                {approaches.map(a => (
                  <button
                    key={a}
                    className={`tools-page__filter-btn ${curriculumFilter === a ? 'tools-page__filter-btn--active' : ''}`}
                    onClick={() => setCurriculumFilter(a)}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <div className="tools-page__curriculum-grid">
              {filteredCurriculum.map(c => (
                <div key={c.id} className="tools-page__curriculum-card card">
                  <div className="tools-page__curriculum-header">
                    <div>
                      <h3>{c.name}</h3>
                      <span className="tools-page__curriculum-approach">{c.approach}</span>
                    </div>
                    <span className="tools-page__price">{c.price}</span>
                  </div>
                  <div className="tools-page__curriculum-meta">
                    <span><strong>Grades:</strong> {c.grades}</span>
                    <span><strong>Style:</strong> {c.style}</span>
                  </div>
                  <div className="tools-page__curriculum-faith">
                    <strong>Faith Integration:</strong> {c.faith}
                  </div>
                  <div className="tools-page__curriculum-cols">
                    <div>
                      <div className="tools-page__pro-con-label tools-page__pro-con-label--pro">Strengths</div>
                      <ul>
                        {c.pros.map((p, i) => <li key={i}>{p}</li>)}
                      </ul>
                    </div>
                    <div>
                      <div className="tools-page__pro-con-label tools-page__pro-con-label--con">Considerations</div>
                      <ul>
                        {c.cons.map((con, i) => <li key={i}>{con}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div className="tools-page__curriculum-best">
                    <strong>Best for:</strong> {c.bestFor}
                  </div>
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--sm">
                    Visit {c.name} →
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REPORT CARD GENERATOR */}
        {activeTab === 'reportcard' && (
          <div className="tools-page__panel" id="reportcard">
            <div className="tools-page__panel-header">
              <h2>Homeschool Report Card Generator</h2>
              <p>Create a professional report card for your homeschool records. Print or save as PDF.</p>
            </div>
            <ReportCardGenerator />
          </div>
        )}
      </div>
    </div>
  );
}

function ReportCardGenerator() {
  const [info, setInfo] = useState({
    studentName: '', grade: '', schoolName: '', parentTeacher: '', academicYear: '2025-2026',
  });
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

  const updateSubject = (i, field, val) => {
    const updated = [...subjects];
    updated[i][field] = val;
    setSubjects(updated);
  };

  const handlePrint = () => window.print();

  return (
    <div className="report-card">
      <div className="report-card__form no-print">
        <h3>Student Information</h3>
        <div className="report-card__info-grid">
          {[
            ['studentName', 'Student Name'],
            ['grade', 'Grade Level'],
            ['schoolName', 'School Name'],
            ['parentTeacher', 'Parent/Teacher Name'],
            ['academicYear', 'Academic Year'],
          ].map(([key, label]) => (
            <label key={key}>
              {label}
              <input
                type="text"
                value={info[key]}
                onChange={e => setInfo({ ...info, [key]: e.target.value })}
                placeholder={label}
              />
            </label>
          ))}
        </div>

        <h3>Subjects & Grades</h3>
        {subjects.map((s, i) => (
          <div key={i} className="report-card__subject-row">
            <input
              type="text"
              value={s.name}
              onChange={e => updateSubject(i, 'name', e.target.value)}
              className="report-card__subject-name"
            />
            <select value={s.grade} onChange={e => updateSubject(i, 'grade', e.target.value)}>
              <option value="">Grade</option>
              {gradeOptions.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <input
              type="text"
              value={s.notes}
              onChange={e => updateSubject(i, 'notes', e.target.value)}
              placeholder="Notes (optional)"
              className="report-card__subject-notes"
            />
          </div>
        ))}

        <label>
          Comments / Character Notes
          <textarea
            value={comments}
            onChange={e => setComments(e.target.value)}
            rows={4}
            placeholder="Overall observations, character growth, areas of excellence..."
          />
        </label>

        <button className="btn btn--primary" onClick={handlePrint}>
          🖨️ Print / Save as PDF
        </button>
      </div>

      {/* Printable Preview */}
      <div className="report-card__printable print-only">
        <div className="report-card__print-header">
          <h2>{info.schoolName || 'KingdomShift Homeschool Hub'}</h2>
          <p>Academic Year: {info.academicYear}</p>
        </div>
        <div className="report-card__print-info">
          <span><strong>Student:</strong> {info.studentName}</span>
          <span><strong>Grade:</strong> {info.grade}</span>
          <span><strong>Teacher:</strong> {info.parentTeacher}</span>
        </div>
        <table className="report-card__print-table">
          <thead>
            <tr><th>Subject</th><th>Grade</th><th>Notes</th></tr>
          </thead>
          <tbody>
            {subjects.map((s, i) => (
              <tr key={i}>
                <td>{s.name}</td>
                <td><strong>{s.grade}</strong></td>
                <td>{s.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {comments && <div className="report-card__print-comments"><strong>Comments:</strong> {comments}</div>}
        <div className="report-card__print-sig">
          <div className="report-card__sig-line">Parent/Teacher Signature: ______________________</div>
          <div className="report-card__sig-line">Date: ______________________</div>
        </div>
        <p className="report-card__scripture">"Train up a child in the way he should go; even when he is old he will not depart from it." — Proverbs 22:6</p>
      </div>
    </div>
  );
}
