import { describe, it, expect } from "vitest";
import { renderWithProviders, screen } from "@test/test-utils";
import { LaunchDetailGallery } from "./launch-detail-gallery";

const images = [
  "https://example.com/photo1.jpg",
  "https://example.com/photo2.jpg",
  "https://example.com/photo3.jpg",
];

describe("LaunchDetailGallery", () => {
  it("returns null when images is empty", () => {
    const { container } = renderWithProviders(<LaunchDetailGallery images={[]} />);

    expect(container.innerHTML).toBe("");
  });

  it("renders section title", () => {
    renderWithProviders(<LaunchDetailGallery images={images} />);

    expect(screen.getByText("Mission gallery")).toBeInTheDocument();
  });

  it("renders one link per image", () => {
    renderWithProviders(<LaunchDetailGallery images={images} />);

    expect(screen.getAllByRole("link")).toHaveLength(3);
  });

  it("renders links that open images in new tab", () => {
    renderWithProviders(<LaunchDetailGallery images={images} />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute("href", "https://example.com/photo1.jpg");
    expect(links[0]).toHaveAttribute("target", "_blank");
  });

  it("renders single image correctly", () => {
    renderWithProviders(<LaunchDetailGallery images={["https://example.com/solo.jpg"]} />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute("href", "https://example.com/solo.jpg");
  });
});
