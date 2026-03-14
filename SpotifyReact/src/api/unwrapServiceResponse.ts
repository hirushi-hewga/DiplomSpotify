export type ServiceResponse<T = any> = {
  isSuccess: boolean;
  message: string;
  payload: T | null;
};

export async function unwrapServiceResponse<T>(res: Response): Promise<T> {
  const json = (await res.json().catch(() => null)) as ServiceResponse<T> | null;

  if (!json) throw new Error("Empty response from server");
  if (!res.ok) throw new Error(json.message || "Request failed");
  if (!json.isSuccess) throw new Error(json.message || "Operation failed");

  return json.payload as T;
}