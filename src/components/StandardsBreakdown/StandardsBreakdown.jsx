import Panel from '../common/Panel';
import { scoreColor } from '../../utils/score';
import './StandardsBreakdown.css';

// One progress bar per standard so you can see which framework is dragging the score down.
export default function StandardsBreakdown({ standards }) {
  return (
    <Panel title="Standards Score Breakdown" info={false} className="breakdown">
      <ul className="breakdown__list">
        {standards.map((s) => {
          const color = scoreColor(s.score);
          return (
            <li key={s.id} className="breakdown__row">
              <div className="breakdown__badge">{s.id}</div>
              <div className="breakdown__main">
                <div className="breakdown__name">
                  {s.name} <span>{s.version}</span>
                </div>
                <div className="breakdown__bar">
                  <div className="breakdown__fill" style={{ width: `${s.score}%`, background: color, boxShadow: `0 0 8px ${color}` }} />
                </div>
              </div>
              <div className="breakdown__score">
                <div>{s.score}/100</div>
                <div style={{ color }}>{s.score}%</div>
              </div>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}
