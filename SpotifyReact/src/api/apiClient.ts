const BASE_URL = "http://localhost:5014";

export async function apiFetch(
  url: string,
  options: RequestInit = {}
) {
  const accessToken = localStorage.getItem("accessToken");

  const response = await fetch(BASE_URL + url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  });

  if (response.status !== 401) return response;

  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    logout();
    return response;
  }

  const refreshRes = await fetch(BASE_URL + "/api/account/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      accessToken,
      refreshToken,
    }),
  });

  const refreshJson = await refreshRes.json();

  if (!refreshRes.ok || !refreshJson.isSuccess) {
    logout();
    return response;
  }

  const { accessToken: newAccess, refreshToken: newRefresh } =
    refreshJson.payload;

  localStorage.setItem("accessToken", newAccess);
  localStorage.setItem("refreshToken", newRefresh);

  return fetch(BASE_URL + url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: `Bearer ${newAccess}`,
    },
  });
}

function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "/login";
}