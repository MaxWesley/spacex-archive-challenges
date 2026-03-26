import type { Meta, StoryObj } from "@storybook/react-vite";
import { LaunchCard } from "./launch-card";
import type { Launch } from "../../types/launch";

const baseLaunch: Launch = {
  id: "abc123",
  name: "Starlink Group 6-14",
  date_utc: "2024-06-15T14:30:00.000Z",
  success: true,
  upcoming: false,
  flight_number: 300,
  links: {
    patch: {
      small: "https://images2.imgbox.com/94/f2/NN6Ph45r_o.png",
      large: null,
    },
    flickr: { original: [] },
  },
  rocket: { name: "Falcon 9", type: "rocket" },
  launchpad: { name: "KSC LC-39A", locality: "Cape Canaveral" },
};

const meta: Meta<typeof LaunchCard> = {
  title: "Launches/LaunchCard",
  component: LaunchCard,
};

export default meta;
type Story = StoryObj<typeof LaunchCard>;

export const Success: Story = {
  args: { launch: baseLaunch },
};

export const Failure: Story = {
  args: {
    launch: {
      ...baseLaunch,
      name: "FalconSat",
      success: false,
      flight_number: 1,
      links: { ...baseLaunch.links, patch: { small: null, large: null } },
    },
  },
};

export const Upcoming: Story = {
  args: {
    launch: {
      ...baseLaunch,
      name: "Crew-10",
      success: null,
      upcoming: true,
    },
  },
};
