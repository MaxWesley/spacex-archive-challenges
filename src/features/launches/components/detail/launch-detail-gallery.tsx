import { Box, Grid, Text } from "@chakra-ui/react";
import { PreloadedImage } from "@/components/ui/preloaded-image";

interface LaunchDetailGalleryProps {
  images: string[];
}

export function LaunchDetailGallery({ images }: LaunchDetailGalleryProps) {
  if (images.length === 0) return null;

  return (
    <Box mt={10}>
      <Text fontSize="2xl" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
        Mission gallery
      </Text>

      <Grid
        mt={5}
        gap={3}
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          lg: `repeat(${Math.min(images.length, 3)}, 1fr)`,
        }}
      >
        {images.map((src, idx) => (
          <Box
            key={src}
            asChild
            borderWidth="1px"
            borderColor="whiteAlpha.200"
            bg="blackAlpha.500"
            overflow="hidden"
            _hover={{ borderColor: "whiteAlpha.400" }}
            transition="border-color 0.2s"
          >
            <a href={src} target="_blank" rel="noreferrer">
              <PreloadedImage
                src={src}
                alt={`Mission photo ${idx + 1}`}
                w="full"
                h={{ base: "220px", md: "280px" }}
                objectFit="cover"
                withLoading
              />
            </a>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
