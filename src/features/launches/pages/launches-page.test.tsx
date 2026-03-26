import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { http, HttpResponse } from "msw";
import { server } from "@test/../test/mocks/server";
import { LaunchesPage } from "./launches-page";

const mockApiResponse = {
  docs: [
    {
      id: "abc1",
      name: "FalconSat",
      date_utc: "2006-03-24T22:30:00.000Z",
      success: false,
      upcoming: false,
      flight_number: 1,
      details: null,
      links: {
        patch: { small: "https://example.com/patch.png", large: null },
        flickr: { small: [], original: [] },
        webcast: null,
        wikipedia: null,
        article: null,
      },
      rocket: { name: "Falcon 1", type: "rocket", id: "r1" },
      launchpad: { name: "Kwajalein Atoll", locality: "Omelek Island", id: "lp1" },
      crew: [],
    },
    {
      id: "abc2",
      name: "DemoSat",
      date_utc: "2007-03-21T01:10:00.000Z",
      success: false,
      upcoming: false,
      flight_number: 2,
      details: null,
      links: {
        patch: { small: "https://example.com/patch2.png", large: null },
        flickr: { small: [], original: [] },
        webcast: null,
        wikipedia: null,
        article: null,
      },
      rocket: { name: "Falcon 1", type: "rocket", id: "r1" },
      launchpad: { name: "Kwajalein Atoll", locality: "Omelek Island", id: "lp1" },
      crew: [],
    },
  ],
  totalDocs: 2,
  limit: 12,
  totalPages: 1,
  page: 1,
  pagingCounter: 1,
  hasPrevPage: false,
  hasNextPage: false,
  prevPage: null,
  nextPage: null,
};

function renderPage() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter initialEntries={["/launches"]}>
          <Routes>
            <Route path="/launches" element={<LaunchesPage />} />
          </Routes>
        </MemoryRouter>
      </ChakraProvider>
    </QueryClientProvider>,
  );
}

describe("LaunchesPage (integration)", () => {
  it("renders launch cards after API responds", async () => {
    server.use(
      http.post("*/launches/query", () => {
        return HttpResponse.json(mockApiResponse);
      }),
    );

    renderPage();

    await waitFor(() => {
      expect(screen.getByText("FALCONSAT", { exact: false })).toBeInTheDocument();
    });

    expect(screen.getByText("DEMOSAT", { exact: false })).toBeInTheDocument();
    expect(screen.getAllByText("Falcon 1")).toHaveLength(2);
    expect(screen.getAllByText("Kwajalein Atoll • Omelek Island")).toHaveLength(2);
    expect(screen.getAllByText("FAILURE")).toHaveLength(2);
  });

  it("renders empty state when API returns no docs", async () => {
    server.use(
      http.post("*/launches/query", () => {
        return HttpResponse.json({ ...mockApiResponse, docs: [], totalDocs: 0 });
      }),
    );

    renderPage();

    await waitFor(() => {
      expect(screen.getByText("No launches found")).toBeInTheDocument();
    });
  });
});
