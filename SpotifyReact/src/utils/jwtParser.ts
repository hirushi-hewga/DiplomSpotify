export function jwtParser<T = any>(token: string): T | null {
  try {
    const base64Payload = token.split(".")[1];

    if (!base64Payload) return null;

    const base64 = base64Payload
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const decodedPayload = atob(base64);

    return JSON.parse(decodedPayload) as T;
  } catch (e) {
    console.error("Invalid JWT token", e);
    return null;
  }
}