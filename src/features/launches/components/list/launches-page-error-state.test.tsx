import { describe, it, expect, vi } from "vitest";
import { renderWithProviders, screen, fireEvent } from "@test/test-utils";
import { LaunchesPageErrorState } from "./launches-page-error-state";

describe("LaunchesPageErrorState", () => {
  it("renders default error message", () => {
    renderWithProviders(<LaunchesPageErrorState />);

    expect(screen.getByText("Não foi possível carregar os lançamentos")).toBeInTheDocument();
    expect(screen.getByText("Tente novamente em alguns instantes.")).toBeInTheDocument();
  });

  it("renders custom error message", () => {
    renderWithProviders(<LaunchesPageErrorState message="Network error" />);

    expect(screen.getByText("Network error")).toBeInTheDocument();
    expect(screen.queryByText("Tente novamente em alguns instantes.")).not.toBeInTheDocument();
  });

  it("renders retry button when onRetry is provided", () => {
    const onRetry = vi.fn();
    renderWithProviders(<LaunchesPageErrorState onRetry={onRetry} />);

    const btn = screen.getByRole("button", { name: /tentar novamente/i });
    expect(btn).toBeInTheDocument();

    fireEvent.click(btn);
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it("does not render retry button when onRetry is not provided", () => {
    renderWithProviders(<LaunchesPageErrorState />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
