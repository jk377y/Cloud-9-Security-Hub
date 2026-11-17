import { TriangleAlert } from 'lucide-react';
import Panel from '../common/Panel';
import Sparkline from '../common/Sparkline';
import { TriangleDown, TriangleUp } from '../common/Triangles';
import { scoreColor } from '../../utils/score';
import './Insights.css';

// 2x2 grid of quick-glance tiles: three trend tiles plus the riskiest account.
export default function Insights({ insights, accounts }) {
  // The riskiest account is just the one with the lowest score
  const worst = accounts.reduce((low, a) => (a.score < low.score ? a : low));
  const worstColor = scoreColor(worst.score);

  return (
    <Panel title="Insights" info={false} className="insights">
      <div className="insights__grid">
        {insights.map((tile) => {
          const color = tile.good ? 'var(--green)' : 'var(--red)';
          return (
            <div key={tile.label} className="insights__tile">
              <div className="insights__label">{tile.label}</div>
              <div className="insights__row">
                <span className="insights__value">{tile.value}</span>
                <span className="insights__change" style={{ color }}>
                  {tile.direction === 'up' ? <TriangleUp /> : <TriangleDown />} {tile.change}
                </span>
              </div>
              <div className="insights__foot">
                <span>vs previous 24h</span>
                <Sparkline data={tile.trend} color="var(--green)" width={80} height={20} />
              </div>
            </div>
          );
        })}

        <div className="insights__tile">
          <div className="insights__label">
            Top risk account <TriangleAlert size={20} color="var(--red)" className="insights__warn" />
          </div>
          <div className="insights__worst" style={{ color: worstColor }}>
            {worst.name}
          </div>
          <div className="insights__foot">
            <span>Score</span>
            <span style={{ color: worstColor, fontSize: 14 }}>{worst.score}/100</span>
          </div>
        </div>
      </div>
    </Panel>
  );
}
