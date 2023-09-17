import RhythmShape from "./RhythmShape";
import { useState } from "react";
import "./App.css";

function App() {
  const [seconds, setSeconds] = useState(2);

  return (
    <>
      <RhythmShape sides={3} radius={100} />
      <RhythmShape sides={4} radius={100} />
    </>
  );
}
export default App;
