import { Box, Button, Center, Text, VStack } from "@chakra-ui/react";
import { RocketIllustration } from "./rocket-illustration";

interface LaunchesEmptyStateProps {
  hasActiveFilters: boolean;
  onReset?: () => void;
}

export function LaunchesEmptyState({ hasActiveFilters, onReset }: LaunchesEmptyStateProps) {
  return (
    <Center py={16}>
      <VStack gap={4} maxW="sm" textAlign="center">
        <RocketIllustration w="200px" h="200px" color="fg" />
        <Box>
          <Text fontSize="xl" fontWeight="semibold">
            {hasActiveFilters ? "No launches match your filters" : "No launches found"}
          </Text>
          <Text mt={2} opacity={0.6} fontSize="sm">
            {hasActiveFilters
              ? "Try adjusting or clearing your filters to see more results."
              : "There are no launches available at the moment."}
          </Text>
        </Box>
        {hasActiveFilters && onReset && (
          <Button variant="outline" size="sm" onClick={onReset}>
            Clear all filters
          </Button>
        )}
      </VStack>
    </Center>
  );
}
