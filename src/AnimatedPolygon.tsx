import { useMemo, useState } from "react";
import { polygon, pointMaker, createAudios } from "./utils";
import { animated, useSprings } from "@react-spring/web";

type Props = {
  sides: Array<number>;
  radius: number;
};

function initFn(points: number[][], audioElement: HTMLAudioElement) {
  return {
    from: pointMaker(points[0]),
    to: points
      .slice(1)
      .map((point, index) => {
        return pointMaker(point, points[index - 1]);
      })
      .concat(pointMaker(points[0])),
    loop: true,
    pause: true,
    onStart: () => {
      audioElement.play();
    },
    config: { duration: 3000 / points.length },
  };
}

function AnimatedPolygons({ sides, radius }: Props) {
  const [paused, setPaused] = useState(true);
  const audios = createAudios(sides);

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
  const [springs, api] = useSprings(
    allPoints.length,
    (i) => initFn(allPoints[i], audios[i]),
    [sides]
  );

  const togglePause = () => {
    api.start({ pause: !paused });
    setPaused(!paused);
  };

  const reset = () => {
    api.start({ reset: true });
    api.start({ pause: true });
    setPaused(true);
  };

  return (
    <>
      <div>
        <button onClick={togglePause}>Toggle</button>
        <button onClick={reset}>Reset</button>
      </div>
      <div>
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
      </div>
    </>
  );
}

export default AnimatedPolygons;
