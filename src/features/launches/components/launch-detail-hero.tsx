import { Box, Flex, Text } from "@chakra-ui/react";
import { PreloadedImage } from "@/components/ui/preloaded-image";

interface LaunchDetailHeroProps {
  patchSrc: string;
  flightSerial?: string | null;
  title: string;
  description?: string | null;
}

export function LaunchDetailHero({
  patchSrc,
  flightSerial,
  title,
  description,
}: LaunchDetailHeroProps) {
  return (
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
        <PreloadedImage
          src={patchSrc}
          alt={title}
          w="full"
          h="280px"
          rounded="sm"
          objectFit="contain"
        />
      </Box>

      <Box flex={1}>
        {flightSerial ? (
          <Text fontSize="xs" letterSpacing="wider" textTransform="uppercase" opacity={0.7}>
            Flight serial #{flightSerial}
          </Text>
        ) : null}

        <Text
          mt={2}
          fontSize={{ base: "4xl", md: "6xl" }}
          fontWeight="black"
          letterSpacing="wider"
          textTransform="uppercase"
          lineHeight={0.95}
        >
          {title}
        </Text>

        {description ? (
          <Text mt={4} maxW="2xl" opacity={0.8} fontSize="sm">
            {description}
          </Text>
        ) : null}
      </Box>
    </Flex>
  );
}
