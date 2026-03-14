import { useRequest } from "./useRequest";
import { getFavouriteArtists } from "../../api/services/artistService";

export function useFavouriteArtists(userId?: string, pageSize = 5) {
  return useRequest(
    () => getFavouriteArtists(userId!, pageSize),
    [userId, pageSize],
    { enabled: !!userId, initialData: [] }
  );
}