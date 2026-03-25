import { LaunchesPage } from "@/features/launches/pages";
import { Route, Routes } from "react-router-dom";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<LaunchesPage />} />
        </Routes>
    )
}