import React, { useEffect, useRef, useState } from "react";
import { randomRoute, routeLength } from "./utils";

export default function MonteCarloControl({
  points,
  route,
  setRoute,
  setHistory
}) {
  const [running, setRunning] = useState(false);
  const [iterations, setIterations] = useState(0);

  const intervalRef = useRef(null);
  const bestLengthRef = useRef(Infinity);

  useEffect(() => {
    if (route.length > 0) {
      bestLengthRef.current = routeLength(route);
    }
  }, [route]);

  //Usuwanie
  useEffect(() => () => clearInterval(intervalRef.current), []);

  const startStop = () => {
    if (running) {
      clearInterval(intervalRef.current);
      setRunning(false);
      return;
    }

    setRunning(true);

    intervalRef.current = setInterval(() => {
      setIterations(i => i + 1);

      const candidate = randomRoute(points);
      const length = routeLength(candidate);

      setHistory(h => [...h, length]);

      if (length < bestLengthRef.current) {
        bestLengthRef.current = length;
        setRoute(candidate);
      }
    }, 1000);
  };

  return (
    <div style={{ marginTop: 20 }}>
      <button onClick={startStop}>
        {running ? "Przerwa" : "Szukaj rozwiązania"}
      </button>

      <span style={{ marginLeft: 20 }}>
        Iteracje: <strong>{iterations}</strong>
      </span>
    </div>
  );
}
