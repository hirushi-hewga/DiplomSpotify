import { useRequest } from "./useRequest";
import { getUserPlaylists } from "../../api/services/playlistService";

export function useUserPlaylists(userId?: string, pageSize = 5) {
  return useRequest(
    () => getUserPlaylists(userId!, pageSize),
    [userId, pageSize],
    { enabled: !!userId, initialData: [] }
  );
}