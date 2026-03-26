import { api } from "@/lib/axios";
import type { Launch } from "../types/launch";

interface GetLaunchesParams {
  page?: number;
  limit?: number;
  search?: string;
  success?: boolean;
  upcoming?: boolean;
  dateFrom?: string;
  dateTo?: string;
}

interface PaginatedApiResponse<Payload> {
  docs: Payload[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export async function getLaunches({ page = 1, limit = 12, ...params }: GetLaunchesParams) {
  const query: any = {};

  if (params.search) {
    query.name = { $regex: params.search, $options: "i" };
  }

  if (params.success !== undefined) {
    query.success = params.success;
  }

  if (params.upcoming !== undefined) {
    query.upcoming = params.upcoming;
  }

  if (params.dateFrom || params.dateTo) {
    query.date_utc = {};
    if (params.dateFrom) query.date_utc.$gte = params.dateFrom;
    // TODO: podemos substituir pelo método endOfDay() do date-fns, mas não é necessário para o desafio
    if (params.dateTo) query.date_utc.$lte = `${params.dateTo}T23:59:59.999Z`;
  }

  const { data } = await api.post<PaginatedApiResponse<Launch>>("/launches/query", {
    query,
    options: {
      page,
      limit,
      sort: {
        date_utc: "asc",
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
