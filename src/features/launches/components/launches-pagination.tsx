import { Box, Button, HStack, Stack, Text, Icon, Flex, Span } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface LaunchesPaginationProps {
  page: number;
  totalPages: number;
  totalDocs: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export function LaunchesPagination({
  page,
  totalPages,
  totalDocs,
  hasPrevPage,
  hasNextPage,
  onPrev,
  onNext,
}: LaunchesPaginationProps) {
  return (
    <Box mt={6} borderTopWidth="1px" pt={4}>
      <Stack
        direction={{ base: "column", md: "row" }}
        align={{ base: "flex-start", md: "center" }}
        justify="space-between"
        gap={4}
      >
        <Stack gap={1} direction="row" gapX={4}>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            flexDir="column"
            borderRightWidth={1}
            borderRightColor="white"
            pr={4}
          >
            <Text fontSize="xs" opacity={0.7}>
              CURRENT_VIEW
            </Text>
            <Text fontSize="sm" fontWeight="semibold">
              PAGE {page} OF {totalPages}
            </Text>
          </Flex>
          <Flex flexDir="column" alignItems="left">
            <Text fontSize="xs" opacity={0.7}>
              TOTAL_RECORDS
            </Text>
            <Text fontSize="sm" fontWeight="semibold">
              {totalDocs} MISSION_PROFILES
            </Text>
          </Flex>
        </Stack>
        <HStack>
          <Button onClick={onPrev} variant="outline" disabled={!hasPrevPage}>
            <Icon as={LuChevronLeft} />
            PREV_SEO
          </Button>
          <Button onClick={onNext} variant="outline" disabled={!hasNextPage}>
            NEXT_SEO
            <Icon as={LuChevronRight} />
          </Button>
        </HStack>
      </Stack>
    </Box>
  );
}
