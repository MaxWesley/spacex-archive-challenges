import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export function useLaunchDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ["launch", id],
    queryFn: async () => {
      const { data } = await api.get(`/launches/${id}`);
      return data;
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

  return { id, ...query, handleGoBack };
}
