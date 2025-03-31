import { useId } from 'react';

interface Props {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
  label?: string;
}

export const InputRange = ({
  min = 0,
  max = 100,
  step = 1,
  value = 50,
  onChange,
  label,
}: Props) => {
  const id = useId();

  return (
    <div className="flex flex-col gap-1 justify-start min-w-64">
      {label && (
        <label htmlFor={id} className="text-left">
          {label}
        </label>
      )}
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange && onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-lime-500 focus:outline-none"
      />
    </div>
  );
};
