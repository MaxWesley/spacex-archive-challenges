import { Flex } from "@chakra-ui/react";
import { LaunchesSearchInput } from "./launches-search-input";
import { FilterSelect } from "@/components/ui/filter-select";
import { DateInput } from "@/components/ui/date-input";

interface LaunchesFiltersProps {
  search: string;
  success: string;
  upcoming: string;
  dateFrom: string;
  dateTo: string;
  onSearchChange: (value: string) => void;
  onSuccessChange: (value: string) => void;
  onUpcomingChange: (value: string) => void;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
}

export function LaunchesFilters({
  search,
  success,
  upcoming,
  dateFrom,
  dateTo,
  onSearchChange,
  onSuccessChange,
  onUpcomingChange,
  onDateFromChange,
  onDateToChange,
}: LaunchesFiltersProps) {
  return (
    <Flex mb={4} gap={3} flexDir={{ base: "column", md: "row" }} flexWrap="wrap">
      <LaunchesSearchInput value={search} onChange={onSearchChange} />
      <FilterSelect
        label="Filter by status"
        value={success}
        options={[
          { label: "All", value: "" },
          { label: "Success", value: "true" },
          { label: "Failure", value: "false" },
        ]}
        onChange={onSuccessChange}
      />
      <FilterSelect
        label="Filter by schedule"
        value={upcoming}
        options={[
          { label: "All", value: "" },
          { label: "Upcoming", value: "true" },
          { label: "Past", value: "false" },
        ]}
        onChange={onUpcomingChange}
      />
      <DateInput
        label="Date from"
        value={dateFrom}
        onChange={onDateFromChange}
        max={dateTo || undefined}
      />
      <DateInput
        label="Date to"
        value={dateTo}
        onChange={onDateToChange}
        min={dateFrom || undefined}
      />
    </Flex>
  );
}
