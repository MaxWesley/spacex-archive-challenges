import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { http, HttpResponse } from "msw";
import { server } from "@test/../test/mocks/server";
import { LaunchDetailPage } from "./launch-detail-page";

const mockLaunch = {
  id: "abc123",
  name: "FalconSat",
  date_utc: "2006-03-24T22:30:00.000Z",
  success: false,
  upcoming: false,
  flight_number: 1,
  details: "Engine failure at 33 seconds",
  links: {
    patch: { small: "https://img.example.com/patch.png", large: null },
    flickr: { original: [] },
    webcast: "https://youtube.com/watch",
    wikipedia: "https://en.wikipedia.org/wiki/FalconSat",
    article: null,
  },
  rocket: { name: "Falcon 1", type: "rocket" },
  launchpad: { name: "Kwajalein Atoll", locality: "Omelek Island" },
  crew: [],
};

function renderPage() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter initialEntries={["/launches/abc123"]}>
          <Routes>
            <Route path="/launches/:id" element={<LaunchDetailPage />} />
          </Routes>
        </MemoryRouter>
      </ChakraProvider>
    </QueryClientProvider>,
  );
}

describe("LaunchDetailPage", () => {
  beforeEach(() => {
    server.use(http.post("*/launches/query", () => HttpResponse.json({ docs: [mockLaunch] })));
  });

  it("shows loading skeleton initially", () => {
    renderPage();
    expect(document.querySelector("[data-scope='skeleton'], .chakra-skeleton")).toBeInTheDocument();
  });

  it("renders launch name after loading", async () => {
    renderPage();

    await waitFor(() => {
      expect(screen.getByText("FalconSat")).toBeInTheDocument();
    });
  });

  it("renders launch details text", async () => {
    renderPage();

    await waitFor(() => {
      expect(screen.getByText("Engine failure at 33 seconds")).toBeInTheDocument();
    });
  });

  it("renders back button", async () => {
    renderPage();

    await waitFor(() => {
      expect(screen.getByText("Back")).toBeInTheDocument();
    });
  });

  it("shows 'Not found' when no data returned", async () => {
    server.use(http.post("*/launches/query", () => HttpResponse.json({ docs: [] })));

    renderPage();

    await waitFor(() => {
      expect(screen.getByText("Not found")).toBeInTheDocument();
    });
  });
});
