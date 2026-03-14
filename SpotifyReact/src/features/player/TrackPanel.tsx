import { clsx } from "clsx";
import { useHomeUi } from "components/ui/HomeUiContext.tsx";
import { useAddLike } from "../../hooks/queries/useAddLike.ts";

const TrackPanel = ({isOpen = false, className = "", track}) => {
  const { openTrackbar, closeTrackbar } = useHomeUi();

  const { execute: addLike } = useAddLike();

  const handleLike = async () => {
    try {
      await addLike(track.id);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className={clsx(!isOpen&&"hidden", className, "z-40 w-[290px] py-[36px] pl-[22px] flex flex-col gap-[24px] font-semibold font-inter text-[20px] text-white rounded-[20px] border border-white/40 bg-[#383838]/20 backdrop-blur-[16px]")}>
      <div onClick={openTrackbar} className="flex flex-row items-center gap-[11px] hover:cursor-pointer">
        <div className="w-[24px] h-[24px] flex items-center justify-center">
          <img src="/assets/icons/player_panel/icon1.svg" alt="icon" className="h-[18px]" />
        </div>
        Song Details
      </div>
      <div className="flex flex-row items-center gap-[11px] hover:cursor-pointer">
        <div className="w-[24px] h-[24px] flex items-center justify-center">
          <img src="/assets/icons/player_panel/icon2.svg" alt="icon" className="h-[14px]" />
        </div>
        Add to playlist
      </div>
      <div onClick={handleLike} className="flex flex-row items-center gap-[11px] hover:cursor-pointer">
        <div className="w-[24px] h-[24px] flex items-center justify-center">
          <img src="/assets/icons/player_panel/icon3.svg" alt="icon" className="h-[20px]" />
        </div>
        Save to Liked Songs
      </div>
      <div className="flex flex-row items-center gap-[11px] hover:cursor-pointer">
        <div className="w-[24px] h-[24px] flex items-center justify-center">
          <img src="/assets/icons/player_panel/icon4.svg" alt="icon" className="h-[13px]" />
        </div>
        Add to queue
      </div>
      <div className="flex flex-row items-center gap-[11px] hover:cursor-pointer">
        <div className="w-[24px] h-[24px] flex items-center justify-center">
          <img src="/assets/icons/player_panel/icon5.svg" alt="icon" className="h-[21.2px]" />
        </div>
        Go to artist
      </div>
      <div className="flex flex-row items-center gap-[11px] hover:cursor-pointer">
        <div className="w-[24px] h-[24px] flex items-center justify-center">
          <img src="/assets/icons/player_panel/icon6.svg" alt="icon" className="h-[20px]" />
        </div>
        Go to album
      </div>
      <div className="flex flex-row items-center gap-[11px] hover:cursor-pointer">
        <div className="w-[24px] h-[24px] flex items-center justify-center">
          <img src="/assets/icons/player_panel/icon7.svg" alt="icon" className="h-[19.5px]" />
        </div>
        Share
      </div>
      <div onClick={closeTrackbar} className="flex flex-row items-center gap-[11px] hover:cursor-pointer">
        <div className="w-[24px] h-[24px] flex items-center justify-center">
          <img src="/assets/icons/player_panel/icon8.svg" alt="icon" className="h-[14px]" />
        </div>
        Hide Details
      </div>
    </div>
  )
}

export default TrackPanel;