import { Box, Center, Grid, Flex, Skeleton } from "@chakra-ui/react";

export function LaunchesPageSkeleton() {
  return (
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
          {Array.from({ length: 12 }).map((_, idx) => (
            <Box key={idx} p={4} borderWidth="1px" minH={300} borderRadius="xs">
              <Center>
                <Flex flexDir="column" alignItems="center" w="full">
                  <Skeleton borderRadius="xs" minW={160} minH={160} />
                  <Box mt={8} w="100%">
                    <Flex mb={4} justifyContent="space-between" alignItems="center">
                      <Skeleton height="20px" width="90px" borderRadius="md" />
                      <Skeleton height="14px" width="70px" borderRadius="md" />
                    </Flex>
                    <Box mb={2}>
                      <Skeleton height="18px" width="95%" borderRadius="md" />
                    </Box>
                    <Box>
                      <Skeleton height="14px" width="90%" borderRadius="md" />
                    </Box>
                  </Box>
                </Flex>
              </Center>
            </Box>
          ))}
        </Grid>
      </Box>
  );
}
