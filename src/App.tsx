import { useState } from 'react';
import './App.css';
import { SvgCurve } from './components/svg-curve';
import { InputRange } from './components/input-range';

function App() {
  const [amplitude, setAmplitude] = useState(20);
  const [wavelength, setWavelength] = useState(100);
  const [frequency, setFrequency] = useState(10);
  const [count, setCount] = useState(1);
  const [offsetX, setOffsetX] = useState(0);

  const svgLines = new Array(count).fill(0).map((_, i) => {
    return (
      <div className="absolute top-0 left-0 w-full h-full" key={i}>
        <SvgCurve
          key={i}
          amplitude={amplitude}
          wavelength={wavelength}
          frequency={frequency}
        />
      </div>
    );
  });

  return (
    <>
      <div className="bg-red-500">SVG Lines</div>
      <div className="absolute w-screen h-screen top-0 left-0">{svgLines}</div>
      <form className="relative z-10 bg-red-500">
        <InputRange
          min={1}
          max={100}
          step={1}
          value={count}
          onChange={setCount}
          label="Count"
        />
        <InputRange
          min={1}
          max={100}
          step={1}
          value={offsetX}
          onChange={setOffsetX}
          label="Offset X"
        />

        <InputRange
          min={1}
          max={100}
          step={1}
          value={amplitude}
          onChange={setAmplitude}
          label="Amplitude"
        />

        <InputRange
          min={1}
          max={100}
          step={1}
          value={wavelength}
          onChange={setWavelength}
          label="Wavelength"
        />

        <InputRange
          min={1}
          max={100}
          step={1}
          value={frequency}
          onChange={setFrequency}
          label="Frequency"
        />
      </form>
    </>
  );
}

export default App;
