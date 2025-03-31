import { useEffect, useRef, useState } from 'react';
import './App.css';
import { SvgCurve } from './components/svg-curve';
import { InputRange } from './components/input-range';
import { GithubIcon } from 'lucide-react';
import { Footer } from './components/footer.tsx';

const ValueResFull = 100;

const defaults = {
  amplitude: 20,
  wavelength: 100,
  frequency: 10,
  count: 4,
  offsetX: 10,
};

function App() {
  const [amplitude, setAmplitude] = useState(defaults.amplitude);
  const [wavelength, setWavelength] = useState(defaults.wavelength);
  const [frequency, setFrequency] = useState(defaults.frequency);
  const [count, setCount] = useState(defaults.count);
  const [offsetX, setOffsetX] = useState(defaults.offsetX / ValueResFull);

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
      <div className="absolute w-screen h-screen top-0 left-0">{svgLines}</div>
      <form className="relative z-10 bg-gray-700-500/10 flex flex-col gap-6 items-start p-4 rounded-sm backdrop-blur-3xl border border-gray-500/20 shadow">
        <div className="font-bold text-xl">SVG Waveform</div>
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

        <hr className="w-full border-t border-gray-500/20" />
        <Footer />
      </form>
    </>
  );
}

export default App;
