import { Box, Text, Badge, Flex, Center, Span } from "@chakra-ui/react";
import { getLaunchDate, getLaunchImageSrc, getLaunchStatus } from "../../utils/launch.utils";
import type { Launch } from "../../types/launch";
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
  const rocket = launch.rocket.name;
  const launchpad = launch.launchpad.name + " • " + launch.launchpad.locality;
  const flightNumber =
    typeof launch.flight_number === "number" ? String(launch.flight_number).padStart(3, "0") : null;

  const goToDetail = () =>
    navigate(`/launches/${launch.id}`, { state: { from: location.pathname + location.search } });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goToDetail();
    }
  };

  return (
    <Box
      p={4}
      borderWidth="1px"
      minH={300}
      cursor="pointer"
      tabIndex={0}
      role="link"
      aria-label={`${launch.name} — ${status}`}
      onClick={goToDetail}
      onKeyDown={handleKeyDown}
      _hover={{
        transform: "scale(1.02)",
        transition: "0.2s",
      }}
    >
      <Center>
        <Flex flexDir="column" alignItems="center">
          <PreloadedImage
            src={imageSrc}
            alt={name}
            w={160}
            h={160}
            rounded="xs"
            objectFit="contain"
          />
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
            {flightNumber ? (
              <Text
                fontSize="xs"
                letterSpacing="wider"
                textTransform="uppercase"
                opacity={0.7}
                mb={1}
              >
                Flight serial #{flightNumber}
              </Text>
            ) : null}
            <Text fontWeight="bold" textAlign="left">
              {name}
              {" • "}
              <Span
                fontWeight="medium"
                fontSize="sm"
                textAlign="left"
                color="yellow.500"
                lineBreak="auto"
              >
                {rocket}
              </Span>
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
