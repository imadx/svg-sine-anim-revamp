import { useState } from "react";
import "./App.css";
import { SvgCurve } from "./components/svg-curve";

function App() {
  const [amplitude, setAmplitude] = useState(20);
  const [wavelength, setWavelength] = useState(30);
  const [frequency, setFrequency] = useState(1);

  return (
    <>
      <div className="bg-red-500">SVG Lines</div>

      <form>
        <input
          type="range"
          min={1}
          max={100}
          step={1}
          value={amplitude}
          onChange={(e) => setAmplitude(parseInt(e.target.value))}
        />
        <p>Amplitude: {amplitude}</p>

        <input
          type="range"
          min={1}
          max={100}
          step={1}
          value={wavelength}
          onChange={(e) => setWavelength(parseInt(e.target.value))}
        />
        <p>Wavelength: {wavelength}</p>

        <input
          type="range"
          min={1}
          max={100}
          step={1}
          value={frequency}
          onChange={(e) => setFrequency(parseInt(e.target.value))}
        />
        <p>Frequency: {frequency}</p>
      </form>
      <SvgCurve
        amplitude={amplitude}
        wavelength={wavelength}
        frequency={frequency}
      />
    </>
  );
}

export default App;
