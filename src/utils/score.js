// Shared helpers so every component agrees on what "good" and "bad" look like.

// Maps a 0-100 score to a status color. Change the thresholds here and
// the whole dashboard follows.
export function scoreColor(score) {
  if (score >= 80) return 'var(--green)';
  if (score >= 60) return 'var(--orange)';
  return 'var(--red)';
}

// One color per finding severity, used by the findings list and failed controls.
export const SEVERITY_COLORS = {
  CRITICAL: 'var(--red)',
  HIGH: 'var(--red)',
  MEDIUM: 'var(--orange)',
  LOW: 'var(--blue)',
};

// Turns the overall score into a grade label and the gauge palette.
// "rest" is the color of the unfilled part of the gauge.
export function gradeFor(score) {
  if (score >= 80) {
    return { label: 'GOOD', color: '#2ee6a6', from: '#19c8ff', to: '#2ee6a6', rest: '#173a5a', restOpacity: 0.9 };
  }
  if (score >= 60) {
    return { label: 'FAIR', color: '#ff9f1c', from: '#1a6bff', to: '#19e0ff', rest: '#ff9f1c', restOpacity: 0.75 };
  }
  return { label: 'POOR', color: '#ff4d4f', from: '#ff9f1c', to: '#ff4d4f', rest: '#4a2230', restOpacity: 0.9 };
}

// Blends two hex colors. t is 0 (all "a") to 1 (all "b").
export function lerpColor(a, b, t) {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const ch = (shift) => {
    const ca = (pa >> shift) & 255;
    const cb = (pb >> shift) & 255;
    return Math.round(ca + (cb - ca) * t);
  };
  return `rgb(${ch(16)}, ${ch(8)}, ${ch(0)})`;
}
