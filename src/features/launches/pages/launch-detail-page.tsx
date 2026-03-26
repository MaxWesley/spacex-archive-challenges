import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Box, Button, Container, Text } from "@chakra-ui/react";
import { PreloadedImage } from "@/components/ui/preloaded-image";

export function LaunchDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["launch", id],
    queryFn: async () => {
      const { data } = await api.get(`/launches/${id}`);
      return data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Not found</p>;

  const imageSrc =
    data.links.patch.small || data.links.flickr.original[0] || "/launch-placeholder.png";

  return (
    <Container py={6}>
      <Box mb={4}>
        <Button variant="outline" onClick={() => navigate(-1)}>
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
