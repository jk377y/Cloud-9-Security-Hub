import { TriangleDown, TriangleUp } from '../common/Triangles';
import Panel from '../common/Panel';
import ScoreGauge from './ScoreGauge';
import './OverallScore.css';

// Big gauge panel. Also shows how the score moved compared to 24 hours ago.
export default function OverallScore({ score, delta }) {
  const improved = delta >= 0;

  const deltaBadge = (
    <div className="overall__delta">
      <span className="overall__delta-label">vs 24 hours ago</span>
      <span className="overall__delta-value" style={{ color: improved ? 'var(--green)' : 'var(--red)' }}>
        {improved ? <TriangleUp /> : <TriangleDown />} {Math.abs(delta)}%
      </span>
    </div>
  );

  return (
    <Panel title="Overall Security Score" headerRight={deltaBadge} className="overall">
      <ScoreGauge score={score} />
    </Panel>
  );
}
