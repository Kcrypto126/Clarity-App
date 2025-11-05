import { useQuery } from "@tanstack/react-query";
import { getNodesByType } from "@/services/sanity";

export const useNodesByType = (type: string) => {
  return useQuery({
    queryKey: ['nodes', type],
    queryFn: () => getNodesByType(type),
  });
};