import { ChevronRight } from 'lucide-react';
import './ViewAllLink.css';

// The "View all ..." row that sits at the bottom of several panels.
export default function ViewAllLink({ children }) {
  return (
    <button className="view-all">
      <span>{children}</span>
      <ChevronRight size={16} />
    </button>
  );
}
