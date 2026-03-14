import { useSelector } from "react-redux";
import { selectCurrentTrack, selectNextQueue } from "../../store/slice/playerSlice.ts";
import shorten from "utils/shorten.ts";
import { useRecentlyPlayed } from "../../hooks/queries/useRecentlyPlayed.ts";
import { getUser } from "../../store/slice/userSlice.ts";
import { useHomeUi } from "components/ui/HomeUiContext.tsx";


const Queue = () => {
  const user = useSelector(getUser);

  const { trackbarActiveTab, queueActiveTab, setQueueTab, closeTrackbar } = useHomeUi();

  const { data: recentlyPlayed, loading: recentlyPlayedLoading, error: recentlyPlayedError } =
    useRecentlyPlayed(user?.id);

  const track = useSelector(selectCurrentTrack);
  const queue = useSelector(selectNextQueue);

  return (
    <div className={`${trackbarActiveTab !== "queue" && "hidden"} flex flex-col ${queueActiveTab==="queue"?"gap-y-[24px]":"gap-y-[40px]"}`}>
      <div className="h-[44px] flex justify-between items-center">
        <div className="flex flex-row gap-[20px] font-semibold font-inter text-[18px]">
          <div
            className={`${queueActiveTab==="queue"?"text-[#F16001]":"hover:text-[#FF934C] hover:cursor-pointer"}`}
            onClick={() => setQueueTab("queue")}
          >
            Queue
          </div>
          <div
            className={`${queueActiveTab==="recent"?"text-[#F16001]":"hover:text-[#FF934C] hover:cursor-pointer"}`}
            onClick={() => setQueueTab("recent")}
          >
            RecentlyPlayed
          </div>
        </div>
        <div className={`flex items-center gap-[27px] mr-[16px]`}>
          <img
            src="/assets/icons/track_panel/icon4.svg"
            alt="icon"
            className="h-[24px] hover:cursor-pointer"
          />
          <img
            src="/assets/icons/track_panel/icon5.svg"
            alt="icon"
            className="h-[13.3px] hover:cursor-pointer"
            onClick={closeTrackbar}
          />
        </div>
      </div>



      {queueActiveTab === "queue" &&(
        <div className="flex flex-col gap-[40px]">
          <div className="flex flex-col gap-[24px]">
            <div className="font-semibold font-inter text-[24px]">Playing</div>
            <div className="pl-[8px] pr-[16px] py-[7.5px] flex flex-row justify-between items-center rounded-[8px] border border-white/[80%] bg-[#F16001]/[25%]">
              <div className="flex flex-row gap-[24px] items-center">
                <div
                  className="w-[60px] h-[60px] bg-contain rounded-[8px] flex items-center justify-center"
                  style={{ backgroundImage: `url(http://localhost:5014${track?.image})` }}
                >
                  <img src="/assets/icons/icon23.svg" alt="icon" className="h-[14px]" />
                </div>
                <div className="font-inter text-[16px] flex flex-col gap-[10px]">
                  <div className="font-semibold text-[#FF934C]">{shorten(track?.name, 13)}</div>
                  <div className="font-normal">{shorten(track?.artist, 13)}</div>
                </div>
              </div>
              <div className="text-[18px] font-light font-inter">•••</div>
            </div>
          </div>
          <div className="flex flex-col gap-[24px]">
            {queue.map(t => (
              <div key={t?.id} className="flex flex-row gap-[24px] items-center">
                <div
                  className="w-[60px] h-[60px] bg-contain rounded-[8px] flex items-center justify-center"
                  style={{ backgroundImage: `url(http://localhost:5014${t?.image})` }}
                />
                <div className="font-inter text-[16px] flex flex-col gap-[10px]">
                  <div className="font-semibold text-[#FF934C]">{shorten(t?.name, 20)}</div>
                  <div className="font-normal">{shorten(t?.artist, 20)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}



      {queueActiveTab === "recent" && (
        <div className="flex flex-col gap-[24px]">
          {recentlyPlayed.slice(0,9).map(t => (
            <div key={t?.id} className="flex flex-row gap-[24px] items-center">
              <div
                className="w-[60px] h-[60px] bg-contain rounded-[8px] flex items-center justify-center"
                style={{ backgroundImage: `url(http://localhost:5014${t?.image})` }}
              />
              <div className="font-inter text-[16px] flex flex-col gap-[10px]">
                <div className="font-semibold text-[#FF934C]">{shorten(t?.name, 20)}</div>
                <div className="font-normal">{shorten(t?.artist, 20)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Queue