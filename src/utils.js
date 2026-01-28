export function parseTSP(text) {
  const lines = text.split("\n");
  const points = [];
  let reading = false;

  for (let line of lines) {
    line = line.trim();

    if (line === "NODE_COORD_SECTION") {
      reading = true;
      continue;
    }

    if (line === "EOF") break;

    if (reading) {
      const [id, x, y] = line.split(/\s+/);
      points.push({
        id: Number(id),
        x: parseFloat(x),
        y: parseFloat(y)
      });
    }
  }

  return points;
}

export function distance(a, b) {
  return Math.sqrt(
    Math.pow(a.x - b.x, 2) +
    Math.pow(a.y - b.y, 2)
  );
}

export function routeLength(route) {
  let sum = 0;
  for (let i = 0; i < route.length - 1; i++) {
    sum += distance(route[i], route[i + 1]);
  }
  return sum;
}

export function randomRoute(points) {
  const shuffled = [...points];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
