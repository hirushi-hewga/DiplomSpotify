import { useRequest } from "./useRequest";
import { getTracksByGenre } from "../../api/services/trackService.ts";

export function useTrackByGenre(genre: string, page = 1, pageSize = 10) {
  return useRequest(
    () => getTracksByGenre(genre, page, pageSize),
    [genre, page, pageSize],
    { initialData: [] }
  );
}