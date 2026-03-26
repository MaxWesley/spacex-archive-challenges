import { Flex } from "@chakra-ui/react";
import { LaunchesSearchInput } from "./launches-search-input";
import { LaunchesFiltersDrawer } from "./launches-filters-drawer";

interface LaunchesFiltersProps {
  search: string;
  success: string;
  upcoming: string;
  dateFrom: string;
  dateTo: string;
  hasActiveFilters: boolean;
  onSearchChange: (value: string) => void;
  onSuccessChange: (value: string) => void;
  onUpcomingChange: (value: string) => void;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onReset: () => void;
}

export function LaunchesFilters({
  search,
  success,
  upcoming,
  dateFrom,
  dateTo,
  hasActiveFilters,
  onSearchChange,
  onSuccessChange,
  onUpcomingChange,
  onDateFromChange,
  onDateToChange,
  onReset,
}: LaunchesFiltersProps) {
  return (
    <Flex gap={3} flexDir={{ base: "column", md: "row" }} align={{ md: "center" }}>
      <LaunchesSearchInput value={search} onChange={onSearchChange} />
      <LaunchesFiltersDrawer
        success={success}
        upcoming={upcoming}
        dateFrom={dateFrom}
        dateTo={dateTo}
        hasActiveFilters={hasActiveFilters}
        onSuccessChange={onSuccessChange}
        onUpcomingChange={onUpcomingChange}
        onDateFromChange={onDateFromChange}
        onDateToChange={onDateToChange}
        onReset={onReset}
      />
    </Flex>
  );
}
