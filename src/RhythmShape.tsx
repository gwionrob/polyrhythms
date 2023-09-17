import Circle from "./Circle";
import "./App.css";
import { useState } from "react";
import Polygon from "./Polygon";

type Point = { x?: number; y?: number };

type Points = Array<Point>;

type Props = {
  sides: number;
  radius: number;
};

function RhythmShape({ sides, radius }: Props) {
  const [points, setPoints] = useState<Points>([]);

  return (
    <div id={"rhythm-shape-" + sides} className="rhythm-shape-container">
      <Polygon sides={sides} radius={radius} setPoints={setPoints} />
      {points.length !== 0 ? <Circle points={points} /> : null}
    </div>
  );
}

export default RhythmShape;
