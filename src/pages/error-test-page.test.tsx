import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderWithProviders, screen, fireEvent } from "@test/test-utils";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "@/components/error-boundary/error-boundary";
import { ErrorTestPage } from "./error-test-page";

function renderPage() {
  return renderWithProviders(
    <HelmetProvider>
      <ErrorBoundary
        fallback={(error) => <p>{error.message}</p>}
      >
        <ErrorTestPage />
      </ErrorBoundary>
    </HelmetProvider>,
  );
}

describe("ErrorTestPage", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders heading and description", () => {
    renderPage();

    expect(screen.getByText("Error Boundary Test")).toBeInTheDocument();
    expect(screen.getByText(/throw a runtime error/i)).toBeInTheDocument();
  });

  it("renders the trigger button", () => {
    renderPage();

    expect(screen.getByText("Trigger Error")).toBeInTheDocument();
  });

  it("triggers error boundary on button click", () => {
    renderPage();

    fireEvent.click(screen.getByText("Trigger Error"));

    expect(
      screen.getByText("This is a simulated error to test the Error Boundary."),
    ).toBeInTheDocument();
  });
});
