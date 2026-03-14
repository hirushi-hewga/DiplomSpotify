import { likeTrack } from "../../api/services/likeService.ts";
import { useAction } from "./useAction.ts";

export function useAddLike() {
  return useAction(likeTrack);
}