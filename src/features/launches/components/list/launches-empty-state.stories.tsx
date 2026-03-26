import type { Meta, StoryObj } from "@storybook/react-vite";
import { LaunchesEmptyState } from "./launches-empty-state";

const meta: Meta<typeof LaunchesEmptyState> = {
  title: "Launches/LaunchesEmptyState",
  component: LaunchesEmptyState,
};

export default meta;
type Story = StoryObj<typeof LaunchesEmptyState>;

export const NoFilters: Story = {
  args: {
    hasActiveFilters: false,
    onReset: () => {},
  },
};

export const WithActiveFilters: Story = {
  args: {
    hasActiveFilters: true,
    onReset: () => {},
  },
};
