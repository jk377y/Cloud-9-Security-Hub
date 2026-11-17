// Tiny filled arrows used for "up 5.6%" / "down 18%" style change indicators.
// They inherit the text color, so the parent decides if it's green or red.
export function TriangleUp() {
  return <span style={{ fontSize: '0.8em' }}>▲</span>;
}

export function TriangleDown() {
  return <span style={{ fontSize: '0.8em' }}>▼</span>;
}
