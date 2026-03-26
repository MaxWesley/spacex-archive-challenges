import { describe, it, expect } from "vitest";
import { getLaunchImageSrc, getLaunchStatus, getLaunchDate } from "./launch.utils";
import type { Launch } from "../types/launch";

const baseLaunch: Launch = {
  id: "1",
  name: "Test",
  date_utc: "2024-06-15T14:30:00.000Z",
  success: null,
  upcoming: false,
  links: {
    patch: { small: null, large: null },
    flickr: { original: [] },
  },
  rocket: { name: "Falcon 9", type: "rocket" },
  launchpad: { name: "KSC", locality: "FL" },
};

describe("getLaunchImageSrc", () => {
  it("returns patch.small when available", () => {
    const launch = { ...baseLaunch, links: { ...baseLaunch.links, patch: { small: "small.png", large: "large.png" } } };
    expect(getLaunchImageSrc(launch)).toBe("small.png");
  });

  it("returns patch.large when small is null", () => {
    const launch = { ...baseLaunch, links: { ...baseLaunch.links, patch: { small: null, large: "large.png" } } };
    expect(getLaunchImageSrc(launch)).toBe("large.png");
  });

  it("returns flickr first image when patches are null", () => {
    const launch = {
      ...baseLaunch,
      links: { patch: { small: null, large: null }, flickr: { original: ["flickr.jpg"] } },
    };
    expect(getLaunchImageSrc(launch)).toBe("flickr.jpg");
  });

  it("returns placeholder when no images available", () => {
    expect(getLaunchImageSrc(baseLaunch)).toBe("/launch-placeholder.png");
  });
});

describe("getLaunchStatus", () => {
  it("returns 'upcoming' when launch is upcoming", () => {
    expect(getLaunchStatus({ ...baseLaunch, upcoming: true })).toBe("upcoming");
  });

  it("returns 'success' when launch succeeded", () => {
    expect(getLaunchStatus({ ...baseLaunch, success: true })).toBe("success");
  });

  it("returns 'failure' when launch failed", () => {
    expect(getLaunchStatus({ ...baseLaunch, success: false })).toBe("failure");
  });

  it("returns 'failure' when success is null", () => {
    expect(getLaunchStatus({ ...baseLaunch, success: null })).toBe("failure");
  });
});

describe("getLaunchDate", () => {
  it("formats date as YYYY.MM.DD", () => {
    expect(getLaunchDate(baseLaunch)).toBe("2024.06.15");
  });

  it("pads single-digit month and day", () => {
    const launch = { ...baseLaunch, date_utc: "2020-01-05T12:00:00.000Z" };
    expect(getLaunchDate(launch)).toBe("2020.01.05");
  });

  it("handles year correctly", () => {
    const launch = { ...baseLaunch, date_utc: "2006-03-24T22:30:00.000Z" };
    expect(getLaunchDate(launch)).toBe("2006.03.24");
  });

  it("handles end of year date", () => {
    const launch = { ...baseLaunch, date_utc: "2023-12-31T23:59:00.000Z" };
    const result = getLaunchDate(launch);
    expect(result).toMatch(/2023\.12\.31|2024\.01\.01/);
  });
});
