import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { MemoryRouter } from "react-router-dom";
import { http, HttpResponse } from "msw";
import { server } from "@test/../test/mocks/server";
import { useLaunchesPage } from "./use-launches-page";
import type { ReactNode } from "react";

const mockResponse = {
  docs: [{ id: "1", name: "FalconSat" }],
  totalDocs: 50,
  totalPages: 5,
  page: 1,
  hasPrevPage: false,
  hasNextPage: true,
  prevPage: null,
  nextPage: 2,
  limit: 12,
  pagingCounter: 1,
};

function createWrapper(initialEntries = ["/launches"]) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={defaultSystem}>
          <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
        </ChakraProvider>
      </QueryClientProvider>
    );
  };
}

describe("useLaunchesPage", () => {
  beforeEach(() => {
    server.use(
      http.post("*/launches/query", () => HttpResponse.json(mockResponse)),
    );
  });

  it("returns initial state with defaults", () => {
    const { result } = renderHook(() => useLaunchesPage(), {
      wrapper: createWrapper(),
    });

    expect(result.current.page).toBe(1);
    expect(result.current.search).toBe("");
    expect(result.current.success).toBe("");
    expect(result.current.upcoming).toBe("");
    expect(result.current.hasActiveFilters).toBe(false);
  });

  it("parses URL search params", () => {
    const { result } = renderHook(() => useLaunchesPage(), {
      wrapper: createWrapper(["/launches?page=3&search=falcon&success=true"]),
    });

    expect(result.current.page).toBe(3);
    expect(result.current.search).toBe("falcon");
    expect(result.current.success).toBe("true");
    expect(result.current.hasActiveFilters).toBe(true);
  });

  it("fetches launches and exposes pagination data", async () => {
    const { result } = renderHook(() => useLaunchesPage(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.launches).toHaveLength(1);
    expect(result.current.totalDocs).toBe(50);
    expect(result.current.totalPages).toBe(5);
    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.hasPrevPage).toBe(false);
  });

  it("handleSearchChange updates search and resets page", async () => {
    const { result } = renderHook(() => useLaunchesPage(), {
      wrapper: createWrapper(["/launches?page=3"]),
    });

    act(() => {
      result.current.handleSearchChange("starlink");
    });

    expect(result.current.search).toBe("starlink");
    expect(result.current.page).toBe(1);
  });

  it("handleResetFilters clears all params", async () => {
    const { result } = renderHook(() => useLaunchesPage(), {
      wrapper: createWrapper(["/launches?page=3&search=falcon&success=true"]),
    });

    act(() => {
      result.current.handleResetFilters();
    });

    expect(result.current.search).toBe("");
    expect(result.current.success).toBe("");
    expect(result.current.page).toBe(1);
    expect(result.current.hasActiveFilters).toBe(false);
  });
});
