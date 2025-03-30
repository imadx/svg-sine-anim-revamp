import { useEffect, useState } from "react";

export const SvgCurve = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const updateOffsetY = () => {
      if (offsetY < -100) {
        setOffsetY(0);
      }

      setOffsetY((offset) => offset - 5);
    };

    const interval = setInterval(updateOffsetY, 10);
    return () => {
      clearInterval(interval);
    };
  }, [offsetY]);

  return (
    <svg className="w-full h-full" viewBox="0 0 1000 1000">
      <path
        d={`M -${
          180 - offsetY
        } 0  q 90 0 180 100 t 180 0 t 180 0 t 180 0 t 180 0 t 180 0 t 180 0 t 180 0 t 180 0`}
        fill="none"
        stroke="black"
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  );
};
