import { useState, useCallback } from "react";

export function useAction<TParams extends any[], TResult>(
  requestFn: (...params: TParams) => Promise<TResult>
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const execute = useCallback(async (...params: TParams) => {
    setLoading(true);
    setError(null);

    try {
      const result = await requestFn(...params);
      return result;
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, [requestFn]);

  return { execute, loading, error };
}