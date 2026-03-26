import React from "react";
import type { Preview } from "@storybook/react-vite";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const config: Preview = {
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={defaultSystem}>
          <MemoryRouter>
            <Story />
          </MemoryRouter>
        </ChakraProvider>
      </QueryClientProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default config;
