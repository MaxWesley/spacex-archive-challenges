import { NativeSelect } from "@chakra-ui/react";

interface FilterOption {
  label: string;
  value: string;
}

interface LaunchesFilterSelectProps {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}

export function LaunchesFilterSelect({
  label,
  value,
  options,
  onChange,
}: LaunchesFilterSelectProps) {
  return (
    <NativeSelect.Root size="md" width={{ base: "full", md: "180px" }}>
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
