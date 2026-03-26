import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { http, HttpResponse } from "msw";
import { server } from "@test/../test/mocks/server";
import { useLaunchDetail } from "./use-launch-detail";
import type { ReactNode } from "react";

const mockLaunch = {
  id: "abc123",
  name: "FalconSat",
  date_utc: "2006-03-24T22:30:00.000Z",
  success: false,
  upcoming: false,
  flight_number: 1,
  details: "Engine failure at 33 seconds",
  links: {
    patch: { small: "patch.png", large: null },
    flickr: { original: [] },
    webcast: "https://youtube.com/watch",
    wikipedia: "https://en.wikipedia.org/wiki/FalconSat",
    article: null,
  },
  rocket: { name: "Falcon 1", type: "rocket" },
  launchpad: { name: "Kwajalein Atoll", locality: "Omelek Island" },
  crew: [
    { name: "John", agency: "NASA", image: null, wikipedia: null },
  ],
};

function createWrapper(initialPath: string) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={defaultSystem}>
          <MemoryRouter initialEntries={[initialPath]}>
            <Routes>
              <Route path="/launches/:id" element={children} />
            </Routes>
          </MemoryRouter>
        </ChakraProvider>
      </QueryClientProvider>
    );
  };
}

describe("useLaunchDetail", () => {
  beforeEach(() => {
    server.use(
      http.post("*/launches/query", () =>
        HttpResponse.json({ docs: [mockLaunch] }),
      ),
    );
  });

  it("extracts id from URL params", () => {
    const { result } = renderHook(() => useLaunchDetail(), {
      wrapper: createWrapper("/launches/abc123"),
    });

    expect(result.current.id).toBe("abc123");
  });

  it("fetches launch detail and returns data", async () => {
    const { result } = renderHook(() => useLaunchDetail(), {
      wrapper: createWrapper("/launches/abc123"),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBeDefined();
    expect(result.current.data.name).toBe("FalconSat");
  });

  it("extracts crew array from response", async () => {
    const { result } = renderHook(() => useLaunchDetail(), {
      wrapper: createWrapper("/launches/abc123"),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.crew).toHaveLength(1);
  });

  it("returns empty crew when data has no crew", async () => {
    server.use(
      http.post("*/launches/query", () =>
        HttpResponse.json({ docs: [{ ...mockLaunch, crew: undefined }] }),
      ),
    );

    const { result } = renderHook(() => useLaunchDetail(), {
      wrapper: createWrapper("/launches/abc123"),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.crew).toEqual([]);
  });

  it("provides handleGoBack function", () => {
    const { result } = renderHook(() => useLaunchDetail(), {
      wrapper: createWrapper("/launches/abc123"),
    });

    expect(typeof result.current.handleGoBack).toBe("function");
  });
});
