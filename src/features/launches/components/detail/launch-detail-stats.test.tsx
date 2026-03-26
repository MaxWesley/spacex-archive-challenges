import { describe, it, expect } from "vitest";
import { renderWithProviders, screen } from "@test/test-utils";
import { LaunchDetailStats } from "./launch-detail-stats";

describe("LaunchDetailStats", () => {
  it("renders status, date, rocket and launch site", () => {
    renderWithProviders(
      <LaunchDetailStats
        status="success"
        launchDateLabel="March 24, 2006"
        rocketLabel="Falcon 9"
        launchSiteLabel="KSC • Florida"
      />,
    );

    expect(screen.getByText("SUCCESS")).toBeInTheDocument();
    expect(screen.getByText("March 24, 2006")).toBeInTheDocument();
    expect(screen.getByText("Falcon 9")).toBeInTheDocument();
    expect(screen.getByText("KSC • Florida")).toBeInTheDocument();
  });

  it("renders FAILURE status label", () => {
    renderWithProviders(<LaunchDetailStats status="failure" launchDateLabel="Jan 1, 2020" />);

    expect(screen.getByText("FAILURE")).toBeInTheDocument();
  });

  it("renders UPCOMING status label", () => {
    renderWithProviders(<LaunchDetailStats status="upcoming" launchDateLabel="Dec 31, 2026" />);

    expect(screen.getByText("UPCOMING")).toBeInTheDocument();
  });

  it("renders dash when rocketLabel is null", () => {
    renderWithProviders(
      <LaunchDetailStats status="success" launchDateLabel="Jan 1, 2020" rocketLabel={null} />,
    );

    const dashes = screen.getAllByText("—");
    expect(dashes.length).toBeGreaterThanOrEqual(1);
  });

  it("renders dash when launchSiteLabel is null", () => {
    renderWithProviders(
      <LaunchDetailStats status="success" launchDateLabel="Jan 1, 2020" launchSiteLabel={null} />,
    );

    const dashes = screen.getAllByText("—");
    expect(dashes.length).toBeGreaterThanOrEqual(1);
  });
});
