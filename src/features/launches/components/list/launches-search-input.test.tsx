import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderWithProviders, screen, fireEvent } from "@test/test-utils";
import { LaunchesSearchInput } from "./launches-search-input";

describe("LaunchesSearchInput", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders with initial value", () => {
    renderWithProviders(
      <LaunchesSearchInput value="falcon" onChange={() => {}} />,
    );

    const input = screen.getByPlaceholderText("Search launches...") as HTMLInputElement;
    expect(input.value).toBe("falcon");
  });

  it("debounces onChange calls", () => {
    const onChange = vi.fn();
    renderWithProviders(
      <LaunchesSearchInput value="" onChange={onChange} debounceMs={400} />,
    );

    fireEvent.change(screen.getByPlaceholderText("Search launches..."), {
      target: { value: "starlink" },
    });

    expect(onChange).not.toHaveBeenCalled();

    vi.advanceTimersByTime(400);
    expect(onChange).toHaveBeenCalledWith("starlink");
  });

  it("shows clear button when has value and clears on click", () => {
    const onChange = vi.fn();
    renderWithProviders(
      <LaunchesSearchInput value="falcon" onChange={onChange} />,
    );

    const clearButton = screen.getByLabelText("Clear search");
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(onChange).toHaveBeenCalledWith("");
  });

  it("does not show clear button when value is empty", () => {
    renderWithProviders(
      <LaunchesSearchInput value="" onChange={() => {}} />,
    );

    expect(screen.queryByLabelText("Clear search")).not.toBeInTheDocument();
  });
});
