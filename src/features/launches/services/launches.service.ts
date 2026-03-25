import { api } from "@/lib/axios";

interface GetLaunchesParams {
  page?: number;
  limit?: number;
  search?: string;
  success?: boolean;
  upcoming?: boolean;
}

export async function getLaunches({
  page = 1,
  limit = 12,
  ...params
}: GetLaunchesParams) {
  const query: any = {};

  if (params.search) {
    query.search = params.search;
  }

  if (params.success !== undefined) {
    query.success = params.success;
  }

  if (params.upcoming !== undefined) {
    query.upcoming = params.upcoming;
  }

  const { data } = await api.post("/launches/query", {
    query,
    options: {
      page,
      limit,
      sort: {
        date_utc: "desc",
      },
      populate: [
        {
          path: "rocket",
          select: { name: 1, type: 1 },
        },
        {
          path: "launchpad",
          select: { name: 1, locality: 1 },
        },
      ],
    },
  });

  return data;
}
