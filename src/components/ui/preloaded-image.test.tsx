import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderWithProviders, screen, waitFor } from "@test/test-utils";
import { PreloadedImage } from "./preloaded-image";

let mockImageInstances: Array<{
  onload: (() => void) | null;
  onerror: (() => void) | null;
  src: string;
}>;

beforeEach(() => {
  mockImageInstances = [];

  vi.stubGlobal(
    "Image",
    class {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      src = "";
      decoding = "";
      referrerPolicy = "";
      constructor() {
        mockImageInstances.push(this);
      }
    },
  );
});

function simulateLoad() {
  const last = mockImageInstances[mockImageInstances.length - 1];
  last?.onload?.();
}

function simulateError() {
  const last = mockImageInstances[mockImageInstances.length - 1];
  last?.onerror?.();
}

describe("PreloadedImage", () => {
  it("shows skeleton while loading when withLoading is true", () => {
    renderWithProviders(
      <PreloadedImage src="https://example.com/img.png" alt="test" withLoading />,
    );

    expect(document.querySelector(".chakra-skeleton")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("does not show skeleton when withLoading is false", () => {
    renderWithProviders(<PreloadedImage src="https://example.com/img.png" alt="test" />);

    expect(document.querySelector(".chakra-skeleton")).not.toBeInTheDocument();
  });

  it("renders image after successful load", async () => {
    renderWithProviders(<PreloadedImage src="https://example.com/img.png" alt="loaded image" />);

    simulateLoad();

    await waitFor(() => {
      expect(screen.getByRole("img", { name: "loaded image" })).toBeInTheDocument();
    });
  });

  it("renders fallback image on error", async () => {
    renderWithProviders(
      <PreloadedImage
        src="https://example.com/broken.png"
        alt="fallback"
        fallbackSrc="/fallback.png"
      />,
    );

    simulateError();

    await waitFor(() => {
      const img = screen.getByRole("img", { name: "fallback" });
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", "/fallback.png");
    });
  });

  it("preloads image with correct src", () => {
    renderWithProviders(<PreloadedImage src="https://example.com/photo.jpg" alt="test" />);

    expect(mockImageInstances).toHaveLength(1);
    expect(mockImageInstances[0].src).toBe("https://example.com/photo.jpg");
  });
});
