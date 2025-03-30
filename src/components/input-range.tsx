import { useId } from "react";

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
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange && onChange(parseInt(e.target.value))}
      />
    </div>
  );
};
