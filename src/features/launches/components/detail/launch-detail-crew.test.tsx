import { describe, it, expect } from "vitest";
import { renderWithProviders, screen } from "@test/test-utils";
import { LaunchDetailCrew } from "./launch-detail-crew";

const crewWithAll = [
  {
    id: "c1",
    name: "Robert Behnken",
    agency: "NASA",
    image: "https://example.com/bob.jpg",
    wikipedia: "https://en.wikipedia.org/wiki/Robert_Behnken",
  },
  {
    id: "c2",
    name: "Douglas Hurley",
    agency: "NASA",
    image: null,
    wikipedia: null,
  },
];

describe("LaunchDetailCrew", () => {
  it("returns null when crew is empty", () => {
    const { container } = renderWithProviders(<LaunchDetailCrew crew={[]} />);

    expect(container.innerHTML).toBe("");
  });

  it("renders section title and crew members", () => {
    renderWithProviders(<LaunchDetailCrew crew={crewWithAll} />);

    expect(screen.getByText("Crew composition")).toBeInTheDocument();
    expect(screen.getByText("Robert Behnken")).toBeInTheDocument();
    expect(screen.getByText("Douglas Hurley")).toBeInTheDocument();
  });

  it("renders initials for each member", () => {
    renderWithProviders(<LaunchDetailCrew crew={crewWithAll} />);

    expect(screen.getByText("RB")).toBeInTheDocument();
    expect(screen.getByText("DH")).toBeInTheDocument();
  });

  it("renders agency when provided", () => {
    renderWithProviders(<LaunchDetailCrew crew={crewWithAll} />);

    expect(screen.getAllByText("NASA")).toHaveLength(2);
  });

  it("renders wikipedia link only for members who have it", () => {
    renderWithProviders(<LaunchDetailCrew crew={crewWithAll} />);

    const links = screen.getAllByRole("link", { name: "Open Wikipedia" });
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute("href", "https://en.wikipedia.org/wiki/Robert_Behnken");
  });
});
