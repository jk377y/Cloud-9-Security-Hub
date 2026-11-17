// A tiny line chart with no axes, just the shape of the trend.
export default function Sparkline({ data, color = 'var(--cyan)', width = 100, height = 26 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1; // avoid dividing by zero on a flat line
  const pad = 2;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - pad - ((v - min) / range) * (height - pad * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 3px ${color})` }}
      />
    </svg>
  );
}
