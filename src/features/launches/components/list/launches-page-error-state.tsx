import { Box, Button, Container, Center, Text } from "@chakra-ui/react";

interface LaunchesPageErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function LaunchesPageErrorState({
  message,
  onRetry,
}: LaunchesPageErrorStateProps) {
  return (
    <Container py={4} maxW="full" w="full" border="none">
      <Center>
        <Box textAlign="center" maxW="lg" w="full" py={10}>
          <Text fontSize="xl" fontWeight="semibold" color="red.300">
            Não foi possível carregar os lançamentos
          </Text>
          <Text mt={3} color="fg" opacity={0.8}>
            {message ?? "Tente novamente em alguns instantes."}
          </Text>
          {onRetry ? (
            <Button mt={6} onClick={onRetry} colorScheme="purple">
              Tentar novamente
            </Button>
          ) : null}
        </Box>
      </Center>
    </Container>
  );
}
