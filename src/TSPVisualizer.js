import React, { useState } from "react";

const WIDTH = 600;
const HEIGHT = 600;
const PADDING = 20;

export default function TSPVisualizer({ points, route }) {
  const [showSolution, setShowSolution] = useState(false);

  if (!points.length) return null;

  const xs = points.map(p => p.x);
  const ys = points.map(p => p.y);

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const scaleX = (WIDTH - 2 * PADDING) / (maxX - minX || 1);
  const scaleY = (HEIGHT - 2 * PADDING) / (maxY - minY || 1);
  const scale = Math.min(scaleX, scaleY);

  const map = p => ({
    x: (p.x - minX) * scale + PADDING,
    y: (p.y - minY) * scale + PADDING
  });


  const routePath = route && route.length > 0
    ? route
        .map((p, i) => {
          const { x, y } = map(p);
          return `${i === 0 ? "M" : "L"} ${x} ${y}`;
        })
        .join(" ")
    : "";

  return (
    <div>
      <h2>Wizualizacja problemu</h2>
      
      <button
        onClick={() => setShowSolution(prev => !prev)}
        style={{ marginBottom: 10, cursor: "pointer", padding: "5px 10px" }}
      >
        {showSolution ? "Ukryj rozwiązanie" : "Pokaż rozwiązanie"}
      </button>

      <div style={{ border: "1px solid black", width: WIDTH, height: HEIGHT }}>
        <svg width={WIDTH} height={HEIGHT}>
          {/* Rysowanie punktów (miast) */}
          {points.map((p, i) => {
            const { x, y } = map(p);
            return <circle key={i} cx={x} cy={y} r={4} fill="blue" />;
          })}

          {/* Rysowanie linii rozwiązania (tylko jeśli przycisk został wciśnięty) */}
          {showSolution && routePath && (
            <path
              d={routePath}
              fill="none"
              stroke="red"
              strokeWidth={2}
            />
          )}
        </svg>
      </div>
    </div>
  );
}