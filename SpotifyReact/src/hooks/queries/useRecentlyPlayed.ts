import { useRequest } from "./useRequest";
import { getRecentlyPlayed } from "../../api/services/trackService";

export function useRecentlyPlayed(userId?: string) {
  return useRequest(
    () => getRecentlyPlayed(userId!),
    [userId],
    { enabled: !!userId, initialData: [] }
  );
}