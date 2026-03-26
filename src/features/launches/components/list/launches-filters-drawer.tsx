import { Box, Button, Drawer, Flex, Stack, Text } from "@chakra-ui/react";
import { FilterSelect } from "@/components/ui/filter-select";
import { DateInput } from "@/components/ui/date-input";

interface LaunchesFiltersDrawerProps {
  success: string;
  upcoming: string;
  dateFrom: string;
  dateTo: string;
  hasActiveFilters: boolean;
  onSuccessChange: (value: string) => void;
  onUpcomingChange: (value: string) => void;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onReset: () => void;
}

export function LaunchesFiltersDrawer({
  success,
  upcoming,
  dateFrom,
  dateTo,
  hasActiveFilters,
  onSuccessChange,
  onUpcomingChange,
  onDateFromChange,
  onDateToChange,
  onReset,
}: LaunchesFiltersDrawerProps) {
  const activeFilterCount = [success, upcoming, dateFrom, dateTo].filter(Boolean).length;

  return (
    <Drawer.Root placement="end">
      <Drawer.Trigger asChild>
        <Button
          variant="outline"
          size="md"
          textTransform="uppercase"
          letterSpacing="wider"
          position="relative"
        >
          Advanced_filters
          {activeFilterCount > 0 && (
            <Box
              position="absolute"
              top="-8px"
              right="-8px"
              bg="white"
              color="black"
              borderRadius="full"
              w="20px"
              h="20px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="xs"
              fontWeight="bold"
              lineHeight={1}
              boxShadow="sm"
            >
              {activeFilterCount}
            </Box>
          )}
        </Button>
      </Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Flex align="center" justify="space-between">
              <Text fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                Filters
              </Text>
              <Drawer.CloseTrigger asChild>
                <Button variant="ghost" size="sm">
                  Close
                </Button>
              </Drawer.CloseTrigger>
            </Flex>
          </Drawer.Header>
          <Drawer.Body>
            <Stack gap={4}>
              <FilterSelect
                label="Filter by status"
                value={success}
                options={[
                  { label: "All", value: "" },
                  { label: "Success", value: "true" },
                  { label: "Failure", value: "false" },
                ]}
                onChange={onSuccessChange}
                width="full"
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
                width="full"
              />
              <DateInput
                label="Date from"
                value={dateFrom}
                onChange={onDateFromChange}
                max={dateTo || undefined}
                width="full"
              />
              <DateInput
                label="Date to"
                value={dateTo}
                onChange={onDateToChange}
                min={dateFrom || undefined}
                width="full"
              />
            </Stack>
          </Drawer.Body>
          {hasActiveFilters && (
            <Drawer.Footer>
              <Button variant="outline" colorPalette="red" width="full" onClick={onReset}>
                Reset filters
              </Button>
            </Drawer.Footer>
          )}
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}
