import { useEffect, useRef, useState } from "react";
import { Input, IconButton, Flex } from "@chakra-ui/react";
import { LuSearch, LuX } from "react-icons/lu";

interface LaunchesSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  debounceMs?: number;
}

export function LaunchesSearchInput({
  value,
  onChange,
  debounceMs = 400,
}: LaunchesSearchInputProps) {
  const [localValue, setLocalValue] = useState(value);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setLocalValue(next);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onChange(next), debounceMs);
  };

  const handleClear = () => {
    setLocalValue("");
    if (timerRef.current) clearTimeout(timerRef.current);
    onChange("");
  };

  return (
    <Flex gap={2} maxW={{ base: "full", md: "400px" }}>
      <Flex position="relative" flex={1}>
        <Input
          placeholder="Search launches..."
          value={localValue}
          onChange={handleChange}
          pl={10}
          size="md"
        />
        <LuSearch
          style={{
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
            opacity: 0.5,
          }}
        />
        {localValue && (
          <IconButton
            aria-label="Clear search"
            variant="ghost"
            size="xs"
            onClick={handleClear}
            position="absolute"
            right="4px"
            top="50%"
            transform="translateY(-50%)"
          >
            <LuX />
          </IconButton>
        )}
      </Flex>
    </Flex>
  );
}
