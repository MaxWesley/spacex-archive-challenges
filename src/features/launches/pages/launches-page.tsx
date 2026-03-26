import { Box, Flex, Grid, Container, Text } from "@chakra-ui/react";
import { LaunchCard } from "../components/launch-card";
import { LaunchesPageSkeleton } from "../components/launches-page.skeleton";
import { LaunchesPageErrorState } from "../components/launches-page-error-state";
import { LaunchesEmptyState } from "../components/launches-empty-state";
import { LaunchesPagination } from "../components/launches-pagination";
import { LaunchesFilters } from "../components/launches-filters";
import { useLaunchesPage } from "../hooks/use-launches-page";

export function LaunchesPage() {
  const {
    launches,
    isLoading,
    isFetching,
    error,
    refetch,
    search,
    success,
    upcoming,
    dateFrom,
    dateTo,
    page,
    totalPages,
    totalDocs,
    hasPrevPage,
    hasNextPage,
    handleSearchChange,
    handleSuccessChange,
    handleUpcomingChange,
    handleDateFromChange,
    handleDateToChange,
    handlePrevPage,
    handleNextPage,
    handleResetFilters,
    hasActiveFilters,
  } = useLaunchesPage();

  const renderContent = () => {
    if (isLoading) return <LaunchesPageSkeleton />;
    if (error)
      return (
        <LaunchesPageErrorState
          message={error instanceof Error ? error.message : undefined}
          onRetry={refetch}
        />
      );

    if (launches.length === 0) {
      return (
        <LaunchesEmptyState
          hasActiveFilters={hasActiveFilters}
          onReset={handleResetFilters}
        />
      );
    }

    return (
      <Box
        opacity={isFetching ? 0.5 : 1}
        transition="opacity 0.3s ease"
        pointerEvents={isFetching ? "none" : "auto"}
      >
        <Grid
          gap={4}
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(6, 1fr)",
          }}
        >
          {launches.map((launch) => (
            <LaunchCard key={launch.id} launch={launch} />
          ))}
        </Grid>

        <LaunchesPagination
          page={page}
          totalPages={totalPages}
          totalDocs={totalDocs}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
          onPrev={handlePrevPage}
          onNext={handleNextPage}
        />
      </Box>
    );
  };

  return (
    <Container py={6} maxW="full" w="full" border="none">
      <Box mb={6} borderBottomWidth="1px" pb={5}>
        <Flex
          gap={6}
          direction={{ base: "column", lg: "row" }}
          align={{ lg: "flex-end" }}
          justify="space-between"
        >
          <Box borderLeftWidth={2} borderLeftColor="blue.border" pl={4}>
            <Text
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="black"
              letterSpacing="widest"
              lineHeight={1}
              textTransform="uppercase"
            >
              Launch Archive
            </Text>
            <Flex gap={8} mt={3} opacity={0.8} flexWrap="wrap">
              <Box>
                <Text fontSize="sm" fontWeight="bold" textTransform="uppercase" color="blue.border">
                  {totalDocs} Missions
                  <br /> recorded
                </Text>
              </Box>
              <Box>
                <Text fontSize="xs" letterSpacing="wider" textTransform="uppercase">
                  Temporal range
                </Text>
                <Text fontSize="sm" fontWeight="semibold">
                  {dateFrom || dateTo ? `${dateFrom || "—"} → ${dateTo || "—"}` : "All time"}
                </Text>
              </Box>
            </Flex>
          </Box>

          <LaunchesFilters
            search={search}
            success={success}
            upcoming={upcoming}
            dateFrom={dateFrom}
            dateTo={dateTo}
            hasActiveFilters={hasActiveFilters}
            onSearchChange={handleSearchChange}
            onSuccessChange={handleSuccessChange}
            onUpcomingChange={handleUpcomingChange}
            onDateFromChange={handleDateFromChange}
            onDateToChange={handleDateToChange}
            onReset={handleResetFilters}
          />
        </Flex>
      </Box>
      {renderContent()}
    </Container>
  );
}
