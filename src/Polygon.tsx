import { Dispatch, SetStateAction, useEffect, useRef } from "react";

type Point = { x?: number; y?: number };

type Points = Array<Point>;

type Props = {
  sides: number;
  radius: number;
  setPoints: Dispatch<SetStateAction<Points>>;
};

function pointMaker(rawPoint: Point, prevPoint: Point): Point {
  if (!prevPoint) return rawPoint;
  if (rawPoint.x === prevPoint.x) {
    return { y: rawPoint.y };
  } else if (rawPoint.y === prevPoint.y) {
    return { x: rawPoint.x };
  }
  return rawPoint;
}

function Polygon({ sides, radius, setPoints }: Props) {
  const polyRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = polyRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.reset();
    const x = radius;
    const y = radius;
    const angle = (2 * Math.PI) / sides;
    const offsetRad = (Math.PI - angle) / 2;
    ctx.beginPath();
    ctx.moveTo(
      x + radius * Math.cos(offsetRad),
      y + radius * Math.sin(offsetRad)
    );
    let points: Points = [];
    for (var i = 1; i <= sides; i++) {
      const rawPoint = {
        x: x + radius * Math.cos(offsetRad + i * angle),
        y: y + radius * Math.sin(offsetRad + i * angle),
      };
      ctx.lineTo(rawPoint.x, rawPoint.y);
      points.push(pointMaker(rawPoint, points[points.length - 1]));
    }
    ctx.stroke();
    setPoints(points);
  }, []);
  return (
    <canvas
      id={"polygon-" + sides}
      ref={polyRef}
      width={radius * 2}
      height={radius * 2}
    >
      Your browser does not support the HTML5 canvas tag.{" "}
    </canvas>
  );
}

export default Polygon;
