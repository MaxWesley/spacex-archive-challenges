import { describe, it, expect } from "vitest";
import { renderWithProviders } from "@test/test-utils";
import { LaunchDetailPageSkeleton } from "./launch-detail-page.skeleton";

describe("LaunchDetailPageSkeleton", () => {
  it("renders without crashing", () => {
    const { container } = renderWithProviders(<LaunchDetailPageSkeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders multiple skeleton placeholders", () => {
    const { container } = renderWithProviders(<LaunchDetailPageSkeleton />);
    const skeletons = container.querySelectorAll("[data-scope='skeleton'], .chakra-skeleton");
    expect(skeletons.length).toBeGreaterThan(0);
  });
});
