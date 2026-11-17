import { LayoutDashboard, ShieldCheck, ListChecks, Cloud, ChartLine, Settings, User } from 'lucide-react';
import './Sidebar.css';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: ShieldCheck, label: 'Standards' },
  { icon: ListChecks, label: 'Controls' },
  { icon: Cloud, label: 'Accounts' },
  { icon: ChartLine, label: 'Insights' },
  { icon: Settings, label: 'Settings' },
  { icon: User, label: 'Profile' },
];

// Slim icon-only navigation on the left edge. Nothing is wired up yet, it's just for looks.
export default function Sidebar() {
  return (
    <nav className="sidebar">
      {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
        <button key={label} title={label} className={`sidebar__item ${active ? 'sidebar__item--active' : ''}`}>
          <Icon size={22} strokeWidth={1.5} />
        </button>
      ))}
    </nav>
  );
}
