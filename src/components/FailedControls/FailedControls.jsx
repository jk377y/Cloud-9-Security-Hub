import Panel from '../common/Panel';
import ViewAllLink from '../common/ViewAllLink';
import { SEVERITY_COLORS } from '../../utils/score';
import './FailedControls.css';

// Short list of the controls that are currently failing, with a severity dot on each.
export default function FailedControls({ controls, total }) {
  return (
    <Panel title={`Failed Controls (${total})`} info={false} className="failed">
      <ul className="failed__list">
        {controls.map((c) => (
          <li key={c.id} className="failed__row">
            <span className="failed__tag">FAILED</span>
            <span className="failed__id">{c.id}</span>
            <span className="failed__title">{c.title}</span>
            <span className="failed__sev" style={{ color: SEVERITY_COLORS[c.severity] }}>
              <i style={{ background: SEVERITY_COLORS[c.severity] }} />
              {c.severity}
            </span>
          </li>
        ))}
      </ul>
      <ViewAllLink>View all failed controls</ViewAllLink>
    </Panel>
  );
}
