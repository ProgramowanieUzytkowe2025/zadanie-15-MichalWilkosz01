import React from "react";

const WIDTH = 600;
const HEIGHT = 300;
const PADDING = 50;
const TICKS = 5;

export default function QualityChart({ data }) {
  if (!data || !data.length) return null;

  const minY = Math.floor(Math.min(...data));
  const maxY = Math.ceil(Math.max(...data));


  const scaleX = i =>
    PADDING + (i / (data.length - 1 || 1)) * (WIDTH - 2 * PADDING);

  const scaleY = y =>
    HEIGHT -
    PADDING -
    ((y - minY) / (maxY - minY || 1)) * (HEIGHT - 2 * PADDING);

  const path = data
    .map((y, i) => `${i === 0 ? "M" : "L"} ${scaleX(i)} ${scaleY(y)}`)
    .join(" ");

  // Ticks Y (oś pionowa)
  const yTicks = Array.from({ length: TICKS }, (_, i) => {
    const value = minY + Math.round((i / (TICKS - 1)) * (maxY - minY));
    return {
      value,
      y: scaleY(value),
    };
  });

  // Ticks X (oś pozioma)
  const xTickCount = Math.min(data.length, 10);
  const xTicks = Array.from({ length: xTickCount }, (_, i) => {

    const divisor = xTickCount > 1 ? xTickCount - 1 : 1;
    
    const index = Math.round((i / divisor) * (data.length - 1));
    return {
      value: index,
      x: scaleX(index),
    };
  });

  return (
    <div style={{ marginTop: 30 }}>
      <h2>Jakość rozwiązania</h2>

      <svg width={WIDTH} height={HEIGHT} style={{ border: "1px solid black" }}>
        {/* Oś X */}
        <line
          x1={PADDING}
          y1={HEIGHT - PADDING}
          x2={WIDTH - PADDING}
          y2={HEIGHT - PADDING}
          stroke="black"
        />

        {/* Oś Y */}
        <line
          x1={PADDING}
          y1={PADDING}
          x2={PADDING}
          y2={HEIGHT - PADDING}
          stroke="black"
        />

        {/* Podpis osi X */}
        <text
          x={WIDTH / 2}
          y={HEIGHT - 10}
          textAnchor="middle"
          fontSize="12"
        >
          Iteracje
        </text>

        {/* Podpis osi Y */}
        <text
          x={-HEIGHT / 2}
          y={15}
          transform="rotate(-90)"
          textAnchor="middle"
          fontSize="12"
        >
          Jakość rozwiązania (długość ścieżki)
        </text>

        {/* Ticks i wartości osi Y */}
        {yTicks.map((tick, i) => (
          <g key={`y-${i}`}>
            <line
              x1={PADDING - 5}
              y1={tick.y}
              x2={PADDING}
              y2={tick.y}
              stroke="black"
            />
            <text
              x={PADDING - 8}
              y={tick.y + 4}
              textAnchor="end"
              fontSize="10"
            >
              {tick.value}
            </text>
          </g>
        ))}

        {/* Ticks i wartości osi X */}
        {xTicks.map((tick, i) => (
          <g key={`x-${i}`}>
            <line
              x1={tick.x}
              y1={HEIGHT - PADDING}
              x2={tick.x}
              y2={HEIGHT - PADDING + 5}
              stroke="black"
            />
            <text
              x={tick.x}
              y={HEIGHT - PADDING + 15}
              textAnchor="middle"
              fontSize="10"
            >
              {tick.value}
            </text>
          </g>
        ))}

        <path d={path} fill="none" stroke="blue" strokeWidth={2} />
      </svg>
    </div>
  );
}