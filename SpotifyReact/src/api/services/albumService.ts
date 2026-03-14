import { apiFetch } from "../apiClient";
import { unwrapServiceResponse } from "../unwrapServiceResponse";

export async function getAlbums(pageSize = 5) {
  const res = await apiFetch(`/api/album/paged?pageSize=${pageSize}`, {
    method: "GET",
  });

  const payload = await unwrapServiceResponse<any>(res);
  return payload?.items ?? [];
}

export async function getLikedAlbums() {
  const res = await apiFetch(`/api/album/liked`, {
    method: "GET",
  });

  const payload = await unwrapServiceResponse<any>(res);
  return payload ?? [];
}

export async function getRandomAlbums() {
  const res = await apiFetch(`/api/album/random`, {
    method: "GET",
  });

  const payload = await unwrapServiceResponse<any>(res);
  return payload ?? [];
}