import { useLaunches } from "../hooks/use-launches";
import { Grid, Container, Box } from "@chakra-ui/react";
import { LaunchCard } from "../components/launch-card";

export function LaunchesPage() {
  const { data, isLoading, error } = useLaunches({ page: 1 });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

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
      </Box>
    </Container>
  );
}
