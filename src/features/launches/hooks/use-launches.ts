import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getLaunches } from "../services/launches.service";

interface Params {
  page?: number;
  limit?: number;
  search?: string;
  success?: boolean;
  upcoming?: boolean;
}

const STALE_TIME_ONE_MINUTE = 1000 * 60;

export function useLaunches(params: Params) {
  return useQuery({
    queryKey: ["launches", params],
    queryFn: () => getLaunches(params),
    staleTime: STALE_TIME_ONE_MINUTE,
    placeholderData: keepPreviousData,
  });
}
