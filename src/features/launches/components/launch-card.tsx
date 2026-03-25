import { Box, Text, Image, Badge, Container, Flex, Center } from "@chakra-ui/react";
import { getLaunchDate, getLaunchImageSrc, getLaunchStatus } from "../utils/launch.utils";
import type { Launch } from "../types/launch";
import { useNavigate } from "react-router-dom";

interface LaunchCardProps {
  launch: Launch;
}

export function LaunchCard({ launch }: LaunchCardProps) {
  const navigate = useNavigate();
  const imageSrc = getLaunchImageSrc(launch);
  const status = getLaunchStatus(launch);
  const date = getLaunchDate(launch);
  const name = launch.name.toUpperCase();
  const launchpad = launch.launchpad.name + " • " + launch.launchpad.locality;

  return (
    <Box
      p={4}
      borderWidth="1px"
      minH={300}
      cursor="pointer"
      onClick={() => navigate(`/launches/${launch.id}`)}
      _hover={{
        transform: "scale(1.02)",
        transition: "0.2s",
      }}
    >
      <Center>
        <Flex flexDir="column" alignItems="center">
          <Image rounded="xs" src={imageSrc} alt={name} minW={160} minH={160} />
          <Box mt={8}>
            <Flex mb={4} justifyContent="space-between" alignItems="center">
              <Badge
                size="xs"
                colorPalette={
                  status === "upcoming" ? "blue" : status === "success" ? "green" : "red"
                }
              >
                {status.toUpperCase()}
              </Badge>
              <Text fontSize="xs">{date}</Text>
            </Flex>
            <Text fontWeight="bold" textAlign="left">
              {name}
            </Text>
            <Text fontWeight="light" fontSize="sm" textAlign="left">
              {launchpad}
            </Text>
          </Box>
        </Flex>
      </Center>
    </Box>
  );
}
