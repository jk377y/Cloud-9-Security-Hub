import './WorldMap.css';

// A rough dotted world map, no map library needed.
// Each row is one 4-degree band of latitude (starting at 80N), and each pair
// is a stretch of land as [firstColumn, lastColumn]. Each column is 4 degrees
// of longitude (starting at 180W). It's hand-drawn and approximate, which is
// plenty for a visual demo.
const LAND_ROWS = [
  [[33, 40]],
  [[16, 28], [32, 41], [62, 72]],
  [[7, 12], [14, 28], [32, 41], [55, 88]],
  [[5, 30], [33, 40], [41, 42], [46, 88]],
  [[6, 21], [26, 31], [33, 38], [41, 43], [47, 88]],
  [[5, 22], [25, 30], [36, 38], [43, 45], [47, 88]],
  [[7, 22], [26, 30], [43, 46], [47, 88]],
  [[8, 30], [42, 46], [47, 84]],
  [[10, 31], [44, 82], [83, 84]],
  [[11, 32], [44, 56], [58, 80], [82, 84]],
  [[11, 31], [44, 56], [54, 80], [82, 84]],
  [[11, 30], [43, 52], [54, 70], [70, 81], [82, 84]],
  [[13, 29], [43, 56], [56, 66], [66, 80]],
  [[14, 24], [27, 28], [41, 57], [57, 64], [65, 72], [72, 80]],
  [[15, 23], [26, 28], [40, 58], [58, 64], [64, 72], [72, 80]],
  [[18, 26], [28, 30], [39, 58], [65, 70], [71, 78]],
  [[20, 27], [39, 58], [65, 70], [72, 77], [78, 79]],
  [[22, 26], [27, 33], [40, 58], [66, 69], [72, 76]],
  [[25, 35], [40, 57], [68, 69], [73, 75]],
  [[25, 38], [44, 57], [70, 74], [76, 78]],
  [[25, 39], [46, 59], [70, 73], [76, 79], [82, 88]],
  [[26, 40], [46, 59], [72, 80], [82, 88]],
  [[27, 40], [47, 58], [74, 80], [84, 88]],
  [[27, 38], [47, 58], [76, 84]],
  [[27, 37], [47, 58], [74, 87]],
  [[28, 37], [47, 57], [58, 60], [73, 88]],
  [[28, 36], [47, 56], [72, 89]],
  [[28, 35], [47, 55], [72, 89]],
  [[28, 34], [48, 54], [73, 88]],
  [[28, 33], [49, 53], [76, 88], [88, 89]],
  [[28, 32], [80, 82], [88, 89]],
  [[27, 31], [87, 88]],
  [[27, 30]],
  [[27, 30]],
  [[27, 29]],
];

const COLS = 90;
const CELL = 10; // size of each dot cell in SVG units

const STATUS_COLORS = {
  healthy: '#2ecc71',
  attention: '#ff9f1c',
  risk: '#ff4d4f',
  info: '#2f8cff',
};

// Turns longitude/latitude into x/y positions on our grid.
function project(lon, lat) {
  return [((lon + 180) / 4) * CELL + CELL / 2, ((80 - lat) / 4) * CELL + CELL / 2];
}

export default function WorldMap({ markers }) {
  // Build the land dots once up front
  const dots = [];
  LAND_ROWS.forEach((runs, row) => {
    runs.forEach(([start, end]) => {
      for (let col = start; col <= end && col < COLS; col++) {
        dots.push(<circle key={`${row}-${col}`} cx={col * CELL + CELL / 2} cy={row * CELL + CELL / 2} r="2.6" />);
      }
    });
  });

  return (
    <svg className="worldmap" viewBox={`0 0 ${COLS * CELL} ${LAND_ROWS.length * CELL}`} preserveAspectRatio="xMidYMid meet">
      <g className="worldmap__land">{dots}</g>

      {markers.map((m, i) => {
        const [x, y] = project(m.lon, m.lat);
        const color = STATUS_COLORS[m.status];
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            {/* the pulsing ring draws the eye; the solid dot is the actual marker */}
            <circle className="worldmap__pulse" r="12" fill="none" stroke={color} strokeWidth="1.5" style={{ animationDelay: `${i * 0.35}s` }} />
            <circle r="13" fill={color} opacity="0.18" />
            <circle r="5" fill={color} style={{ filter: `drop-shadow(0 0 5px ${color})` }} />
          </g>
        );
      })}
    </svg>
  );
}
