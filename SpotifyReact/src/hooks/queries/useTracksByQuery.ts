import { useRequest } from "./useRequest";
import { getTracksByQuery } from "../../api/services/trackService.ts";

export function useTracksByQuery(query: string, count = 10) {
  return useRequest(
    () => getTracksByQuery(query, count),
    [query, count],
    { initialData: [] }
  );
}