import { Info } from 'lucide-react';
import './Panel.css';

// The glowing frame every dashboard section sits in.
// Give it a title and it renders the header; leave title off for a bare frame.
export default function Panel({ title, info = true, className = '', children, headerRight }) {
  return (
    <section className={`panel ${className}`}>
      {title && (
        <header className="panel__header">
          <h2 className="panel__title">{title}</h2>
          {info && <Info size={13} className="panel__info" />}
          {headerRight && <div className="panel__header-right">{headerRight}</div>}
        </header>
      )}
      <div className="panel__body">{children}</div>
    </section>
  );
}
