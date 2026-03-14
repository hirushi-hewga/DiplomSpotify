import { apiFetch } from "../apiClient";
import { unwrapServiceResponse } from "../unwrapServiceResponse";

export async function getQuickPicks(page = 1, pageSize = 20) {
  const res = await apiFetch(`/api/track/paged?page=${page}&pageSize=${pageSize}`, {
    method: "GET",
  });

  const payload = await unwrapServiceResponse<any>(res);
  return payload?.items ?? [];
}

export async function getQuickPicksPaged(page = 1, pageSize = 20) {
  const res = await apiFetch(`/api/track/paged?page=${page}&pageSize=${pageSize}`, {
    method: "GET",
  });

  return await unwrapServiceResponse<any>(res);
}

export async function getRecentlyPlayed(userId: string) {
  const res = await apiFetch(
    `/api/track/recently-played?userId=${encodeURIComponent(userId)}`,
    { method: "GET" }
  );

  const payload = await unwrapServiceResponse<any>(res);
  return payload ?? [];
}

export async function getLiked(page = 1, pageSize = 10) {
  const res = await apiFetch(
    `/api/track/favourite?page=${page}&pageSize=${pageSize}`,
    { method: "GET" }
  );

  return await unwrapServiceResponse<any>(res);
}

export async function getTracksByQuery(query: string, count = 10) {
  const res = await apiFetch(
    `/api/track/query?query=${query}&count=${count}`,
    { method: "GET" }
  );

  const payload = await unwrapServiceResponse<any>(res);
  return payload ?? [];
}

export async function getTracksByAlbum(albumId: string) {
  const res = await apiFetch(
    `/api/track/album?albumId=${encodeURIComponent(albumId)}`,
    { method: "GET" }
  );

  const payload = await unwrapServiceResponse<any>(res);
  return payload ?? [];
}

export async function getTracksByGenre(genre: string, page = 1, pageSize = 10) {
  const res = await apiFetch(
    `/api/track/genre?genre=${genre}&page=${page}&pageSize=${pageSize}`,
    { method: "GET" }
  );

  const payload = await unwrapServiceResponse<any>(res);
  return payload.items ?? [];
}