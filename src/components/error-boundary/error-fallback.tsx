import { Box, Button, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { LuTriangleAlert } from "react-icons/lu";

interface ErrorFallbackProps {
  error: Error;
  onReset: () => void;
}

export function ErrorFallback({ error, onReset }: ErrorFallbackProps) {
  return (
    <Container maxW="lg" py={{ base: 16, md: 24 }}>
      <VStack gap={6} textAlign="center">
        <Box color="red.400" fontSize="5xl">
          <LuTriangleAlert />
        </Box>

        <Heading size={{ base: "lg", md: "xl" }}>Something went wrong</Heading>

        <Text color="fg.muted" maxW="md">
          An unexpected error occurred. You can try again or go back to the home page.
        </Text>

        <Box
          as="pre"
          bg="bg.subtle"
          borderWidth="1px"
          borderColor="border.muted"
          rounded="md"
          px={4}
          py={3}
          fontSize="xs"
          color="fg.muted"
          maxW="full"
          overflowX="auto"
          whiteSpace="pre-wrap"
          wordBreak="break-word"
        >
          {error.message}
        </Box>

        <Button onClick={onReset} size="lg" variant="outline" colorPalette="blue">
          Try again
        </Button>
      </VStack>
    </Container>
  );
}
