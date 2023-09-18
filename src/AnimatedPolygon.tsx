import { useMemo } from "react";
import { polygon, pointMaker } from "./utils";
import { animated, useSprings } from "@react-spring/web";

type Point = { x?: number; y?: number };

type Points = Array<Point>;

type Props = {
  sides: Array<number>;
  radius: number;
};

type SpringFn = {
  from: Point;
  to: Points;
  loop: boolean;
  config: { duration: number };
};

function springFn(points: number[][]): SpringFn {
  return {
    from: pointMaker(points[0]),
    to: points
      .map((point, index) => {
        return pointMaker(point, points[index - 1]);
      })
      .concat(pointMaker(points[0])),
    loop: true,
    config: { duration: 3000 / points.length },
  };
}

function AnimatedPolygons({ sides, radius }: Props) {
  const allPoints = useMemo(
    () => sides.map((side, index) => polygon(radius, index, side, radius)),
    [sides, radius]
  );
  const colors = useMemo(
    () =>
      sides.map(() => {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
      }),
    [sides]
  );
  const [springs] = useSprings(allPoints.length, (i) => springFn(allPoints[i]));

  return (
    <>
      <div>
        {springs.map((props, index) => (
          <animated.div
            style={{
              width: 40,
              height: 40,
              position: "absolute",
              background: colors[index],
              borderRadius: "50%",
              ...props,
            }}
            key={index}
          ></animated.div>
        ))}
      </div>
      <svg
        width={radius * 2 * sides.length}
        height={radius * 2}
        fill="none"
        strokeWidth="8"
      >
        {allPoints.map((points, index) => {
          return (
            <polygon
              points={points.join(" ")}
              key={index}
              stroke={colors[index]}
            />
          );
        })}
      </svg>
    </>
  );
}

export default AnimatedPolygons;
