import { useRequest } from "./useRequest";
import { getQuickPicks } from "../../api/services/trackService";

export function useQuickPicks(page = 1, pageSize = 20) {
  return useRequest(
    () => getQuickPicks(page, pageSize),
    [page, pageSize],
    { initialData: [] }
  );
}