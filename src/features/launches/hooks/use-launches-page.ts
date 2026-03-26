import { useSearchParams } from "react-router-dom";
import { useLaunches } from "./use-launches";

export function useLaunchesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = Number(searchParams.get("page") ?? "1");
  const page = Number.isFinite(pageParam) && pageParam >= 1 ? pageParam : 1;
  const search = searchParams.get("search") ?? "";
  const successParam = searchParams.get("success");
  const success = successParam === "true" ? true : successParam === "false" ? false : undefined;
  const upcomingParam = searchParams.get("upcoming");
  const upcoming = upcomingParam === "true" ? true : upcomingParam === "false" ? false : undefined;
  const dateFrom = searchParams.get("dateFrom") ?? "";
  const dateTo = searchParams.get("dateTo") ?? "";

  const { data, isLoading, isFetching, error, refetch } = useLaunches({
    page,
    search: search || undefined,
    success,
    upcoming,
    dateFrom: dateFrom || undefined,
    dateTo: dateTo || undefined,
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

  const handleSuccessChange = (value: string) => {
    updateParams({
      success: value || null,
      page: "1",
    });
  };

  const handleUpcomingChange = (value: string) => {
    updateParams({
      upcoming: value || null,
      page: "1",
    });
  };

  const handleDateFromChange = (value: string) => {
    updateParams({
      dateFrom: value || null,
      page: "1",
    });
  };

  const handleDateToChange = (value: string) => {
    updateParams({
      dateTo: value || null,
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
    success: successParam ?? "",
    upcoming: upcomingParam ?? "",
    dateFrom,
    dateTo,
    page,
    totalPages,
    totalDocs,
    hasPrevPage,
    hasNextPage,
    handleSearchChange,
    handleSuccessChange,
    handleUpcomingChange,
    handleDateFromChange,
    handleDateToChange,
    handlePrevPage,
    handleNextPage,
  };
}
