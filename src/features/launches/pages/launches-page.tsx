import { Box, Flex, Grid, Container } from "@chakra-ui/react";
import { LaunchCard } from "../components/launch-card";
import { LaunchesPageSkeleton } from "../components/launches-page.skeleton";
import { LaunchesPageErrorState } from "../components/launches-page-error-state";
import { LaunchesPagination } from "../components/launches-pagination";
import { LaunchesSearchInput } from "../components/launches-search-input";
import { LaunchesFilterSelect } from "../components/launches-filter-select";
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
    page,
    totalPages,
    totalDocs,
    hasPrevPage,
    hasNextPage,
    handleSearchChange,
    handleSuccessChange,
    handleUpcomingChange,
    handlePrevPage,
    handleNextPage,
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
    <Container py={4} maxW="full" w="full" border="none">
      <Flex mb={4} gap={3} flexDir={{ base: "column", md: "row" }}>
        <LaunchesSearchInput value={search} onChange={handleSearchChange} />
        <LaunchesFilterSelect
          label="Filter by status"
          value={success}
          options={[
            { label: "All", value: "" },
            { label: "Success", value: "true" },
            { label: "Failure", value: "false" },
          ]}
          onChange={handleSuccessChange}
        />
        <LaunchesFilterSelect
          label="Filter by schedule"
          value={upcoming}
          options={[
            { label: "All", value: "" },
            { label: "Upcoming", value: "true" },
            { label: "Past", value: "false" },
          ]}
          onChange={handleUpcomingChange}
        />
      </Flex>
      {renderContent()}
    </Container>
  );
}
