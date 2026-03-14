import { useEffect, useState } from "react";
import { useQuickPicks } from "../../../../hooks/queries/useQuickPicks.ts";
import { playerActions } from "../../../../store/slice/playerSlice.ts";
import { useHomeUi } from "components/ui/HomeUiContext.tsx";
import { useDispatch } from "react-redux";
import { getTracksByQuery } from "../../../../api/services/trackService.ts";

const SearchResults = ({ query }: { query: string }) => {
  const dispatch = useDispatch();
  const { data: quickPicks = [] } = useQuickPicks();
  const { trackbarOpen, sidebarOpen } = useHomeUi();

  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      setTracks([]);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;

    const timeout = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await getTracksByQuery(normalizedQuery, 10);

        if (!cancelled) {
          setTracks(result ?? []);
        }
      } catch (e: any) {
        if (!cancelled) {
          setError(e.message || "Search failed");
          setTracks([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [query]);

  return (
    <div className="w-full flex flex-col gap-[48px]">
      {loading ? (
        <div className="text-white font-inter">Loading...</div>
      ) : tracks.length > 0 ? (
        <div
          className={`w-full max-h-[274px] py-[8px] pl-[20px] ${
            !(!sidebarOpen && trackbarOpen) && "gap-x-[40px]"
          } justify-between text-white font-light font-inter text-[16px] flex flex-wrap overflow-hidden rounded-[8px] bg-[#0F0F10]/[10%] border border-white/[80%]`}
        >
          {tracks.map((t) => (
            <div
              key={t.id}
              onClick={() =>
                dispatch(playerActions.playTrack({ track: t, queue: tracks }))
              }
              className={`${
                !sidebarOpen && trackbarOpen ? "w-[380px]" : "w-[400px]"
              } h-[70px] gap-x-[24px] my-[8px] flex flex-row items-center overflow-hidden rounded-[8px] hover:cursor-pointer`}
            >
              <img
                src={`http://localhost:5014${t.image}`}
                className="h-full rounded-[8px]"
              />
              {t.name}
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-col gap-[16px]">
          <div className="w-full h-[348px] flex flex-col justify-between px-[54px] py-[40px] border border-white rounded-[8px]">
            <div className="w-full flex flex-col items-center gap-y-[40px]">
              <img src="/assets/icons/icon30.svg" className="w-[84px] h-[84px]" />
              <div className="flex flex-col items-center gap-y-[4px] font-inter text-[#919090]">
                <div className="font-medium text-[20px]">No results for ...</div>
                <div className="font-light text-[16px]">Try different keywords</div>
              </div>
            </div>
            <div className="font-semibold font-inter text-[40px] text-white">Other results:</div>
          </div>
          <div className="font-semibold font-poppins mt-[32px] text-[32px] text-[#F16001]">Quick Picks &gt;</div>
          <div
            className={`w-full max-h-[274px] py-[8px] pl-[20px] ${
              !(!sidebarOpen && trackbarOpen) && "gap-x-[40px]"
            } justify-between text-white font-light font-inter text-[16px] flex flex-wrap overflow-hidden rounded-[8px] bg-[#0F0F10]/[10%] border border-white/[80%]`}
          >
            {quickPicks.map((t) => (
              <div
                key={t.id}
                onClick={() =>
                  dispatch(playerActions.playTrack({ track: t, queue: quickPicks }))
                }
                className={`${
                  !sidebarOpen && trackbarOpen ? "w-[380px]" : "w-[400px]"
                } h-[70px] gap-x-[24px] my-[8px] flex flex-row items-center overflow-hidden rounded-[8px] hover:cursor-pointer`}
              >
                <img
                  src={`http://localhost:5014${t.image}`}
                  className="h-full rounded-[8px]"
                />
                {t.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;