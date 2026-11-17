import './DemoSwitcher.css';

// Pitch-only control: flips between hard-coded data sets so the team can see
// how the colors change. Delete this component (and its line in App.jsx) when real data arrives.
export default function DemoSwitcher({ options, value, onChange }) {
  return (
    <div className="demo-switcher">
      <span>Demo data</span>
      {options.map((key) => (
        <button key={key} className={key === value ? 'is-active' : ''} onClick={() => onChange(key)}>
          {key}
        </button>
      ))}
    </div>
  );
}
