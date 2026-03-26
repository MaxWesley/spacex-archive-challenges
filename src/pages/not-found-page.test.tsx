import { describe, it, expect } from "vitest";
import { renderWithProviders, screen } from "@test/test-utils";
import { HelmetProvider } from "react-helmet-async";
import { NotFoundPage } from "./not-found-page";

function renderPage() {
  return renderWithProviders(
    <HelmetProvider>
      <NotFoundPage />
    </HelmetProvider>,
  );
}

describe("NotFoundPage", () => {
  it("renders 404 heading", () => {
    renderPage();

    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("renders description text", () => {
    renderPage();

    expect(screen.getByText(/doesn't exist or has been moved/i)).toBeInTheDocument();
  });

  it("renders back to launches button", () => {
    renderPage();

    expect(screen.getByText("Back to Launches")).toBeInTheDocument();
  });
});
