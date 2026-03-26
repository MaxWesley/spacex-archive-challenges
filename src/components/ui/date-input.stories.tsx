import type { Meta, StoryObj } from "@storybook/react-vite";
import { DateInput } from "./date-input";

const meta: Meta<typeof DateInput> = {
  title: "UI/DateInput",
  component: DateInput,
};

export default meta;
type Story = StoryObj<typeof DateInput>;

export const Empty: Story = {
  args: {
    label: "Date from",
    value: "",
    onChange: () => {},
  },
};

export const WithValue: Story = {
  args: {
    label: "Date from",
    value: "2024-06-15",
    onChange: () => {},
  },
};

export const WithConstraints: Story = {
  args: {
    label: "Date to",
    value: "2024-06-15",
    min: "2024-01-01",
    max: "2024-12-31",
    onChange: () => {},
  },
};
