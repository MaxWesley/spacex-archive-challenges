import { LaunchesPage, LaunchDetailPage } from "@/features/launches/pages";
import { Navigate, Route, Routes } from "react-router-dom";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/launches" replace />} />
      <Route path="/launches" element={<LaunchesPage />} />
      <Route path="/launches/:id" element={<LaunchDetailPage />} />
    </Routes>
  );
}
