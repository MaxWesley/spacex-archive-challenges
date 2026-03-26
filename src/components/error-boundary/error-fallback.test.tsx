import { describe, it, expect, vi } from "vitest";
import { renderWithProviders, screen, fireEvent } from "@test/test-utils";
import { ErrorFallback } from "./error-fallback";

describe("ErrorFallback", () => {
  it("renders the heading", () => {
    renderWithProviders(
      <ErrorFallback error={new Error("fail")} onReset={() => {}} />,
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("displays the error message", () => {
    renderWithProviders(
      <ErrorFallback error={new Error("Network timeout")} onReset={() => {}} />,
    );

    expect(screen.getByText("Network timeout")).toBeInTheDocument();
  });

  it("renders description text", () => {
    renderWithProviders(
      <ErrorFallback error={new Error("x")} onReset={() => {}} />,
    );

    expect(
      screen.getByText(/unexpected error occurred/i),
    ).toBeInTheDocument();
  });

  it("calls onReset when button is clicked", () => {
    const onReset = vi.fn();
    renderWithProviders(
      <ErrorFallback error={new Error("x")} onReset={onReset} />,
    );

    fireEvent.click(screen.getByText("Try again"));
    expect(onReset).toHaveBeenCalledOnce();
  });
});
