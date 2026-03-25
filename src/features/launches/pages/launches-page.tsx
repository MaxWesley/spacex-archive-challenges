import { useState } from "react";
import { useLaunches } from "../hooks/use-launches";
import { Box, Grid, Container } from "@chakra-ui/react";
import { LaunchCard } from "../components/launch-card";
import { LaunchesPageSkeleton } from "../components/launches-page.skeleton";
import { LaunchesPageErrorState } from "../components/launches-page-error-state";
import { LaunchesPagination } from "../components/launches-pagination";

export function LaunchesPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error, refetch } = useLaunches({ page });

  if (isLoading) return <LaunchesPageSkeleton />;
  if (error)
    return (
      <LaunchesPageErrorState
        message={error instanceof Error ? error.message : undefined}
        onRetry={refetch}
      />
    );

  const totalPages = data?.totalPages ?? 1;
  const totalDocs = data?.totalDocs ?? 0;
  const hasPrevPage = data?.hasPrevPage ?? false;
  const hasNextPage = data?.hasNextPage ?? false;

  return (
    <Container py={4} maxW="full" w="full" border="none">
      <Box>
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

        <LaunchesPagination
          page={page}
          totalPages={totalPages}
          totalDocs={totalDocs}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
          onPrev={() => setPage((p) => Math.max(1, p - 1))}
          onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
        />
      </Box>
    </Container>
  );
}
