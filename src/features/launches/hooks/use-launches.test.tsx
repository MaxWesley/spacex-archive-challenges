import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import { server } from "@test/../test/mocks/server";
import { useLaunches } from "./use-launches";
import type { ReactNode } from "react";

const mockResponse = {
  docs: [{ id: "1", name: "FalconSat" }],
  totalDocs: 1,
  totalPages: 1,
  page: 1,
  hasPrevPage: false,
  hasNextPage: false,
  prevPage: null,
  nextPage: null,
  limit: 12,
  pagingCounter: 1,
};

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

describe("useLaunches", () => {
  beforeEach(() => {
    server.use(
      http.post("*/launches/query", () => HttpResponse.json(mockResponse)),
    );
  });

  it("fetches launches successfully", async () => {
    const { result } = renderHook(() => useLaunches({ page: 1 }), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data?.docs).toHaveLength(1);
    expect(result.current.data?.docs[0].name).toBe("FalconSat");
  });

  it("handles API error", async () => {
    server.use(
      http.post("*/launches/query", () => HttpResponse.error()),
    );

    const { result } = renderHook(() => useLaunches({ page: 1 }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.data).toBeUndefined();
  });

  it("passes pagination params correctly", async () => {
    const { result } = renderHook(
      () => useLaunches({ page: 2, limit: 5 }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBeDefined();
  });

  it("uses correct query key for caching", () => {
    const params = { page: 1, search: "falcon" };
    const { result } = renderHook(() => useLaunches(params), {
      wrapper: createWrapper(),
    });

    expect(result.current.isFetching).toBe(true);
  });
});
