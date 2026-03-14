import { useRequest } from "./useRequest";
import { getTracksByAlbum } from "../../api/services/trackService";

export function useTracksByAlbum(albumId?: string) {
  return useRequest(
    () => getTracksByAlbum(albumId!),
    [albumId],
    { initialData: [] }
  );
}