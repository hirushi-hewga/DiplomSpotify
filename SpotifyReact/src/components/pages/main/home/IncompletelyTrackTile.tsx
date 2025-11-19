import { Button } from "@headlessui/react";
import PlayerPlay from "components/main/icon/PlayerPlay";
import { PlayerContext } from "components/main/player/PlayerProvider";
import { ITrack } from "interfaces/track";
import { useContext } from "react";
import { API_URL } from "utils/envData";

interface ITrackTileProps {
  track: ITrack
}

const IncompletelyTrackTile: React.FC<ITrackTileProps> = ({ track }) => {
  const { playTracks } = useContext(PlayerContext)!;
  const imageSrc = API_URL + "/Images/800_";

  return (
    <div className="flex flex-col justify-start items-start w-[250px]">
      <div className="relative flex items-center justify-center group">
        <img src={imageSrc.concat(track.image)} alt={track.name} className="w-[250px] h-[250px] object-cover rounded-[16px]"/>
        <Button className="absolute invisible group-hover:visible" onClick={() => playTracks([track])}>
          <PlayerPlay className=" w-[54px] h-[54px]"/>
        </Button>
      </div>
      <div className="flex flex-col w-full">
        <span className="font-roboto font-medium text-white text-2xl truncate pt-[15px]">{track.name}</span>
        <span className="font-roboto font-medium text-[#BCBCBC] text-base truncate py-[2px]">{track.artistName}</span>
      </div>
    </div>
  )
}

export default IncompletelyTrackTile