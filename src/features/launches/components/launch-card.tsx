import { Box, Text, Badge, Flex, Center } from "@chakra-ui/react";
import { getLaunchDate, getLaunchImageSrc, getLaunchStatus } from "../utils/launch.utils";
import type { Launch } from "../types/launch";
import { useLocation, useNavigate } from "react-router-dom";
import { PreloadedImage } from "@/components/ui/preloaded-image";

interface LaunchCardProps {
  launch: Launch;
}

export function LaunchCard({ launch }: LaunchCardProps) {
  const navigate = useNavigate();
  const location = useLocation();
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
      onClick={() =>
        navigate(`/launches/${launch.id}`, { state: { from: location.pathname + location.search } })
      }
      _hover={{
        transform: "scale(1.02)",
        transition: "0.2s",
      }}
    >
      <Center>
        <Flex flexDir="column" alignItems="center">
          <PreloadedImage src={imageSrc} alt={name} w={160} h={160} rounded="xs" />
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
