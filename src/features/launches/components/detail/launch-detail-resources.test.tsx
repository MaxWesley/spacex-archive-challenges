import { describe, it, expect } from "vitest";
import { renderWithProviders, screen } from "@test/test-utils";
import { LaunchDetailResources } from "./launch-detail-resources";

const resources = [
  { label: "Watch webcast", href: "https://youtube.com/watch?v=abc" },
  { label: "Mission wiki", href: "https://en.wikipedia.org/wiki/Test" },
  { label: "Read article", href: "https://example.com/article" },
];

describe("LaunchDetailResources", () => {
  it("returns null when resources is empty", () => {
    const { container } = renderWithProviders(<LaunchDetailResources resources={[]} />);

    expect(container.innerHTML).toBe("");
  });

  it("renders section title and description", () => {
    renderWithProviders(<LaunchDetailResources resources={resources} />);

    expect(screen.getByText("Mission resources")).toBeInTheDocument();
    expect(screen.getByText(/Access the full archive/)).toBeInTheDocument();
  });

  it("renders all resource links", () => {
    renderWithProviders(<LaunchDetailResources resources={resources} />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute("href", "https://youtube.com/watch?v=abc");
    expect(links[1]).toHaveAttribute("href", "https://en.wikipedia.org/wiki/Test");
    expect(links[2]).toHaveAttribute("href", "https://example.com/article");
  });

  it("renders resource labels", () => {
    renderWithProviders(<LaunchDetailResources resources={resources} />);

    expect(screen.getByText("Watch webcast")).toBeInTheDocument();
    expect(screen.getByText("Mission wiki")).toBeInTheDocument();
    expect(screen.getByText("Read article")).toBeInTheDocument();
  });

  it("limits to 3 resources max", () => {
    const manyResources = [
      ...resources,
      { label: "Extra link", href: "https://extra.com" },
    ];
    renderWithProviders(<LaunchDetailResources resources={manyResources} />);

    expect(screen.getAllByRole("link")).toHaveLength(3);
    expect(screen.queryByText("Extra link")).not.toBeInTheDocument();
  });
});
