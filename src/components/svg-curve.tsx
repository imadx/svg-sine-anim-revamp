import { FC, useEffect, useMemo, useState } from 'react';

const _globalState = {
  current: 0,
};

interface Props {
  amplitude?: number;
  wavelength?: number;
  frequency?: number;
  offsetX?: number;
  isPaused?: boolean;
  color?: string;
}

export const SvgCurve: FC<Props> = ({
  amplitude = 20,
  wavelength = 30,
  frequency = 1,
  offsetX = 0,
  isPaused = false,
  color = 'white',
}) => {
  const [phase, setPhase] = useState(_globalState.current);
  const w = useMemo(() => wavelength * 10, [wavelength]);
  const a = useMemo(() => amplitude * 10, [amplitude]);
  const o = useMemo(() => (offsetX * 10) % w, [offsetX, w]);

  useEffect(() => {
    const updateOffsetX = () => {
      if (phase < -w * 4) {
        setPhase(0);
        _globalState.current = 0;

        return;
      }

      setPhase((_phase) => _phase - frequency);

      _globalState.current = phase - frequency;
    };

    let animationFrameId: number;

    const animate = () => {
      if (isPaused) {
        cancelAnimationFrame(animationFrameId);
        return;
      }

      updateOffsetX();
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [frequency, isPaused, phase, w, wavelength]);

  const effectivePhase = useMemo(() => {
    return phase + o;
  }, [o, phase]);

  const pathTemplate = useMemo(() => {
    const continuation = new Array(Math.ceil(((1000 + o) * 6) / w))
      .fill(`t ${w} 0`)
      .join(' ');

    return `M {{initialPoint}} 0 q ${w / 2} 0 ${w} ${a} ${continuation}`;
  }, [a, o, w]);

  const path = useMemo(() => {
    const _initialPoint = 2 * w - effectivePhase;

    return pathTemplate.replace('{{initialPoint}}', `-${_initialPoint}`);
  }, [effectivePhase, pathTemplate, w]);

  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
    >
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  );
};
