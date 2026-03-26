import { useState } from "react";
import { Box, Button, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { LuBug } from "react-icons/lu";

function BrokenComponent() {
  throw new Error("This is a simulated error to test the Error Boundary.");
}

export function ErrorTestPage() {
  const [shouldCrash, setShouldCrash] = useState(false);

  return (
    <Container maxW="lg" py={{ base: 16, md: 24 }}>
      <Helmet>
        <title>Error Test — SpaceX</title>
      </Helmet>
      <VStack gap={6} textAlign="center">
        <Box color="orange.400" fontSize="5xl">
          <LuBug />
        </Box>

        <Heading size={{ base: "lg", md: "xl" }}>Error Boundary Test</Heading>

        <Text color="fg.muted" maxW="md">
          Click the button below to throw a runtime error and trigger the Error Boundary fallback UI.
        </Text>

        <Button
          onClick={() => setShouldCrash(true)}
          size="lg"
          colorPalette="red"
        >
          Trigger Error
        </Button>

        {shouldCrash && <BrokenComponent />}
      </VStack>
    </Container>
  );
}
