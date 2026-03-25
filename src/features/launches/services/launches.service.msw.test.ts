import { describe, expect, it } from "vitest";
import { getLaunches } from "./launches.service";

describe("getLaunches (MSW)", () => {
  it("should call API with correct params and return data", async () => {
    const result = await getLaunches({
      page: 1,
      search: "falcon",
      success: true,
    });

    expect(result.docs).toHaveLength(10);
    expect(result.totalDocs).toBe(205);
    expect(result.nextPage).toBe(2);
  });
});
