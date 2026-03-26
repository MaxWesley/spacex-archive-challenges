import { Box, Button, Container } from "@chakra-ui/react";
import { useLaunchDetail } from "../hooks/use-launch-detail";
import { LaunchDetailHero } from "../components/detail/launch-detail-hero";
import { LaunchDetailStats } from "../components/detail/launch-detail-stats";
import { LaunchDetailResources } from "../components/detail/launch-detail-resources";
import { LaunchDetailCrew } from "../components/detail/launch-detail-crew";
import { LaunchDetailPageSkeleton } from "../components/detail/launch-detail-page.skeleton";

export function LaunchDetailPage() {
  const { data, crew, isLoading, handleGoBack } = useLaunchDetail();

  if (isLoading) return <LaunchDetailPageSkeleton />;
  if (!data) return <p>Not found</p>;

  const patchSrc =
    data?.links?.patch?.small ||
    data?.links?.patch?.large ||
    data?.links?.flickr?.original?.[0] ||
    "/launch-placeholder.png";

  const status: "success" | "failure" | "upcoming" = data.upcoming
    ? "upcoming"
    : data.success
      ? "success"
      : "failure";

  const launchDateLabel = new Date(data.date_utc).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const launchSiteLabel =
    typeof data?.launchpad === "object" && data.launchpad
      ? `${data.launchpad.name}${data.launchpad.locality ? ` • ${data.launchpad.locality}` : ""}`
      : null;

  const resources = [
    data?.links?.webcast ? { label: "Watch webcast", href: String(data.links.webcast) } : null,
    data?.links?.wikipedia ? { label: "Mission wiki", href: String(data.links.wikipedia) } : null,
    data?.links?.article ? { label: "Read article", href: String(data.links.article) } : null,
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-b, blackAlpha.900 0%, blackAlpha.800 40%, bg 100%)"
      pt={{ base: 6, md: 10 }}
      pb={{ base: 10, md: 14 }}
    >
      <Container maxW="6xl">
        <Box mb={6}>
          <Button
            variant="outline"
            onClick={handleGoBack}
            size="sm"
            textTransform="uppercase"
            letterSpacing="wider"
          >
            Back
          </Button>
        </Box>

        <LaunchDetailHero
          patchSrc={patchSrc}
          flightSerial={data?.flight_number ? String(data.flight_number) : null}
          title={String(data.name)}
          description={data.details ?? null}
        />

        <LaunchDetailStats
          status={status}
          launchDateLabel={launchDateLabel}
          launchSiteLabel={launchSiteLabel}
        />

        <LaunchDetailCrew crew={crew} />

        <LaunchDetailResources resources={resources} />
      </Container>
    </Box>
  );
}
