import { useRequest } from "./useRequest";
import { getLiked } from "../../api/services/trackService.ts";

export function useLikedTracks(page = 1, pageSize = 10) {
  return useRequest(
    () => getLiked(page, pageSize),
    [page, pageSize],
    { initialData: [] }
  );
}