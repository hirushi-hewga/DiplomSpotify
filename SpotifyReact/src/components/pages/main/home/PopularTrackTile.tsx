import { Button } from "@headlessui/react";
import PlayerPlay from "components/main/icon/PlayerPlay";
import { PlayerContext } from "components/main/player/PlayerProvider";
import { ITrack } from "interfaces/track";
import { useContext } from "react";
import { API_URL } from "utils/envData";
import { timeFormat } from "utils/timeFormat";

interface ITrackTileProps {
  track: ITrack
}

const PopularTrackTile: React.FC<ITrackTileProps> = ({ track }) => {
  const { playTracks } = useContext(PlayerContext)!;
  const imageSrc = API_URL + "/Images/800_";

  return (
    <div className="flex flex-row">
      <img src={imageSrc.concat(track.image)} alt={track.name} className="w-[74px] h-[74px] object-cover rounded-[5px]"/>
      <div className="flex flex-col justify-center w-[250px] ml-[12px]">
        <span className="font-roboto font-medium text-white text-2xl truncate py-[2px]">{track.name}</span>
        <span className="font-roboto font-medium text-[#BCBCBC] text-base truncate py-[2px]">{track.artistName}</span>
      </div>
      <div className="flex justify-end items-center w-[100px]">
        <span className="font-roboto font-normal pr-[16px] text-white text-base">{timeFormat(track.duration)}</span>
        <Button onClick={() => playTracks([track])}>
          <PlayerPlay className="w-[24px] h-[24px]"/>
        </Button>
      </div>
    </div>
  )
}

export default PopularTrackTile