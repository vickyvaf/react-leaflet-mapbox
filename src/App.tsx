import { useState } from "react";
import { Distance } from "./components/Distance";
import Map from "./components/Map";

export default function App() {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="relative w-full h-screen">
      <Distance
        setIsPaused={setIsPaused}
        progress={progress}
        isPaused={isPaused}
      />
      <Map isPaused={isPaused} setProgress={setProgress} />
    </div>
  );
}
