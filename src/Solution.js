import React from "react";
import { routeLength } from "./utils";

export default function Solution({ route }) {
  if (!route.length) return null;

  return (
    <div style={{ marginTop: 20 }}>
      <h2>Rozwiązanie</h2>

      <div style={{ fontFamily: "monospace", marginBottom: 10 }}>
        {route.map((p, i) => (
          <span key={i}>
            {p.id}
            {i < route.length - 1 && " -> "}
          </span>
        ))}
      </div>

      <strong>Długość trasy:</strong>{" "}
      {routeLength(route).toFixed(2)}
    </div>
  );
}
