import { getRandomAlbums } from "../../api/services/albumService.ts";
import { useRequest } from "./useRequest.ts";

export function useRandomAlbums() {
  return useRequest(
    () => getRandomAlbums(),
    [],
    { initialData: [] }
  );
}