import { describe, it, expect, vi } from "vitest";
import { renderWithProviders, screen, fireEvent } from "@test/test-utils";
import { FilterSelect } from "./filter-select";

const options = [
  { label: "All", value: "" },
  { label: "Success", value: "true" },
  { label: "Failure", value: "false" },
];

describe("FilterSelect", () => {
  it("renders all options", () => {
    renderWithProviders(
      <FilterSelect label="Status" value="" options={options} onChange={() => {}} />,
    );

    expect(screen.getByRole("option", { name: "All" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Success" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Failure" })).toBeInTheDocument();
  });

  it("renders with aria-label", () => {
    renderWithProviders(
      <FilterSelect label="Filter by status" value="" options={options} onChange={() => {}} />,
    );

    expect(screen.getByLabelText("Filter by status")).toBeInTheDocument();
  });

  it("reflects the current value", () => {
    renderWithProviders(
      <FilterSelect label="Status" value="true" options={options} onChange={() => {}} />,
    );

    const select = screen.getByLabelText("Status") as HTMLSelectElement;
    expect(select.value).toBe("true");
  });

  it("calls onChange when value changes", () => {
    const onChange = vi.fn();
    renderWithProviders(
      <FilterSelect label="Status" value="" options={options} onChange={onChange} />,
    );

    fireEvent.change(screen.getByLabelText("Status"), { target: { value: "true" } });
    expect(onChange).toHaveBeenCalledWith("true");
  });
});
