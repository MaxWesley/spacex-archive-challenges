import { describe, it, expect, vi } from "vitest";
import { renderWithProviders, screen, fireEvent } from "@test/test-utils";
import { DateInput } from "./date-input";

describe("DateInput", () => {
  it("renders with aria-label", () => {
    renderWithProviders(
      <DateInput label="Date from" value="" onChange={() => {}} />,
    );

    expect(screen.getByLabelText("Date from")).toBeInTheDocument();
  });

  it("renders with current value", () => {
    renderWithProviders(
      <DateInput label="Date from" value="2024-01-15" onChange={() => {}} />,
    );

    const input = screen.getByLabelText("Date from") as HTMLInputElement;
    expect(input.value).toBe("2024-01-15");
  });

  it("calls onChange when value changes", () => {
    const onChange = vi.fn();
    renderWithProviders(
      <DateInput label="Date from" value="" onChange={onChange} />,
    );

    fireEvent.change(screen.getByLabelText("Date from"), { target: { value: "2024-06-01" } });
    expect(onChange).toHaveBeenCalledWith("2024-06-01");
  });

  it("applies min and max constraints", () => {
    renderWithProviders(
      <DateInput
        label="Date to"
        value="2024-06-15"
        onChange={() => {}}
        min="2024-01-01"
        max="2024-12-31"
      />,
    );

    const input = screen.getByLabelText("Date to") as HTMLInputElement;
    expect(input.min).toBe("2024-01-01");
    expect(input.max).toBe("2024-12-31");
  });
});
