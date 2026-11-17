import Panel from '../common/Panel';
import ViewAllLink from '../common/ViewAllLink';
import './StandardsFrameworks.css';

// Lists the compliance standards we're checking against, each with an on/off switch.
export default function StandardsFrameworks({ standards }) {
  return (
    <Panel title="Standards & Frameworks" info={false} className="standards">
      <ul className="standards__list">
        {standards.map((s) => (
          <li key={s.id} className="standards__row">
            <div className="standards__badge">{s.id}</div>
            <div className="standards__name">
              <div>{s.name}</div>
              <div className="standards__version">{s.version}</div>
            </div>
            <div className={`standards__toggle ${s.enabled ? 'standards__toggle--on' : ''}`}>
              <span className="standards__switch" />
              <span className="standards__state">{s.enabled ? 'ON' : 'OFF'}</span>
            </div>
          </li>
        ))}
      </ul>
      <ViewAllLink>Manage standards</ViewAllLink>
    </Panel>
  );
}
