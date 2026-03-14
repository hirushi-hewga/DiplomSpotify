import { useRequest } from "./useRequest";
import { getAlbums } from "../../api/services/albumService";

export function useAlbums(pageSize = 5) {
  return useRequest(
    () => getAlbums(pageSize),
    [pageSize],
    { initialData: [] }
  );
}