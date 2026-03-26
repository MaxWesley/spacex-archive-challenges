import { describe, it, expect } from "vitest";
import { renderWithProviders, screen } from "@test/test-utils";
import { LaunchCard } from "./launch-card";
import type { Launch } from "../../types/launch";

const baseLaunch: Launch = {
  id: "abc123",
  name: "FalconSat",
  date_utc: "2006-03-24T22:30:00.000Z",
  success: false,
  upcoming: false,
  flight_number: 1,
  links: {
    patch: { small: "https://example.com/patch.png", large: null },
    flickr: { original: [] },
  },
  rocket: { name: "Falcon 1", type: "rocket" },
  launchpad: { name: "Kwajalein Atoll", locality: "Omelek Island" },
};

describe("LaunchCard", () => {
  it("renders launch name, rocket, launchpad, status and date", () => {
    renderWithProviders(<LaunchCard launch={baseLaunch} />);

    expect(screen.getByText("FALCONSAT", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("Falcon 1")).toBeInTheDocument();
    expect(screen.getByText("Kwajalein Atoll • Omelek Island")).toBeInTheDocument();
    expect(screen.getByText("FAILURE")).toBeInTheDocument();
    expect(screen.getByText("2006.03.24")).toBeInTheDocument();
  });

  it("renders flight serial when flight_number is present", () => {
    renderWithProviders(<LaunchCard launch={baseLaunch} />);

    expect(screen.getByText("Flight serial #001")).toBeInTheDocument();
  });

  it("does not render flight serial when flight_number is null", () => {
    const launch = { ...baseLaunch, flight_number: null };
    renderWithProviders(<LaunchCard launch={launch} />);

    expect(screen.queryByText(/Flight serial/)).not.toBeInTheDocument();
  });

  it("shows SUCCESS badge for successful launch", () => {
    const launch = { ...baseLaunch, success: true };
    renderWithProviders(<LaunchCard launch={launch} />);

    expect(screen.getByText("SUCCESS")).toBeInTheDocument();
  });

  it("shows UPCOMING badge for upcoming launch", () => {
    const launch = { ...baseLaunch, upcoming: true };
    renderWithProviders(<LaunchCard launch={launch} />);

    expect(screen.getByText("UPCOMING")).toBeInTheDocument();
  });

  it("has accessible role and aria-label", () => {
    renderWithProviders(<LaunchCard launch={baseLaunch} />);

    const card = screen.getByRole("link", { name: /FalconSat/i });
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute("tabindex", "0");
  });
});
