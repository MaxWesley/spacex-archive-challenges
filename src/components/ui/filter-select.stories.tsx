import type { Meta, StoryObj } from "@storybook/react-vite";
import { FilterSelect } from "./filter-select";

const meta: Meta<typeof FilterSelect> = {
  title: "UI/FilterSelect",
  component: FilterSelect,
};

export default meta;
type Story = StoryObj<typeof FilterSelect>;

export const Default: Story = {
  args: {
    label: "Filter by status",
    value: "",
    options: [
      { label: "All", value: "" },
      { label: "Success", value: "true" },
      { label: "Failure", value: "false" },
    ],
    onChange: () => {},
  },
};

export const WithSelectedValue: Story = {
  args: {
    label: "Filter by status",
    value: "true",
    options: [
      { label: "All", value: "" },
      { label: "Success", value: "true" },
      { label: "Failure", value: "false" },
    ],
    onChange: () => {},
  },
};
