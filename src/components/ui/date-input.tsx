import { Input } from "@chakra-ui/react";

interface DateInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  max?: string;
  min?: string;
  width?: Record<string, string> | string;
}

export function DateInput({
  label,
  value,
  onChange,
  max,
  min,
  width = { base: "full", md: "180px" },
}: DateInputProps) {
  return (
    <Input
      type="date"
      aria-label={label}
      placeholder={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      max={max}
      min={min}
      size="md"
      width={width}
    />
  );
}
