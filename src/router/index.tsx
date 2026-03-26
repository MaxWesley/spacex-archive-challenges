import { LaunchesPage, LaunchDetailPage } from "@/features/launches/pages";
import { ErrorTestPage } from "@/pages/error-test-page";
import { NotFoundPage } from "@/pages/not-found-page";
import { Navigate, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "@/components/error-boundary/error-boundary";
import { ErrorFallback } from "@/components/error-boundary/error-fallback";

function RouteErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallback={(error, reset) => <ErrorFallback error={error} onReset={reset} />}>
      {children}
    </ErrorBoundary>
  );
}

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/launches" replace />} />
      <Route
        path="/launches"
        element={
          <RouteErrorBoundary>
            <LaunchesPage />
          </RouteErrorBoundary>
        }
      />
      <Route
        path="/launches/:id"
        element={
          <RouteErrorBoundary>
            <LaunchDetailPage />
          </RouteErrorBoundary>
        }
      />
      <Route
        path="/error-test"
        element={
          <RouteErrorBoundary>
            <ErrorTestPage />
          </RouteErrorBoundary>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
