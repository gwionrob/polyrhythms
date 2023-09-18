type Point = { x?: number; y?: number };

export function range(count: number) {
  return Array.from(Array(count).keys());
}

export function degreesToRadians(angleInDegrees: number) {
  return (Math.PI * angleInDegrees) / 180;
}

export function points(sideCount: number, radius: number) {
  const angle = 360 / sideCount;
  const vertexIndices = range(sideCount);
  const offsetDeg = (180 - angle) / 2;
  const offset = degreesToRadians(offsetDeg);

  return vertexIndices.map((index) => {
    return {
      theta: offset + degreesToRadians(angle * index),
      r: radius,
    };
  });
}

export function polygon(
  dimension: number,
  index: number,
  sideCount: number,
  radius: number
) {
  const xOffset = 2 * index * radius;
  return points(sideCount, radius).map(({ r, theta }) => [
    dimension + r * Math.cos(theta) + xOffset,
    dimension + r * Math.sin(theta),
  ]);
}

export function pointMaker(rawPoint: number[], prevPoint?: number[]): Point {
  const x = rawPoint[0] - 20; // - 20 to offest the circle width
  const y = rawPoint[1] - 20;
  if (!prevPoint) return { x: x, y: y };
  const prevX = prevPoint[0];
  const prevY = prevPoint[1];
  if (x === prevX) {
    return { y: y };
  } else if (y === prevY) {
    return { x: x };
  }
  return { x: x, y: y };
}
