import { useLaunches } from "../hooks/use-launches";
import { Grid, Container } from "@chakra-ui/react";
import { LaunchCard } from "../components/launch-card";
import { LaunchesPageSkeleton } from "../components/launches-page.skeleton";
import { LaunchesPageErrorState } from "../components/launches-page-error-state";

export function LaunchesPage() {
  const { data, isLoading, error, refetch } = useLaunches({ page: 1 });

  if (isLoading) return <LaunchesPageSkeleton />;
  if (error)
    return (
      <LaunchesPageErrorState
        message={error instanceof Error ? error.message : undefined}
        onRetry={refetch}
      />
    );

  return (
    <Container py={4} maxW="full" w="full" border="none">
      <Grid
        gap={4}
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(6, 1fr)",
        }}
      >
        {data?.docs.map((launch) => {
          return <LaunchCard key={launch.id} launch={launch} />;
        })}
      </Grid>
    </Container>
  );
}
