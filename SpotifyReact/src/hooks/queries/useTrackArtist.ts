import { useRequest } from "./useRequest";
import { getArtistByTrack } from "../../api/services/artistService.ts";

export function useTrackArtist(trackId?: string) {
  return useRequest(
    () => getArtistByTrack(trackId!),
    [trackId],
    { enabled: !!trackId, initialData: [] }
  );
}