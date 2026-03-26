import { Box, Button, Container, Text } from "@chakra-ui/react";
import { PreloadedImage } from "@/components/ui/preloaded-image";
import { useLaunchDetail } from "../hooks/use-launch-detail";

export function LaunchDetailPage() {
  const { data, isLoading, handleGoBack } = useLaunchDetail();

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Not found</p>;

  const imageSrc =
    data.links.patch.small || data.links.flickr.original[0] || "/launch-placeholder.png";

  return (
    <Container py={6}>
      <Box mb={4}>
        <Button variant="outline" onClick={handleGoBack}>
          Voltar
        </Button>
      </Box>

      <Box display="flex" flexDir="column" alignItems="center">
        <PreloadedImage src={imageSrc} alt={data.name} w={200} h={200} mb={4} rounded="md" />

        <Text fontSize="2xl" fontWeight="bold">
          {data.name}
        </Text>

        <Text mt={2}>{new Date(data.date_utc).toLocaleDateString()}</Text>

        <Text mt={2}>{data.success ? "Success" : data.upcoming ? "Upcoming" : "Failure"}</Text>

        {data.details && (
          <Text mt={4} textAlign="center">
            {data.details}
          </Text>
        )}
      </Box>
    </Container>
  );
}
