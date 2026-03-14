import { apiFetch } from "../apiClient";
import { unwrapServiceResponse } from "../unwrapServiceResponse";

export async function getFavouriteArtists(userId: string, pageSize = 5) {
  const res = await apiFetch(
    `/api/artist/favourites?userId=${encodeURIComponent(userId)}&pageSize=${pageSize}`,
    { method: "GET" }
  );

  const payload = await unwrapServiceResponse<any>(res);
  return payload?.items ?? [];
}

export async function getArtistByTrack(trackId: string) {
  const res = await apiFetch(
    `/api/artist/track?trackId=${encodeURIComponent(trackId)}`,
    { method: "GET" }
  );

  const payload = await unwrapServiceResponse<any>(res);
  return payload!;
}