import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Box, Text, Image, Container } from "@chakra-ui/react";

export function LaunchDetailPage() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["launch", id],
    queryFn: async () => {
      const { data } = await api.get(`/launches/${id}`);
      return data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Not found</p>;

  const image =
    data.links.patch.small || data.links.flickr.original[0] || "/launch-placeholder.png";

  return (
    <Container py={6}>
      <Box display="flex" flexDir="column" alignItems="center">
        <Image src={image} alt={data.name} w={200} mb={4} />

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
