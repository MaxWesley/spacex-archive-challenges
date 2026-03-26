import { AppShell } from "@/components/layouts/app-shell";
import { Router } from "./router";
import { ErrorBoundary } from "@/components/error-boundary/error-boundary";
import { ErrorFallback } from "@/components/error-boundary/error-fallback";

function App() {
  return (
    <ErrorBoundary
      fallback={(error, reset) => (
        <AppShell>
          <ErrorFallback error={error} onReset={reset} />
        </AppShell>
      )}
    >
      <AppShell>
        <Router />
      </AppShell>
    </ErrorBoundary>
  );
}

export default App;
