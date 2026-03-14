import { Button } from "components/ui/Button.tsx";
import VolumeSlider from "components/ui/VolumeSlider.tsx";
import { useDispatch, useSelector } from "react-redux";



import { useEffect, useState } from "react";



import { getLiked, getQuickPicksPaged } from "../../../../api/services/trackService.ts";
import PlayerBar from "../../../../features/player/PlayerBar.tsx";
import { useUserPlaylists } from "../../../../hooks/queries/useUserPlaylists.ts";
import { playerActions, selectCurrentTrack } from "../../../../store/slice/playerSlice.ts";
import { getUser } from "../../../../store/slice/userSlice.ts";


const RoadQuickPicksPage = () => {
  const user = useSelector(getUser);
  const [value, setValue] = useState(65);
  const dispatch = useDispatch();
  const track = useSelector(selectCurrentTrack);
  const [page, setPage] = useState(1);
  const [tracks, setTracks] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: playlists = [], loading: playlistsLoading } =
    useUserPlaylists(user?.id, 10);

  const loadTracks = async (targetPage: number, append = false) => {
    setLoading(true);

    try {
      const result = await getQuickPicksPaged(targetPage, 6);

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

  if (playlistsLoading) return null;
  if (!playlists.length) return null;

  return (
    <div className="w-full flex flex-col gap-[24px]">
      <div className="w-full h-[281px] flex gap-[32px] pr-[16px]">
        <div
          className="bg-center bg-cover px-[32px] py-[16px] rounded-[20px] flex items-end h-full flex-1"
          style={{ backgroundImage: `url(http://localhost:5014/data/${playlists[0].image})` }}
        >
          <div className="w-full h-[64px] flex justify-between font-semibold font-poppins text-[40px] text-white">
            {playlists[0].name}
            <div className="w-[64px] h-[64px] flex items-center justify-center rounded-full backdrop-blur-[16px] border border-white/80">
              <img src="/assets/icons/icon22.svg" className="h-[14px]" />
            </div>
          </div>
        </div>

        <div className="w-[40px] gap-[16px] h-full flex flex-col items-center">
          <div className="w-[32px] h-full">
            <VolumeSlider value={value} onChange={setValue} />
          </div>
          <img src="/assets/icons/icon29.svg" className="w-[40px]" />
        </div>
      </div>
      <div className="w-full flex flex-col mb-[32px] items-center gap-[4px]">
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
        <div className="w-[172px] m-auto my-[64px] h-[40px]">
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
  );
};

export default RoadQuickPicksPage;