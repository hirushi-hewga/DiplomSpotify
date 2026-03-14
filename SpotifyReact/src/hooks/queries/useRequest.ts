import { useCallback, useEffect, useState } from "react";

type UseRequestOptions<T> = {
  enabled?: boolean;
  initialData?: T;
};

export function useRequest<T>(
  requestFn: () => Promise<T>,
  deps: any[] = [],
  options: UseRequestOptions<T> = {}
) {
  const { enabled = true, initialData } = options;

  const [data, setData] = useState<T>(initialData as T);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    if (!enabled) return;

    setLoading(true);
    setError(null);

    try {
      const result = await requestFn();
      setData(result);
    } catch (e: any) {
      setError(e.message || "Request failed");
    } finally {
      setLoading(false);
    }
  }, [enabled, ...deps]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}