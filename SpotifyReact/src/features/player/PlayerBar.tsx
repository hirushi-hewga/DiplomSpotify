import { useSelector } from "react-redux";
import { useState } from "react";
import { selectCurrentTrack } from "../../store/slice/playerSlice.ts";
import PlayerContent from "./PlayerContent.tsx";
import TrackPanel from "./TrackPanel.tsx";


const PlayerBar = ({t, trackPanelPosition="", playerClassName="", isPlayerBar = true, onClick=() => {}}) => {
  const [trackPanelOpen, setTrackPanelOpen] = useState(false);
  const track = useSelector(selectCurrentTrack);

  return (
    <div className="w-full">
    <PlayerContent
      className={playerClassName === "" ? `fixed bottom-0 left-0 right-0 z-30 gap-[120px] rounded-t-[20px] h-[140px]` : playerClassName}
      toggleTrackPanel={() => setTrackPanelOpen(!trackPanelOpen)}
      isPlayerBar={isPlayerBar}
      track={t ? t : track}
      onClick={onClick}
    />
    <TrackPanel track={isPlayerBar ? track : t} isOpen={trackPanelOpen} className={trackPanelPosition === "" ? "fixed right-0 bottom-[90px]" : trackPanelPosition}/>
    </div>
  );
}

export default PlayerBar;