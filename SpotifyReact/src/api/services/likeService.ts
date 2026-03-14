import { apiFetch } from "../apiClient.ts";
import { unwrapServiceResponse } from "../unwrapServiceResponse.ts";

export async function likeTrack(trackId: string) {
  const res = await apiFetch(
    `/api/like?trackId=${encodeURIComponent(trackId)}`,
    { method: "POST" }
  );

  const payload = await unwrapServiceResponse<any>(res);
  return payload ?? [];
}