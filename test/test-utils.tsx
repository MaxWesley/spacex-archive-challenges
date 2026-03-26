import type { ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { MemoryRouter, type MemoryRouterProps } from "react-router-dom";

interface WrapperOptions {
  routerProps?: MemoryRouterProps;
}

function createWrapper({ routerProps }: WrapperOptions = {}) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter {...routerProps}>{children}</MemoryRouter>
      </ChakraProvider>
    );
  };
}

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & { routerProps?: MemoryRouterProps },
) {
  const { routerProps, ...renderOptions } = options ?? {};
  return render(ui, {
    wrapper: createWrapper({ routerProps }),
    ...renderOptions,
  });
}

export { screen, fireEvent, waitFor, within } from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
