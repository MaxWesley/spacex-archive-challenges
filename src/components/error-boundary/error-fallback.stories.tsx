import type { Meta, StoryObj } from "@storybook/react-vite";
import { ErrorFallback } from "./error-fallback";

const meta: Meta<typeof ErrorFallback> = {
  title: "Feedback/ErrorFallback",
  component: ErrorFallback,
};

export default meta;
type Story = StoryObj<typeof ErrorFallback>;

export const Default: Story = {
  args: {
    error: new Error("Network request failed: 500 Internal Server Error"),
    onReset: () => {},
  },
};

export const ShortMessage: Story = {
  args: {
    error: new Error("Something broke."),
    onReset: () => {},
  },
};
