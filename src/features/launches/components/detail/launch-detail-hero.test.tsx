import { describe, it, expect } from "vitest";
import { renderWithProviders, screen } from "@test/test-utils";
import { LaunchDetailHero } from "./launch-detail-hero";

describe("LaunchDetailHero", () => {
  it("renders title", () => {
    renderWithProviders(
      <LaunchDetailHero patchSrc="https://example.com/patch.png" title="FalconSat" />,
    );

    expect(screen.getByText("FalconSat")).toBeInTheDocument();
  });

  it("renders flight serial when provided", () => {
    renderWithProviders(
      <LaunchDetailHero patchSrc="/patch.png" title="FalconSat" flightSerial="42" />,
    );

    expect(screen.getByText("Flight serial #42")).toBeInTheDocument();
  });

  it("does not render flight serial when null", () => {
    renderWithProviders(
      <LaunchDetailHero patchSrc="/patch.png" title="FalconSat" flightSerial={null} />,
    );

    expect(screen.queryByText(/Flight serial/)).not.toBeInTheDocument();
  });

  it("renders description when provided", () => {
    renderWithProviders(
      <LaunchDetailHero
        patchSrc="/patch.png"
        title="FalconSat"
        description="Engine failure at T+33s"
      />,
    );

    expect(screen.getByText("Engine failure at T+33s")).toBeInTheDocument();
  });

  it("does not render description when null", () => {
    renderWithProviders(
      <LaunchDetailHero patchSrc="/patch.png" title="FalconSat" description={null} />,
    );

    expect(screen.queryByText("Engine failure at T+33s")).not.toBeInTheDocument();
  });
});
