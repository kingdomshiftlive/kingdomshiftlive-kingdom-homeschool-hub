import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * KINGDOM SEASONAL CALENDAR
 * Aligns niche activities with God's designed rhythms
 * Biblical agricultural calendar + Sabbath rhythms + seasonal stewardship
 * Before-its-time feature — no faith site has this in 2026
 * Each site gets its own niche-specific calendar data passed as props
 */
export default function KingdomCalendar({ title = 'Kingdom Calendar', seasons }) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];
  const currentMonth = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const prev = () => setSelectedMonth(m => (m === 0 ? 11 : m - 1));
  const next = () => setSelectedMonth(m => (m === 11 ? 0 : m + 1));

  const monthData = seasons[selectedMonth];

  return (
    <div className="kingdom-calendar">
      <div className="kingdom-calendar__header">
        <button onClick={prev} className="kingdom-calendar__nav"><ChevronLeft size={18} /></button>
        <div className="kingdom-calendar__month-title">
          <h3>{months[selectedMonth]}</h3>
          <span>{title}</span>
        </div>
        <button onClick={next} className="kingdom-calendar__nav"><ChevronRight size={18} /></button>
      </div>

      {monthData && (
        <div className="kingdom-calendar__body">
          <div className="kingdom-calendar__season">
            <span className="kingdom-calendar__season-icon">{monthData.icon}</span>
            <span className="kingdom-calendar__season-name">{monthData.season}</span>
          </div>

          <div className="kingdom-calendar__scripture">
            <blockquote>{monthData.scripture}</blockquote>
            <cite>{monthData.reference}</cite>
          </div>

          <div className="kingdom-calendar__sections">
            {monthData.focus && (
              <div className="kingdom-calendar__section">
                <h4>Kingdom Focus</h4>
                <p>{monthData.focus}</p>
              </div>
            )}
            {monthData.actions && (
              <div className="kingdom-calendar__section">
                <h4>This Month</h4>
                <ul>
                  {monthData.actions.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
              </div>
            )}
            {monthData.rest && (
              <div className="kingdom-calendar__section kingdom-calendar__section--rest">
                <h4>Sabbath Rhythm</h4>
                <p>{monthData.rest}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
