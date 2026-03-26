import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderWithProviders, screen, fireEvent } from "@test/test-utils";
import { ErrorBoundary } from "./error-boundary";

function ThrowingComponent({ message }: { message: string }) {
  throw new Error(message);
}

describe("ErrorBoundary", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders children when no error", () => {
    renderWithProviders(
      <ErrorBoundary>
        <p>All good</p>
      </ErrorBoundary>,
    );

    expect(screen.getByText("All good")).toBeInTheDocument();
  });

  it("renders ReactNode fallback on error", () => {
    renderWithProviders(
      <ErrorBoundary fallback={<p>Static fallback</p>}>
        <ThrowingComponent message="boom" />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Static fallback")).toBeInTheDocument();
    expect(screen.queryByText("All good")).not.toBeInTheDocument();
  });

  it("renders function fallback with error and reset", () => {
    renderWithProviders(
      <ErrorBoundary
        fallback={(error, reset) => (
          <div>
            <p>{error.message}</p>
            <button onClick={reset}>Reset</button>
          </div>
        )}
      >
        <ThrowingComponent message="test crash" />
      </ErrorBoundary>,
    );

    expect(screen.getByText("test crash")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });

  it("renders nothing when error occurs and no fallback provided", () => {
    const { container } = renderWithProviders(
      <ErrorBoundary>
        <ThrowingComponent message="silent" />
      </ErrorBoundary>,
    );

    expect(container.innerHTML).toBe("");
  });

  it("resets error state when reset is called", () => {
    let shouldThrow = true;

    function MaybeThrow() {
      if (shouldThrow) throw new Error("conditional error");
      return <p>Recovered</p>;
    }

    renderWithProviders(
      <ErrorBoundary
        fallback={(_error, reset) => (
          <button
            onClick={() => {
              shouldThrow = false;
              reset();
            }}
          >
            Retry
          </button>
        )}
      >
        <MaybeThrow />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Retry")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Retry"));

    expect(screen.getByText("Recovered")).toBeInTheDocument();
  });
});
