import { Box, Grid, Container } from "@chakra-ui/react";
import { LaunchCard } from "../components/launch-card";
import { LaunchesPageSkeleton } from "../components/launches-page.skeleton";
import { LaunchesPageErrorState } from "../components/launches-page-error-state";
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
      <LaunchesFilters
        search={search}
        success={success}
        upcoming={upcoming}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onSearchChange={handleSearchChange}
        onSuccessChange={handleSuccessChange}
        onUpcomingChange={handleUpcomingChange}
        onDateFromChange={handleDateFromChange}
        onDateToChange={handleDateToChange}
      />
      {renderContent()}
    </Container>
  );
}
