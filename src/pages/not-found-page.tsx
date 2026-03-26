import { Box, Button, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { LuRadar } from "react-icons/lu";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container maxW="lg" py={{ base: 16, md: 24 }}>
      <Helmet>
        <title>404 — SpaceX</title>
      </Helmet>
      <VStack gap={6} textAlign="center">
        <Box color="blue.400" fontSize="5xl">
          <LuRadar />
        </Box>

        <Heading size={{ base: "2xl", md: "3xl" }} fontWeight="black" letterSpacing="wider">
          404
        </Heading>

        <Text color="fg.muted" maxW="md">
          The page you're looking for doesn't exist or has been moved. Maybe it launched into orbit?
        </Text>

        <Button onClick={() => navigate("/launches")} size="lg" variant="outline" colorPalette="blue">
          Back to Launches
        </Button>
      </VStack>
    </Container>
  );
}
