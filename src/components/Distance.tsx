import { FaLocationArrow } from "react-icons/fa";

export const Distance = ({
  progress,
  isPaused,
  setIsPaused,
}: {
  progress: number;
  setIsPaused: (value: boolean) => void;
  isPaused: boolean;
}) => {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        alignItems: "center",
        zIndex: "999",
        bottom: "2rem",
        left: "37%",
        gap: "0.5rem",
        background: "#fff",
        borderRadius: "1rem",
        width: "500px",
        height: "100px",
        padding: "0 2rem",
      }}
    >
      <button onClick={() => setIsPaused(!isPaused)}>
        {isPaused ? "Play" : "Stop"}
      </button>
      <p>Progress: {progress.toFixed(2)}%</p>
      <div
        style={{
          minWidth: "100%",
          background: "#eaeaea",
          position: "relative",
        }}
      >
        <div
          style={{
            height: "20px",
            background: "#00b4d8",
            width: `${progress.toFixed(0)}%`,
            position: "absolute",
            zIndex: 1,
            top: "-10px",
          }}
        />
        <FaLocationArrow
          style={{
            rotate: "45deg",
            position: "absolute",
            left: `${Number(progress.toFixed(0)) - 5}%`,
            zIndex: 2,
            fontSize: "50px",
            top: "-25px",
          }}
        />
      </div>
    </div>
  );
};
