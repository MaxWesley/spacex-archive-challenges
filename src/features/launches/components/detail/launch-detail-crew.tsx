import { Box, Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { PreloadedImage } from "@/components/ui/preloaded-image";
import { LuExternalLink } from "react-icons/lu";

type CrewMember = {
  id?: string;
  name: string;
  agency?: string | null;
  image?: string | null;
  wikipedia?: string | null;
};

interface LaunchDetailCrewProps {
  crew: CrewMember[];
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

export function LaunchDetailCrew({ crew }: LaunchDetailCrewProps) {
  if (crew.length === 0) return null;

  return (
    <Box mt={10}>
      <Text fontSize="2xl" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
        Crew composition
      </Text>

      <SimpleGrid mt={5} gap={3} minChildWidth="220px">
        {crew.map((member, idx) => {
          const name = member.name ?? "—";
          const agency = member.agency ?? "";
          const href = member.wikipedia ?? "";
          const photo = member.image || "/launch-placeholder.png";

          return (
            <Box
              key={`${member.id ?? name}-${idx}`}
              bg="blackAlpha.500"
              borderWidth="1px"
              borderColor="whiteAlpha.200"
              p={4}
              minH="140px"
            >
              <Flex gap={3} align="flex-start">
                <Box w="44px" h="44px" borderRadius="sm" overflow="hidden">
                  <PreloadedImage src={photo} alt={name} w="44px" h="44px" rounded="sm" />
                </Box>
                <Box flex={1} minW={0}>
                  <Flex align="center" gap={2}>
                    <Text fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                      {initials(name)}
                    </Text>
                  </Flex>
                  <Text mt={1} fontSize="sm" fontWeight="semibold">
                    {name}
                  </Text>
                  {agency ? (
                    <Text fontSize="xs" opacity={0.7}>
                      {agency}
                    </Text>
                  ) : null}
                </Box>
                {href ? (
                  <Button asChild variant="ghost" size="sm" aria-label="Open Wikipedia">
                    <a href={href} target="_blank" rel="noreferrer">
                      <LuExternalLink />
                    </a>
                  </Button>
                ) : null}
              </Flex>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}
