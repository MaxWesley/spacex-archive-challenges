import type { Meta, StoryObj } from "@storybook/react-vite";
import { LaunchDetailStats } from "./launch-detail-stats";

const meta: Meta<typeof LaunchDetailStats> = {
  title: "Launches/Detail/LaunchDetailStats",
  component: LaunchDetailStats,
};

export default meta;
type Story = StoryObj<typeof LaunchDetailStats>;

export const SuccessLaunch: Story = {
  args: {
    status: "success",
    launchDateLabel: "June 15, 2024",
    rocketLabel: "Falcon 9",
    launchSiteLabel: "KSC LC-39A • Cape Canaveral",
  },
};

export const FailureLaunch: Story = {
  args: {
    status: "failure",
    launchDateLabel: "March 24, 2006",
    rocketLabel: "Falcon 1",
    launchSiteLabel: "Kwajalein Atoll • Omelek Island",
  },
};

export const UpcomingLaunch: Story = {
  args: {
    status: "upcoming",
    launchDateLabel: "TBD",
    rocketLabel: "Starship",
    launchSiteLabel: null,
  },
};
