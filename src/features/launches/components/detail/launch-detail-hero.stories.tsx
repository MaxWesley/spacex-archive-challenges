import type { Meta, StoryObj } from "@storybook/react-vite";
import { LaunchDetailHero } from "./launch-detail-hero";

const meta: Meta<typeof LaunchDetailHero> = {
  title: "Launches/Detail/LaunchDetailHero",
  component: LaunchDetailHero,
};

export default meta;
type Story = StoryObj<typeof LaunchDetailHero>;

export const WithDescription: Story = {
  args: {
    patchSrc: "https://images2.imgbox.com/94/f2/NN6Ph45r_o.png",
    flightSerial: "300",
    title: "Starlink Group 6-14",
    description:
      "SpaceX launched 23 Starlink satellites to low-Earth orbit from Launch Complex 39A.",
  },
};

export const WithoutDescription: Story = {
  args: {
    patchSrc: "https://images2.imgbox.com/94/f2/NN6Ph45r_o.png",
    flightSerial: "1",
    title: "FalconSat",
    description: null,
  },
};
