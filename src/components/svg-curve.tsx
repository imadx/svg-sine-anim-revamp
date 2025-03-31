import { FC, useEffect, useMemo, useState } from 'react';

interface Props {
  amplitude?: number;
  wavelength?: number;
  frequency?: number;
}

export const SvgCurve: FC<Props> = ({
  amplitude = 20,
  wavelength = 30,
  frequency = 1,
}) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const updateOffsetY = () => {
      const w = wavelength * 0.01 * 1000;
      if (phase < -w * 2) {
        setPhase(0);
      }

      setPhase((offset) => offset - frequency);
    };

    let animationFrameId: number;

    const animate = () => {
      updateOffsetY();
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [frequency, phase, wavelength]);

  const path = useMemo(() => {
    const w = Math.max(wavelength, 1) * 0.01 * 1000;
    const a = Math.max(amplitude, 1) * 0.01 * 1000;
    const continuation = new Array(Math.ceil((1000 + wavelength) / wavelength))
      .fill(`t ${w} 0`)
      .join(' ');

    return `M -${w - phase} 0 q ${w / 2} 0 ${w} ${a} ${continuation}`;
  }, [amplitude, phase, wavelength]);

  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
    >
      <path
        d={path}
        fill="none"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  );
};
