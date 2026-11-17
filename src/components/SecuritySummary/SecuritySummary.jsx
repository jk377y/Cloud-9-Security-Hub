import { Shield, CircleCheck, TriangleAlert, CircleMinus } from 'lucide-react';
import Panel from '../common/Panel';
import Sparkline from '../common/Sparkline';
import ViewAllLink from '../common/ViewAllLink';
import './SecuritySummary.css';

const ICONS = {
  shield: Shield,
  check: CircleCheck,
  warn: TriangleAlert,
  minus: CircleMinus,
};

// Four headline control counts, each with a little trend line.
export default function SecuritySummary({ items }) {
  return (
    <Panel title="Security Summary" className="summary">
      <ul className="summary__list">
        {items.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <li key={item.key} className="summary__row">
              <Icon size={24} strokeWidth={1.5} color={item.color} />
              <span className="summary__value" style={{ color: item.color }}>
                {item.value}
              </span>
              <span className="summary__label">{item.label}</span>
              <div className="summary__trend">
                {item.pct && (
                  <span className="summary__pct" style={{ color: item.color }}>
                    {item.pct}
                  </span>
                )}
                <Sparkline data={item.trend} color={item.color} width={90} height={22} />
              </div>
            </li>
          );
        })}
      </ul>
      <ViewAllLink>View all controls</ViewAllLink>
    </Panel>
  );
}
