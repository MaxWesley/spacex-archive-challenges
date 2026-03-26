import { Box, Flex, SimpleGrid, Skeleton, Text } from "@chakra-ui/react";

export function LaunchDetailPageSkeleton() {
  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-b, blackAlpha.900 0%, blackAlpha.800 40%, bg 100%)"
      pt={{ base: 6, md: 10 }}
      pb={{ base: 10, md: 14 }}
    >
      <Box maxW="6xl" mx="auto" px={{ base: 4, md: 6 }}>
        <Skeleton h="32px" w="110px" mb={6} />

        <Flex
          gap={{ base: 6, md: 10 }}
          direction={{ base: "column", md: "row" }}
          align={{ md: "center" }}
        >
          <Box
            w={{ base: "full", md: "320px" }}
            maxW={{ base: "360px", md: "320px" }}
            bg="blackAlpha.500"
            borderWidth="1px"
            borderColor="whiteAlpha.200"
            p={4}
          >
            <Skeleton h="280px" w="full" />
          </Box>

          <Box flex={1}>
            <Skeleton h="14px" w="180px" />
            <Skeleton mt={3} h={{ base: "46px", md: "64px" }} w={{ base: "80%", md: "70%" }} />
            <Skeleton mt={4} h="14px" w={{ base: "95%", md: "85%" }} />
            <Skeleton mt={2} h="14px" w={{ base: "90%", md: "78%" }} />
          </Box>
        </Flex>

        <Box mt={8} borderWidth={1} borderColor="whiteAlpha.200" bg="blackAlpha.500">
          <Flex
            py={5}
            px={{ base: 4, md: 6 }}
            gap={{ base: 6, md: 10 }}
            direction={{ base: "column", md: "row" }}
            justify="space-between"
          >
            {Array.from({ length: 3 }).map((_, idx) => (
              <Box key={idx}>
                <Text fontSize="xs" opacity={0.6} letterSpacing="wider" textTransform="uppercase">
                  —
                </Text>
                <Skeleton mt={2} h="22px" w="160px" />
              </Box>
            ))}
          </Flex>
        </Box>

        <Box mt={10}>
          <Skeleton h="26px" w="240px" />
          <SimpleGrid mt={5} gap={3} minChildWidth="220px">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Box
                key={idx}
                bg="blackAlpha.500"
                borderWidth="1px"
                borderColor="whiteAlpha.200"
                p={4}
                minH="140px"
              >
                <Flex gap={3} align="flex-start">
                  <Skeleton w="44px" h="44px" />
                  <Box flex={1}>
                    <Skeleton h="14px" w="48px" />
                    <Skeleton mt={2} h="16px" w="160px" />
                    <Skeleton mt={2} h="12px" w="90px" />
                  </Box>
                </Flex>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        <Box mt={12} bg="blackAlpha.500" p={4}>
          <Flex
            gap={{ base: 6, md: 10 }}
            direction={{ base: "column", md: "row" }}
            justify="space-between"
          >
            <Box flex={1}>
              <Skeleton h="26px" w="240px" />
              <Skeleton mt={3} h="14px" w={{ base: "90%", md: "75%" }} />
              <Skeleton mt={2} h="14px" w={{ base: "85%", md: "65%" }} />
            </Box>
            <SimpleGrid
              gap={3}
              columns={{ base: 1, sm: 3 }}
              flex={1}
              maxW={{ base: "full", md: "520px" }}
            >
              {Array.from({ length: 3 }).map((_, idx) => (
                <Skeleton key={idx} h={{ base: "72px", sm: "92px" }} />
              ))}
            </SimpleGrid>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
