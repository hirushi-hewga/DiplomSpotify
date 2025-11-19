import { Button } from "@headlessui/react";
import LikeF from "components/main/icon/LikeF";
import PlayerMore from "components/main/icon/PlayerMore";
import PlayerPlay from "components/main/icon/PlayerPlay";
import { ITrack } from "interfaces/track";
import { API_URL } from "utils/envData";
import { timeFormat } from "utils/timeFormat";
import { PlayerContext } from "components/main/player/PlayerProvider";
import { useContext } from "react";

interface IListLineProps {
  track: ITrack
}

const ListLine: React.FC<IListLineProps> = ({track}) => {
  const { playTracks } = useContext(PlayerContext)!;
  const imageSrc = API_URL + "/Images/200_";

  return (
    <div className="w-full h-[72px] rounded-[14px] relative">
      <div className="absolute inset-0 bg-[#7C7C7C] opacity-20 z-0 rounded-l-[14px]" />
      <div className="relative z-10 w-full bg-black hover:bg-transparent flex flex-row font-roboto font-normal text-[#BCBCBC] text-base">
        <div className="w-[10%] min-w-[300px] flex items-center">
          <div className="w-[50px] h-[50px] m-[12px] relative flex items-center justify-center group">
            <img src={imageSrc.concat(track.image)} alt={track.name} className="w-[50px] h-[50px] object-cover rounded-[14px]"/>
            <Button className="absolute invisible group-hover:visible" onClick={() => playTracks([track])}>
              <PlayerPlay className=" w-[34px] h-[34px]"/>
            </Button>
          </div>
          <div className="flex flex-col justify-around w-[220px]">
            <span className="font-roboto font-medium text-white text-lg truncate w-full">{track.name}</span>
            <span className="font-roboto font-medium text-[#BCBCBC] text-sm truncate">{track.artistName}</span>
          </div>
        </div>
        <div className="w-[44%] flex justify-center items-center p-[14px]">
          <span>{}</span>
        </div>
        <div className="w-[18%] flex justify-center items-center p-[14px]">
          <span className="truncate">{track.albumName}</span>
        </div>
        <div className="w-[18%] flex justify-center items-center p-[14px]">
          <span>{}</span>
        </div>
        <div className="w-[10%] flex flex-row justify-end items-center">
          <Button>
            <LikeF className="w-[25px] h-[25px] mx-[15px]"/>
          </Button>
          <span className="font-roboto font-normal text-white text-sm mx-[15px]">{timeFormat(track.duration)}</span>
          <PlayerMore className="mx-[15px]" color="white"/>
        </div>
      </div>
    </div>
  )
}

export default ListLine;