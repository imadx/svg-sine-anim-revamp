import { useEffect, useRef, useState } from 'react';
import './App.css';
import { SvgCurve } from './components/svg-curve';
import { InputRange } from './components/input-range';

const ValueResFull = 100;

function App() {
  const [amplitude, setAmplitude] = useState(20);
  const [wavelength, setWavelength] = useState(100);
  const [frequency, setFrequency] = useState(10);
  const [count, setCount] = useState(1);
  const [offsetX, setOffsetX] = useState(0);

  const [isUpdating, setIsUpdating] = useState(false);
  const updatingTimeoutRef = useRef<number | null>(null);

  const handleChange = () => {
    setIsUpdating(true);
    clearTimeout(updatingTimeoutRef.current!);
    updatingTimeoutRef.current = setTimeout(() => {
      setIsUpdating(false);
    }, 500);
  };

  useEffect(() => {
    handleChange();
  }, [amplitude, wavelength, count, offsetX]);

  const svgLines = new Array(count).fill(0).map((_, i) => {
    return (
      <div
        className="absolute top-0 left-0 w-full h-full"
        key={i}
        style={{
          opacity: 1 - i / count,
          filter: `blur(${(i / count) * 10}px)`,
        }}
      >
        <SvgCurve
          key={i}
          amplitude={amplitude}
          wavelength={wavelength}
          frequency={frequency}
          offsetX={offsetX * i * 10}
          isPaused={isUpdating}
          color={`hsl(${(i * 120) / count + 60}, 100%, 50%)`}
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
          max={10}
          step={1}
          value={count}
          onChange={setCount}
          label="Count"
        />
        <InputRange
          min={1}
          max={ValueResFull}
          value={offsetX * ValueResFull}
          onChange={(v) => setOffsetX(v / ValueResFull)}
          label="Offset X"
        />

        <InputRange
          min={1}
          max={100}
          value={amplitude}
          onChange={setAmplitude}
          label="Amplitude"
        />

        <InputRange
          min={1}
          max={100}
          value={wavelength}
          onChange={setWavelength}
          label="Wavelength"
        />

        <InputRange
          min={1}
          max={100}
          value={frequency}
          onChange={setFrequency}
          label="Frequency"
        />
      </form>
    </>
  );
}

export default App;
