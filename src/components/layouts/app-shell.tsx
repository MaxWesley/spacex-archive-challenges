import { Box, Container, Flex, HStack, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import type { PropsWithChildren } from "react";
import { ColorModeButton } from "@/components/ui/color-mode";

export function AppShell({ children }: PropsWithChildren) {
  return (
    <Box minH="100vh" bg="bg">
      <Box as="header" borderBottomWidth="1px" position="sticky" top="0" zIndex="sticky" bg="bg">
        <Container maxW="full" px={{ base: 4, md: 8 }} py={3}>
          <Flex align="center" justify="space-between">
            <HStack gap={6}>
              <Text fontWeight="bold">SpaceX</Text>
              <Link asChild>
                <RouterLink to="/">Launches</RouterLink>
              </Link>
              <Link asChild color="red.400" fontSize="sm">
                <RouterLink to="/error-test">Error Test</RouterLink>
              </Link>
            </HStack>
            <ColorModeButton />
          </Flex>
        </Container>
      </Box>
      <Box as="main">{children}</Box>
    </Box>
  );
}
