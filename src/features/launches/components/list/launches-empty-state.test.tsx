import { describe, it, expect, vi } from "vitest";
import { renderWithProviders, screen, fireEvent } from "@test/test-utils";
import { LaunchesEmptyState } from "./launches-empty-state";

describe("LaunchesEmptyState", () => {
  it("renders generic message when no active filters", () => {
    renderWithProviders(<LaunchesEmptyState hasActiveFilters={false} />);

    expect(screen.getByText("No launches found")).toBeInTheDocument();
    expect(
      screen.getByText("There are no launches available at the moment."),
    ).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders filter message and reset button when filters are active", () => {
    const onReset = vi.fn();
    renderWithProviders(
      <LaunchesEmptyState hasActiveFilters={true} onReset={onReset} />,
    );

    expect(screen.getByText("No launches match your filters")).toBeInTheDocument();
    expect(
      screen.getByText("Try adjusting or clearing your filters to see more results."),
    ).toBeInTheDocument();

    const btn = screen.getByRole("button", { name: /clear all filters/i });
    expect(btn).toBeInTheDocument();

    fireEvent.click(btn);
    expect(onReset).toHaveBeenCalledOnce();
  });

  it("does not render reset button when onReset is not provided", () => {
    renderWithProviders(<LaunchesEmptyState hasActiveFilters={true} />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
