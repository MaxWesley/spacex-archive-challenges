import { useSearchParams } from "react-router-dom";
import { useLaunches } from "./use-launches";

export function useLaunchesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = Number(searchParams.get("page") ?? "1");
  const page = Number.isFinite(pageParam) && pageParam >= 1 ? pageParam : 1;
  const search = searchParams.get("search") ?? "";

  const { data, isLoading, isFetching, error, refetch } = useLaunches({
    page,
    search: search || undefined,
  });

  const totalPages = data?.totalPages ?? 1;
  const totalDocs = data?.totalDocs ?? 0;
  const hasPrevPage = data?.hasPrevPage ?? false;
  const hasNextPage = data?.hasNextPage ?? false;

  const updateParams = (updates: Record<string, string | null>) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      for (const [key, value] of Object.entries(updates)) {
        if (value === null) {
          next.delete(key);
        } else {
          next.set(key, value);
        }
      }
      return next;
    });
  };

  const handleSearchChange = (value: string) => {
    updateParams({
      search: value || null,
      page: "1",
    });
  };

  const handlePrevPage = () => {
    updateParams({ page: String(Math.max(1, page - 1)) });
  };

  const handleNextPage = () => {
    updateParams({ page: String(Math.min(totalPages, page + 1)) });
  };

  return {
    launches: data?.docs ?? [],
    isLoading,
    isFetching,
    error,
    refetch,
    search,
    page,
    totalPages,
    totalDocs,
    hasPrevPage,
    hasNextPage,
    handleSearchChange,
    handlePrevPage,
    handleNextPage,
  };
}
