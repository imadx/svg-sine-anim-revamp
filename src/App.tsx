import { useState } from "react";
import "./App.css";
import { SvgCurve } from "./components/svg-curve";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="bg-red-500">SVG Lines</div>

      <form>
        <input type="slider" />
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value))}
        />
        <p>{count}</p>
      </form>
      <SvgCurve />
    </>
  );
}

export default App;
