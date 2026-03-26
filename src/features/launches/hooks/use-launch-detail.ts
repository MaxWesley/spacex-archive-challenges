import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export function useLaunchDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ["launch", id],
    queryFn: async () => {
      const { data } = await api.post("/launches/query", {
        query: { _id: id },
        options: {
          limit: 1,
          populate: [
            { path: "rocket", select: { name: 1, type: 1 } },
            { path: "launchpad", select: { name: 1, locality: 1 } },
            { path: "crew", select: { name: 1, agency: 1, image: 1, wikipedia: 1 } },
          ],
        },
      });
      return data?.docs?.[0] ?? null;
    },
    enabled: Boolean(id),
  });

  const handleGoBack = () => {
    const index = (window.history.state as { idx?: number } | null)?.idx ?? 0;
    if (index > 0) {
      navigate(-1);
      return;
    }
    navigate("/launches?page=1", { replace: true });
  };

  const crew = Array.isArray((query.data as any)?.crew) ? ((query.data as any).crew as any[]) : [];
  return {
    id,
    data: query.data,
    crew,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    handleGoBack,
    refetch: query.refetch,
  };
}
