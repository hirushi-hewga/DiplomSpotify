import shorten from "utils/shorten.ts";
import { Button } from "components/ui/Button.tsx";
import { useSelector } from "react-redux";
import { selectCurrentTrack, selectNextTrack } from "../../store/slice/playerSlice.ts";
import { useTrackArtist } from "../../hooks/queries/useTrackArtist.ts";
import { useHomeUi } from "components/ui/HomeUiContext.tsx";
import TrackPanel from "../../features/player/TrackPanel.tsx";

const TrackDetails = () => {
  const track = useSelector(selectCurrentTrack);
  const nextTrack = useSelector(selectNextTrack);

  const { trackbarActiveTab, detailsTrackPanelOpen, setTrackbarTab, toggleDetailsTrackPanel, closeDetailsTrackPanel } = useHomeUi();

  const { data: artist, loading: artistLoading, error: artistError } = useTrackArtist(track?.id);

  return(
    <div className={`${trackbarActiveTab !== "details" && "hidden"} flex flex-col gap-y-[40px]`}>
      <div className="flex flex-col gap-[24px]">
        <div className="h-[44px] font-inter flex flex-row items-center justify-between font-semibold text-[20px] text-[#F16001]">
          {shorten(track?.name, 20)}
          <div className="font-light font-inter text-[12px] relative text-white flex gap-[16px]">
            <div onClick={toggleDetailsTrackPanel} className="hover:cursor-pointer">•••</div>
            <img src="/assets/icons/track_panel/icon1.svg" alt="icon" className="h-[22px] hover:cursor-pointer" />
            <TrackPanel isOpen={detailsTrackPanelOpen} className="absolute right-[13px] top-[28px]" />
          </div>
        </div>
        <div className="flex flex-col gap-[16px]">
          <img src={`http://localhost:5014${track?.image}`} alt="icon" className="w-[329px] h-[329px] rounded-[30px]" />
          <div className="flex flex-row justify-between">
            <div>
              <div className="font-semibold font-inter text-[24px]">{shorten(track?.name, 15)}</div>
              <div className="font-poppins font-light text-[16px]">{shorten(track?.artist, 20)}</div>
            </div>
            <div className="h-[32px] flex items-center gap-[36px] justify-between">
              <img src="/assets/icons/track_panel/icon2.svg" alt="icon" className="h-[22px] hover:cursor-pointer" />
              <img src="/assets/icons/track_panel/icon3.svg" alt="icon" className="h-[18px] hover:cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[16px]">
        <div
          className="w-[329px] h-[140px] px-[23px] py-[22px] font-inter font-semibold text-[16px] flex items-end justify-end bg-[center_center] rounded-[30px]"
          style={{ backgroundImage: `url(http://localhost:5014${artist?.image})` }}
        >
          About the artist
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-[4px]">
            <div className="font-semibold font-inter text-[20px]">{shorten(artist.name, 15)}</div>
            <div className="font-light font-poppins text-[16px]">712 638 monthly listeners</div>
          </div>
          <div className="w-[89px] h-[39px]">
            <Button variant="transparent" className="bg-[#F16001]/[25%] font-medium font-inter text-[16px]">
              Follow
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-row justify-between items-center">
          <div className="font-semibold font-inter text-[20px]">Credits</div>
          <div className="font-semibold font-poppins text-[14px] text-[#919090]">Show all</div>
        </div>
        <div className="flex flex-col gap-[20px] font-light font-poppins text-[16px]">
          <div className="flex flex-col gap-[4px]">
            <div>{shorten(artist.name, 25)}</div>
            <div className=" text-[#919090]">Main Artist</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-row justify-between items-center">
          <div className="font-semibold font-inter text-[20px]">Next in queue</div>
          <div onClick={() => {closeDetailsTrackPanel(); setTrackbarTab("queue");}} className="font-semibold font-poppins text-[14px] text-[#919090] hover:cursor-pointer">Open queue</div>
        </div>
        <div className="h-[70px] flex flex-row gap-[21px] items-center">
          <img
            src={`http://localhost:5014${nextTrack?.image}`}
            className="h-full rounded-[8px]"
          />
          <div className="flex flex-col gap-[4px]">
            <div>{shorten(nextTrack?.name, 25)}</div>
            <div className=" text-[#919090]">{shorten(nextTrack?.artist, 25)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrackDetails;