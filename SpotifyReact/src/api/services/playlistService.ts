import { apiFetch } from "../apiClient";
import { unwrapServiceResponse } from "../unwrapServiceResponse";

export async function getUserPlaylists(userId: string, pageSize = 5) {
  const res = await apiFetch(
    `/api/playlist/user?userId=${encodeURIComponent(userId)}&pageSize=${pageSize}`,
    { method: "GET" }
  );

  const payload = await unwrapServiceResponse<any>(res);
  return payload?.items ?? [];
}