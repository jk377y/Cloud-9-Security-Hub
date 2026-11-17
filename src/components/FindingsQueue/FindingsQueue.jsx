import { useState } from 'react';
import { ShieldAlert, TriangleAlert, CircleAlert, Info } from 'lucide-react';
import Panel from '../common/Panel';
import ViewAllLink from '../common/ViewAllLink';
import { SEVERITY_COLORS } from '../../utils/score';
import './FindingsQueue.css';

const SEVERITY_ICONS = {
  CRITICAL: ShieldAlert,
  HIGH: TriangleAlert,
  MEDIUM: CircleAlert,
  LOW: Info,
};

// The tabs along the top double as filters for the list below.
const TABS = ['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];

export default function FindingsQueue({ counts, findings }) {
  const [tab, setTab] = useState('ALL');
  const visible = tab === 'ALL' ? findings : findings.filter((f) => f.severity === tab);

  return (
    <Panel title="Findings Queue" className="findings">
      <div className="findings__tabs">
        {TABS.map((t) => (
          <button
            key={t}
            className={`findings__tab ${tab === t ? 'findings__tab--active' : ''}`}
            style={t !== 'ALL' ? { '--tab-color': SEVERITY_COLORS[t] } : undefined}
            onClick={() => setTab(t)}
          >
            <span className="findings__tab-label">{t}</span>
            <span className="findings__tab-count">{counts[t.toLowerCase()]}</span>
          </button>
        ))}
      </div>

      <ul className="findings__list">
        {visible.map((f) => {
          const Icon = SEVERITY_ICONS[f.severity];
          const color = SEVERITY_COLORS[f.severity];
          return (
            <li key={f.title} className="findings__row">
              <Icon size={26} strokeWidth={1.4} color={color} />
              <div className="findings__text">
                <div className="findings__title">{f.title}</div>
                {f.resource && <div className="findings__resource">{f.resource}</div>}
              </div>
              <div className="findings__meta">
                <span className="findings__pill" style={{ color, borderColor: color }}>
                  {f.severity}
                </span>
                <span className="findings__ago">{f.ago}</span>
              </div>
            </li>
          );
        })}
        {visible.length === 0 && <li className="findings__empty">Nothing to show in this demo for {tab}.</li>}
      </ul>

      <ViewAllLink>View all findings</ViewAllLink>
    </Panel>
  );
}
