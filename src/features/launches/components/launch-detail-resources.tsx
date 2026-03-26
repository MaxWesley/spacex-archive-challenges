import { Box, Button, Flex, Grid, Text } from "@chakra-ui/react";
import { LuBookOpen, LuMessageSquare, LuPlay } from "react-icons/lu";

type Resource = { label: string; href: string };

interface LaunchDetailResourcesProps {
  resources: Resource[];
}

function getIcon(label: string) {
  const l = label.toLowerCase();
  if (l.includes("webcast") || l.includes("watch")) return LuPlay;
  if (l.includes("wiki") || l.includes("wikipedia")) return LuBookOpen;
  if (l.includes("reddit") || l.includes("disc")) return LuMessageSquare;
  return LuBookOpen;
}

export function LaunchDetailResources({ resources }: LaunchDetailResourcesProps) {
  if (resources.length === 0) return null;

  const items = resources.slice(0, 3);
  const columns = Math.max(1, Math.min(3, items.length));

  return (
    <Box mt={12} bg="blackAlpha.500" p={4}>
      <Flex
        gap={{ base: 6, md: 10 }}
        direction={{ base: "column", md: "row" }}
        align={{ md: "stretch" }}
        justify="space-between"
      >
        <Box flex={1} minW={0}>
          <Text fontSize="2xl" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
            Mission resources
          </Text>
          <Text mt={2} fontSize="medium" opacity={0.7} maxW="2xl">
            Access the full archive of technical documents, real-time telemetry playback, and
            mission discussions.
          </Text>
        </Box>

        <Box flex={1} display="flex" justifyContent={{ base: "stretch", md: "flex-end" }}>
          <Grid
            gap={3}
            alignItems="stretch"
            w="full"
            maxW={{ base: "full", md: "520px" }}
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: `repeat(${columns}, 1fr)`,
            }}
          >
            {items.map((r) => {
            const Icon = getIcon(r.label);
            return (
              <Button
                key={r.href}
                asChild
                variant="solid"
                bg="whiteAlpha.100"
                _hover={{ bg: "whiteAlpha.200" }}
                borderWidth="1px"
                borderColor="whiteAlpha.200"
                h={{ base: "72px", sm: "92px" }}
                w="full"
                borderRadius="none"
                px={4}
              >
                <a href={r.href} target="_blank" rel="noreferrer">
                  <Flex
                    h="full"
                    w="full"
                    direction="column"
                    align="center"
                    justify="center"
                    gap={2}
                  >
                    <Box opacity={0.9} fontSize="22px" lineHeight={1}>
                      <Icon color="white" />
                    </Box>
                    <Text
                      fontSize="10px"
                      color="white"
                      fontWeight="bold"
                      letterSpacing="wider"
                      textTransform="uppercase"
                    >
                      {r.label}
                    </Text>
                  </Flex>
                </a>
              </Button>
            );
            })}
          </Grid>
        </Box>
      </Flex>
    </Box>
  );
}
