import { api } from "@/lib/axios";
import { describe, expect, it, vi } from "vitest";
import { getLaunches } from "./launches.service";

vi.mock("@/lib/axios", () => ({
  api: {
    post: vi.fn(),
  },
}));

describe("getLaunches", () => {
  it("should call API with correct params and return data", async () => {
    const mockResponse = {
      data: {
        docs: [{ id: "1", name: "FalconSat" }],
        page: 1,
      },
    };

    vi.mocked(api.post).mockResolvedValue(mockResponse);

    const result = await getLaunches({
      page: 1,
      search: "falcon",
      success: true,
    });

    expect(api.post).toHaveBeenCalledWith("/launches/query", {
      query: { search: "falcon", success: true },
      options: {
        page: 1,
        limit: 12,
        sort: {
          date_utc: "desc",
          populate: [
            { path: "rocket", select: ["name", "type"] },
            { path: "launchpad", select: ["name", "locality"] },
          ],
        },
      },
    });
    expect(result).toEqual(mockResponse.data);
  });
});
