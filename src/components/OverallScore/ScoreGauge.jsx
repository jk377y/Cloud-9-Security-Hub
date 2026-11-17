import { gradeFor, lerpColor } from '../../utils/score';
import './ScoreGauge.css';

const SEGMENTS = 50; // one block per 2 points of score
const START_ANGLE = -135; // degrees from straight up; bottom-left is where 0 sits
const SWEEP = 270; // the arc covers three quarters of a circle
const CX = 200;
const CY = 200;
const R_OUTER = 150;
const R_INNER = 120;

// Converts an angle (0 = straight up, clockwise) and radius into x/y on the SVG.
function polar(angle, r) {
  const rad = (angle * Math.PI) / 180;
  return [CX + r * Math.sin(rad), CY - r * Math.cos(rad)];
}

// Builds one block of the arc: a slice of a ring between two radii.
function segmentPath(a0, a1) {
  const [x1, y1] = polar(a0, R_OUTER);
  const [x2, y2] = polar(a1, R_OUTER);
  const [x3, y3] = polar(a1, R_INNER);
  const [x4, y4] = polar(a0, R_INNER);
  return `M${x1},${y1} A${R_OUTER},${R_OUTER} 0 0 1 ${x2},${y2} L${x3},${y3} A${R_INNER},${R_INNER} 0 0 0 ${x4},${y4} Z`;
}

export default function ScoreGauge({ score }) {
  const grade = gradeFor(score);
  const step = SWEEP / SEGMENTS;
  const gap = 0.9; // small gap in degrees so the blocks read as separate

  const segments = Array.from({ length: SEGMENTS }, (_, i) => {
    const a0 = START_ANGLE + i * step + gap / 2;
    const a1 = START_ANGLE + (i + 1) * step - gap / 2;
    const filled = ((i + 0.5) / SEGMENTS) * 100 <= score;
    const t = i / (SEGMENTS - 1);
    return (
      <path
        key={i}
        d={segmentPath(a0, a1)}
        // filled blocks fade from one gradient color to the next; empty ones use the "rest" color
        fill={filled ? lerpColor(grade.from, grade.to, t) : grade.rest}
        opacity={filled ? 1 : grade.restOpacity}
        className={filled ? 'gauge__seg gauge__seg--filled' : 'gauge__seg'}
        // staggered delay makes the arc "sweep" in on page load
        style={filled ? { animationDelay: `${i * 18}ms` } : undefined}
      />
    );
  });

  // Scale labels sit just outside the arc at 0, 25, 50, 75 and 100
  const labels = [0, 25, 50, 75, 100].map((v) => {
    const [x, y] = polar(START_ANGLE + (v / 100) * SWEEP, R_OUTER + 24);
    return (
      <text key={v} x={x} y={y} className="gauge__label" textAnchor="middle" dominantBaseline="middle">
        {v}
      </text>
    );
  });

  return (
    <div className="gauge">
      <svg viewBox="0 0 400 400" className="gauge__svg">
        <defs>
          <filter id="gaugeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* thin rings inside and outside the blocks give it that "instrument" look */}
        <circle cx={CX} cy={CY} r={R_OUTER + 8} fill="none" stroke="#1c6aa8" strokeWidth="1" opacity="0.5" />
        <circle cx={CX} cy={CY} r={R_INNER - 10} fill="rgba(5,16,32,0.8)" stroke="#1c6aa8" strokeWidth="1" opacity="0.8" />

        <g filter="url(#gaugeGlow)">{segments}</g>
        {labels}
      </svg>

      <div className="gauge__center">
        <div className="gauge__value">{score}</div>
        <div className="gauge__max">/100</div>
        <div className="gauge__caption">Security Score</div>
      </div>

      <div className="gauge__grade" style={{ color: grade.color, borderColor: grade.color }}>
        {grade.label}
      </div>
    </div>
  );
}
