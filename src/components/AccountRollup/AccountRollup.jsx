import Panel from '../common/Panel';
import ViewAllLink from '../common/ViewAllLink';
import WorldMap from './WorldMap';
import { scoreColor } from '../../utils/score';
import './AccountRollup.css';

// Bottom-left panel: account counts, a world map of where they live, and a score for each.
export default function AccountRollup({ totals, accounts, markers }) {
  const legend = [
    { label: 'Healthy', count: totals.healthy, color: 'var(--green)' },
    { label: 'Needs attention', count: totals.attention, color: 'var(--orange)' },
    { label: 'High risk', count: totals.risk, color: 'var(--red)' },
  ];

  return (
    <Panel title="Account Rollup" className="rollup">
      <div className="rollup__grid">
        {/* Left: totals and legend */}
        <div className="rollup__counts">
          <div className="rollup__counts-label">ACCOUNTS</div>
          <div className="rollup__total">{totals.total}</div>
          <div className="rollup__total-label">Total</div>
          <ul className="rollup__legend">
            {legend.map((l) => (
              <li key={l.label}>
                <i style={{ background: l.color }} />
                <b style={{ color: l.color }}>{l.count}</b>
                <span>{l.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Middle: map */}
        <div className="rollup__map">
          <WorldMap markers={markers} />
        </div>

        {/* Right: per-account scores */}
        <div className="rollup__scores">
          <div className="rollup__scores-title">SCORE BY ACCOUNT</div>
          <ul>
            {accounts.map((a) => {
              const color = scoreColor(a.score);
              return (
                <li key={a.name}>
                  <span className="rollup__acct-name">{a.name}</span>
                  <div className="rollup__bar">
                    <div style={{ width: `${a.score}%`, background: color, boxShadow: `0 0 6px ${color}` }} />
                  </div>
                  <span className="rollup__acct-score" style={{ color }}>
                    {a.score}
                  </span>
                </li>
              );
            })}
          </ul>
          <ViewAllLink>View all accounts</ViewAllLink>
        </div>
      </div>
    </Panel>
  );
}
