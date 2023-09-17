import { animated, useSpring } from "@react-spring/web";

type Point = { x?: number; y?: number };

type Points = Array<Point>;

type Props = {
  points: Points;
};

function Circle({ points }: Props) {
  const [springs] = useSpring(() => ({
    from: points[0],
    to: points.concat({ x: points[0].x }),
    loop: true,
    config: { duration: 3000 / points.length },
  }));

  if (!points.length) return null;

  return (
    <animated.div
      style={{
        width: 40,
        height: 40,
        position: "absolute",
        background: "#ff6d6d",
        borderRadius: "50%",
        ...springs,
      }}
    />
  );
}
export default Circle;
