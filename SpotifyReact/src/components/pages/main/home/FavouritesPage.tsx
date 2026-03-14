import { Button } from "components/ui/Button.tsx";
import { useDispatch, useSelector } from "react-redux";
import shorten from "utils/shorten.ts";
import { useEffect, useState } from "react";
import { getLiked } from "../../../../api/services/trackService.ts";
import PlayerBar from "../../../../features/player/PlayerBar.tsx";
import { playerActions, selectCurrentTrack } from "../../../../store/slice/playerSlice.ts";


const FavouritesPage = () => {
  const dispatch = useDispatch();
  const track = useSelector(selectCurrentTrack);

  const [page, setPage] = useState(1);
  const [tracks, setTracks] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadTracks = async (targetPage: number, append = false) => {
    setLoading(true);

    try {
      const result = await getLiked(targetPage, 6);

      console.log(result);

      if (append) {
        setTracks((prev) => [...prev, ...result.items]);
      } else {
        setTracks(result.items);
      }

      setPage(result.page);
      setHasMore(result.page < result.totalPages);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (loading || !hasMore) return;
    await loadTracks(page + 1, true);
  };

  useEffect(() => {
    loadTracks(1, false);
  }, []);

  return (
    <div className="w-full flex flex-col gap-y-[100px] flex-1">
      {(tracks.some(t => t.id === track?.id))&&(
        <div
          className={`w-full min-h-[297px] pb-[36px] px-[20px] flex justify-end bg-center bg-cover rounded-[30px]`}
          style={{ backgroundImage: `url(http://localhost:5014${track?.image})` }}
        >
          <div className="flex-1 flex flex-row justify-between items-end">
            <div className="flex flex-col font-inter text-white">
              <div className="font-semibold text-[40px]">{shorten(track?.name, 50)}</div>
              <div className="font-bold text-[28px]">{shorten(track?.artist, 50)}</div>
            </div>
            <div onClick={() => dispatch(playerActions.togglePlay())} className="h-[64px] aspect-square flex justify-center items-center border border-white/[80%] rounded-full hover:cursor-pointer bg-white/[10%]">
              <img
                src="/assets/icons/icon22.svg"
                alt="icon"
                className="h-[14px]"
              />
            </div>
          </div>
        </div>
      )}
      <div className="w-full flex flex-col items-center gap-[60px]">
        <div className="w-full flex flex-col items-center gap-[4px]">
          {tracks.map(t => (
            <div
              key={t.id}
              className="hover:cursor-pointer relative w-full"
            >
              <PlayerBar
                playerClassName={`flex-1 gap-[72px] rounded-[20px] h-[140px] ring-transparent ring-[1px] ring-inset hover:ring-white/70 hover:px-[20px]`}
                trackPanelPosition="absolute right-[13px] top-[105px]"
                isPlayerBar={false}
                t={t}
                onClick={() => {if (track?.id !== t.id) dispatch(playerActions.playTrack({ track: t, queue: tracks })); else dispatch(playerActions.togglePlay());}}
              />
            </div>
          ))}
        </div>
        {hasMore && (
          <div className="w-[172px] h-[40px]">
            <Button
              variant="transparent"
              className="bg-[#F16001]/[25%] font-semibold font-inter text-[18px]"
              onClick={handleLoadMore}
              disabled={loading}
            >
              {loading ? "Loading..." : "Load more"}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default FavouritesPage;