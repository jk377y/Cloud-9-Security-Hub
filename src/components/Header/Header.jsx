import { Globe, Crosshair, Bell, Settings, ChevronDown } from 'lucide-react';
import './Header.css';

// Top bar: global view info on the left, title in the middle, actions on the right.
export default function Header({ lastUpdated, alertCount }) {
  return (
    <header className="header">
      <div className="header__global">
        <Globe size={30} strokeWidth={1.2} color="var(--cyan)" />
        <div>
          <div className="header__global-title">GLOBAL VIEW</div>
          <div className="header__global-sub">Last updated: {lastUpdated}</div>
        </div>
      </div>

      <h1 className="header__title">
        <span className="header__title-text">CLOUD 9 SECURITY HUB</span>
      </h1>

      <div className="header__actions">
        <button className="header__icon-btn" aria-label="Scan">
          <Crosshair size={18} />
        </button>
        <button className="header__icon-btn" aria-label="Notifications">
          <Bell size={18} />
          {alertCount > 0 && <span className="header__badge">{alertCount}</span>}
        </button>
        <button className="header__icon-btn" aria-label="Settings">
          <Settings size={18} />
        </button>

        <div className="header__range">
          <div>
            <div className="header__range-label">Time range</div>
            <div className="header__range-value">Last 24 hours</div>
          </div>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}
