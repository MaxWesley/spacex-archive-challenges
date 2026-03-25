import { Box, Text, Image, Badge, Container } from "@chakra-ui/react";
import { getLaunchDate, getLaunchImageSrc, getLaunchStatus } from "../utils/launch.utils";
import type { Launch } from "../types/launch";

interface LaunchCardProps {
  launch: Launch;
}

export function LaunchCard({ launch }: LaunchCardProps) {
  const imageSrc = getLaunchImageSrc(launch);
  const status = getLaunchStatus(launch);
  const date = getLaunchDate(launch);
  const name = launch.name.toUpperCase();
  const launchpad = launch.launchpad.name + " • " + launch.launchpad.locality;

  return (
    <Box
      p={4}
      borderWidth="1px"
      height={420}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
    >
      <Image rounded="xs" src={imageSrc} alt={name} width={160} height={160} />
      <Container mt={8}>
        <Box display="flex" mb={4} justifyContent="space-between" w="100%">
          <Badge
            size="xs"
            colorPalette={status === "upcoming" ? "blue" : status === "success" ? "green" : "red"}
          >
            {status.toUpperCase()}
          </Badge>
          <Text fontSize="xs">{date}</Text>
        </Box>
        <Text fontWeight="bold" textAlign="left">
          {name}
        </Text>
        <Text fontWeight="light" fontSize="sm" textAlign="left">
          {launchpad}
        </Text>
      </Container>
    </Box>
  );
}
