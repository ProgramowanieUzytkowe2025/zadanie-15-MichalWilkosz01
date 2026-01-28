import React, { useState } from "react";
import TSPVisualizer from "./TSPVisualizer";
import Solution from "./Solution";
import MonteCarloControl from "./MonteCarloControl";
import QualityChart from "./QualityChart";
import { parseTSP, randomRoute, routeLength } from "./utils";

function App() {
  const [points, setPoints] = useState([]);
  const [route, setRoute] = useState([]);
  const [history, setHistory] = useState([]);
  const [simulationKey, setSimulationKey] = useState(0);

  const handleFile = e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = ev => {
      const parsed = parseTSP(ev.target.result);
      const initialRoute = randomRoute(parsed);
      const initialLength = routeLength(initialRoute);

      setPoints(parsed);
      setRoute(initialRoute);
      setHistory([initialLength]);

      setSimulationKey(prev => prev + 1);
    };

    reader.readAsText(file);
    
    // USUNIĘTO LINIĘ: e.target.value = null;
    // Dzięki temu input zapamięta wybrany plik i wyświetli jego nazwę.
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Problem Komiwojażera (TSP)</h1>

      {/* Input teraz sam będzie pokazywał nazwę pliku po wybraniu */}
      <input type="file" accept=".tsp,.txt" onChange={handleFile} />

      <TSPVisualizer points={points} route={route} />
      <Solution route={route} />

      <MonteCarloControl
        key={simulationKey}
        points={points}
        route={route}
        setRoute={setRoute}
        setHistory={setHistory}
      />

      <QualityChart data={history} />
    </div>
  );
}

export default App;