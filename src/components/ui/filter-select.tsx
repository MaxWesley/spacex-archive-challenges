import { NativeSelect } from "@chakra-ui/react";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterSelectProps {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
  width?: Record<string, string> | string;
}

export function FilterSelect({
  label,
  value,
  options,
  onChange,
  width = { base: "full", md: "180px" },
}: FilterSelectProps) {
  return (
    <NativeSelect.Root size="md" width={width}>
      <NativeSelect.Field
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  );
}
