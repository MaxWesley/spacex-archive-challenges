import { Box, Flex, Text } from "@chakra-ui/react";

interface LaunchDetailStatsProps {
  status: "success" | "failure" | "upcoming";
  launchDateLabel: string;
  launchSiteLabel?: string | null;
}

export function LaunchDetailStats({
  status,
  launchDateLabel,
  launchSiteLabel,
}: LaunchDetailStatsProps) {
  const colorPalette = status === "upcoming" ? "blue" : status === "success" ? "green" : "red";
  const statusLabel = status.toUpperCase();

  return (
    <Box mt={8} borderWidth={1} borderColor="whiteAlpha.200" bg="blackAlpha.500">
      <Flex
        py={5}
        px={{ base: 4, md: 6 }}
        gap={{ base: 6, md: 10 }}
        direction={{ base: "column", md: "row" }}
        justify="space-between"
      >
        <Box>
          <Text fontSize="xs" letterSpacing="wider" textTransform="uppercase" opacity={0.6}>
            Mission status
          </Text>
          <Flex mt={2} align="center" gap={2}>
            <Box
              w="10px"
              h="10px"
              borderRadius="2px"
              bg={`${colorPalette}.400`}
              boxShadow={`0 0 0 1px rgba(255,255,255,0.08), 0 0 18px var(--chakra-colors-${colorPalette}-400)`}
              animation="missionStatusBlink 1.1s ease-in-out infinite"
              css={{
                "@keyframes missionStatusBlink": {
                  "0%": { opacity: 1, transform: "scale(1)", filter: "blur(0px)" },
                  "45%": { opacity: 0.15, transform: "scale(0.9)", filter: "blur(0.2px)" },
                  "100%": { opacity: 1, transform: "scale(1)", filter: "blur(0px)" },
                },
              }}
            />
            <Text fontWeight="bold" textTransform="uppercase" letterSpacing="wider" fontSize="lg">
              {statusLabel}
            </Text>
          </Flex>
        </Box>

        <Box>
          <Text fontSize="xs" letterSpacing="wider" textTransform="uppercase" opacity={0.6}>
            Launch date
          </Text>
          <Text
            mt={2}
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="wider"
            fontSize="lg"
          >
            {launchDateLabel}
          </Text>
        </Box>

        <Box>
          <Text fontSize="xs" letterSpacing="wider" textTransform="uppercase" opacity={0.6}>
            Launch site
          </Text>
          <Text
            mt={2}
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="wider"
            fontSize="lg"
          >
            {launchSiteLabel ?? "—"}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
