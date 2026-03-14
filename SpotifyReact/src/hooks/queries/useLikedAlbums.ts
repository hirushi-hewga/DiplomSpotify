import { useRequest } from "./useRequest";
import { getAlbums } from "../../api/services/albumService";

export function useLikedAlbums() {
  return useRequest(
    () => getAlbums(),
    [],
    { initialData: [] }
  );
}